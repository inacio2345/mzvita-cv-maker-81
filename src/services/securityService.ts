
import { z } from 'zod';
import { AuditService } from './auditService';

// Validation schemas
export const personalDataSchema = z.object({
  photo: z.string().nullable().optional(),
  fullName: z.string().min(1).max(100).optional(),
  email: z.string().email().max(255).optional(),
  phone: z.string().max(20).optional(),
  address: z.string().max(500).optional(),
  idNumber: z.string().max(50).optional(),
  website: z.string().url().max(255).optional().or(z.literal('')),
});

export const cvDataSchema = z.object({
  personalData: personalDataSchema,
  about: z.string().max(2000),
  education: z.array(z.any()).max(20),
  experience: z.array(z.any()).max(20),
  skills: z.array(z.any()).max(50),
  references: z.array(z.any()).max(10),
  colorPalette: z.any(),
});

export const userProfileSchema = z.object({
  nome_completo: z.string().min(1).max(100).optional(),
  profissao: z.string().max(100).optional(),
  descricao: z.string().max(1000).optional(),
  idioma: z.enum(['pt', 'en', 'es']).optional(),
  tema: z.enum(['claro', 'escuro']).optional(),
  notificacoes_ativadas: z.boolean().optional(),
});

// Sanitization functions
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove basic HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }
  return obj;
};

// Rate limiting (simple client-side implementation)
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

export const checkRateLimit = (key: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now - record.lastReset > windowMs) {
    rateLimitStore.set(key, { count: 1, lastReset: now });
    return true;
  }
  
  if (record.count >= maxRequests) {
    // Log rate limit exceeded
    const userId = key.split('_').pop();
    if (userId) {
      AuditService.logRateLimitExceeded(userId, key.replace(`_${userId}`, ''));
    }
    return false;
  }
  
  record.count++;
  return true;
};

// Validation functions
export const validateCVData = (data: any, userId?: string): { isValid: boolean; errors: string[] } => {
  try {
    cvDataSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      
      // Log validation errors for security monitoring
      if (userId) {
        AuditService.logValidationError(userId, 'cv_data', JSON.stringify(data).substring(0, 100));
      }
      
      return { 
        isValid: false, 
        errors 
      };
    }
    return { isValid: false, errors: ['Validation failed'] };
  }
};

export const validateUserProfile = (data: any, userId?: string): { isValid: boolean; errors: string[] } => {
  try {
    userProfileSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
      
      // Log validation errors for security monitoring
      if (userId) {
        AuditService.logValidationError(userId, 'user_profile', JSON.stringify(data).substring(0, 100));
      }
      
      return { 
        isValid: false, 
        errors 
      };
    }
    return { isValid: false, errors: ['Validation failed'] };
  }
};

// File validation
export const validateFileUpload = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Tipo de arquivo não permitido. Use JPEG, PNG ou WebP.' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Arquivo muito grande. Máximo de 5MB.' };
  }
  
  return { isValid: true };
};
