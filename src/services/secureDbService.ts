
import { supabase } from '@/lib/supabase';
import { sanitizeObject, validateCVData, validateUserProfile, checkRateLimit } from './securityService';
import { CVData } from './cvService';
import { UserProfile } from '@/hooks/useUserProfile';

export class SecureDbService {
  private static getUserId(): string | null {
    const user = supabase.auth.getUser();
    return user ? (user as any).data?.user?.id || null : null;
  }

  // Secure CV operations
  static async saveCVSecurely(title: string, templateName: string, cvData: CVData) {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Rate limiting
    if (!checkRateLimit(`save_cv_${userId}`, 5, 60000)) {
      throw new Error('Too many requests. Please wait before trying again.');
    }

    // Validate and sanitize data
    const validation = validateCVData(cvData);
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

  static async updateCVSecurely(cvId: string, title: string, cvData: CVData) {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Rate limiting
    if (!checkRateLimit(`update_cv_${userId}`, 10, 60000)) {
      throw new Error('Too many requests. Please wait before trying again.');
    }

    // Validate and sanitize data
    const validation = validateCVData(cvData);
    if (!validation.isValid) {
      throw new Error(`Invalid CV data: ${validation.errors.join(', ')}`);
    }

    const sanitizedData = sanitizeObject(cvData);
    const sanitizedTitle = title.slice(0, 100).trim();

    // The RLS policy will ensure only the owner can update
    const { data, error } = await supabase
      .from('saved_cvs')
      .update({
        title: sanitizedTitle,
        cv_data: sanitizedData,
      })
      .eq('id', cvId)
      .eq('user_id', userId) // Extra security check
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteCVSecurely(cvId: string) {
    const userId = this.getUserId();
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
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('Authentication required');
    }

    // Rate limiting
    if (!checkRateLimit(`update_profile_${userId}`, 5, 60000)) {
      throw new Error('Too many requests. Please wait before trying again.');
    }

    // Validate and sanitize data
    const validation = validateUserProfile(updates);
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
    const userId = this.getUserId();
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

    if (error) throw error;
  }
}
