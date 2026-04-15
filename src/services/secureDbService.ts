
import { supabase } from '@/lib/supabase';
import { sanitizeObject, validateCVData, validateUserProfile, checkRateLimit } from './securityService';
import { AuditService } from './auditService';
import { CVData } from './cvService';
import { UserProfile } from '@/hooks/useUserProfile';

export class SecureDbService {
  private static async getUserId(): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  }

  // Secure CV operations
  static async saveCVSecurely(title: string, templateName: string, cvData: CVData) {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Rate limiting
    if (!checkRateLimit(`save_cv_${userId}`, 5, 60000)) {
      throw new Error('Too many requests. Please wait before trying again.');
    }

    // Validate and sanitize data
    const validation = validateCVData(cvData, userId);
    if (!validation.isValid) {
      throw new Error(`Invalid CV data: ${validation.errors.join(', ')}`);
    }

    const sanitizedData = sanitizeObject(cvData);
    const sanitizedTitle = title.slice(0, 100).trim();
    const sanitizedTemplateName = templateName.slice(0, 50).trim();

    const { data, error } = await supabase
      .from('saved_cvs')
      .insert([{
        user_id: userId,
        title: sanitizedTitle,
        template_name: sanitizedTemplateName,
        cv_data: sanitizedData,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateCVSecurely(cvId: string, title: string, templateName: string, cvData: CVData) {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Rate limiting
    if (!checkRateLimit(`update_cv_${userId}`, 30, 60000)) {
      throw new Error('Too many requests. Please wait before trying again.');
    }

    // Validate and sanitize data
    const validation = validateCVData(cvData, userId);
    if (!validation.isValid) {
      throw new Error(`Invalid CV data: ${validation.errors.join(', ')}`);
    }

    const sanitizedData = sanitizeObject(cvData);
    const sanitizedTitle = title.slice(0, 100).trim();
    const sanitizedTemplateName = templateName.slice(0, 50).trim();

    // Fetch existing CV to check for changes and increment version
    const { data: existingCV } = await supabase
      .from('saved_cvs')
      .select('cv_data, template_name, current_version')
      .eq('id', cvId)
      .eq('user_id', userId)
      .single();

    let newVersion = existingCV?.current_version || 1;
    if (existingCV) {
      const dataChanged = JSON.stringify(existingCV.cv_data) !== JSON.stringify(sanitizedData);
      const templateChanged = existingCV.template_name !== sanitizedTemplateName;
      if (dataChanged || templateChanged) {
        newVersion++;
      }
    }

    // The RLS policy will ensure only the owner can update
    const { data, error } = await supabase
      .from('saved_cvs')
      .update({
        title: sanitizedTitle,
        template_name: sanitizedTemplateName,
        cv_data: sanitizedData,
        current_version: newVersion,
      })
      .eq('id', cvId)
      .eq('user_id', userId) // Extra security check
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteCVSecurely(cvId: string) {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Rate limiting
    if (!checkRateLimit(`delete_cv_${userId}`, 5, 60000)) {
      throw new Error('Too many requests. Please wait before trying again.');
    }

    // The RLS policy will ensure only the owner can delete
    const { error } = await supabase
      .from('saved_cvs')
      .delete()
      .eq('id', cvId)
      .eq('user_id', userId); // Extra security check

    if (error) throw error;
  }

  // Secure profile operations
  static async updateProfileSecurely(updates: Partial<UserProfile>) {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Rate limiting
    if (!checkRateLimit(`update_profile_${userId}`, 5, 60000)) {
      throw new Error('Too many requests. Please wait before trying again.');
    }

    // Validate and sanitize data
    const validation = validateUserProfile(updates, userId);
    if (!validation.isValid) {
      throw new Error(`Invalid profile data: ${validation.errors.join(', ')}`);
    }

    const sanitizedUpdates = sanitizeObject(updates);

    // The RLS policy will ensure only the owner can update
    const { data, error } = await supabase
      .from('user_profiles')
      .update(sanitizedUpdates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Secure download increment
  static async incrementDownloadsSecurely() {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Rate limiting for downloads
    if (!checkRateLimit(`download_${userId}`, 20, 60000)) {
      throw new Error('Too many download requests. Please wait before trying again.');
    }

    const { error } = await supabase.rpc('increment_downloads', {
      user_uuid: userId
    });

  static async uploadCVSnapshot(cvId: string, version: number, pdfBlob: Blob) {
    const userId = await this.getUserId();
    if (!userId) return null;

    const fileName = `${userId}/${cvId}_v${version}_${Date.now()}.pdf`;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cv_snapshots')
        .upload(fileName, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('cv_snapshots')
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      // Vincular esta URL ao pagamento correspondente
      const { error: patchError } = await supabase
        .from('payments')
        .update({ pdf_url: publicUrl })
        .eq('cv_id', cvId)
        .eq('cv_version', version)
        .eq('status', 'paid');

      if (patchError) console.error("Erro ao vincular PDF ao pagamento:", patchError);

      return publicUrl;
    } catch (error) {
      console.error("Erro no upload do snapshot:", error);
      return null;
    }
  }
}
