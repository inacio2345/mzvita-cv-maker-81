import { supabase } from '@/lib/supabase';

export interface SecurityEvent {
  user_id?: string;
  event_type: 'failed_login' | 'suspicious_activity' | 'rate_limit_exceeded' | 'validation_error' | 'unauthorized_access';
  details: string;
  ip_address?: string;
  user_agent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export class AuditService {
  private static getUserInfo() {
    return {
      ip_address: 'client-side', // In production, this would come from server
      user_agent: navigator.userAgent
    };
  }

  static async logSecurityEvent(event: SecurityEvent) {
    try {
      const userInfo = this.getUserInfo();
      
      // Log to console for development
      console.warn('Security Event:', {
        ...event,
        ...userInfo,
        timestamp: new Date().toISOString()
      });

      // In production, you would send this to your logging service
      // For now, we'll store critical events in localStorage for debugging
      if (event.severity === 'critical' || event.severity === 'high') {
        const logs = JSON.parse(localStorage.getItem('security_logs') || '[]');
        logs.push({
          ...event,
          ...userInfo,
          timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 logs
        if (logs.length > 100) {
          logs.splice(0, logs.length - 100);
        }
        
        localStorage.setItem('security_logs', JSON.stringify(logs));
      }

      // Send to server in production
      // await supabase.from('security_logs').insert([{
      //   ...event,
      //   ...userInfo
      // }]);

    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  static async logFailedLogin(email: string, reason: string) {
    await this.logSecurityEvent({
      event_type: 'failed_login',
      details: `Failed login attempt for email: ${email}. Reason: ${reason}`,
      severity: 'medium'
    });
  }

  static async logSuspiciousActivity(userId: string, activity: string) {
    await this.logSecurityEvent({
      user_id: userId,
      event_type: 'suspicious_activity',
      details: activity,
      severity: 'high'
    });
  }

  static async logRateLimitExceeded(userId: string, operation: string) {
    await this.logSecurityEvent({
      user_id: userId,
      event_type: 'rate_limit_exceeded',
      details: `Rate limit exceeded for operation: ${operation}`,
      severity: 'medium'
    });
  }

  static async logValidationError(userId: string, field: string, value: string) {
    await this.logSecurityEvent({
      user_id: userId,
      event_type: 'validation_error',
      details: `Validation failed for field: ${field}. Value: ${value.substring(0, 50)}...`,
      severity: 'low'
    });
  }

  static async logUnauthorizedAccess(userId: string, resource: string) {
    await this.logSecurityEvent({
      user_id: userId,
      event_type: 'unauthorized_access',
      details: `Unauthorized access attempt to resource: ${resource}`,
      severity: 'critical'
    });
  }

  static getSecurityLogs(): SecurityEvent[] {
    try {
      return JSON.parse(localStorage.getItem('security_logs') || '[]');
    } catch {
      return [];
    }
  }

  static clearSecurityLogs() {
    localStorage.removeItem('security_logs');
  }
}
