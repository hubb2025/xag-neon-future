import { z } from 'zod';

// Email validation schema with more strict requirements
export const emailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Formato de email inválido')
  .max(320, 'Email muito longo') // RFC 5321 limit
  .refine(
    (email) => {
      // Additional validation for common email format issues
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    },
    'Formato de email inválido'
  );

// Phone validation (Brazilian format)
export const phoneSchema = z
  .string()
  .optional()
  .refine(
    (phone) => {
      if (!phone) return true; // Optional field
      // Remove all non-numeric characters
      const cleanPhone = phone.replace(/\D/g, '');
      // Brazilian phone: 10 or 11 digits
      return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    },
    'Formato de telefone inválido. Use formato: (11) 99999-9999'
  );

// Name validation with XSS protection
export const nameSchema = z
  .string()
  .min(1, 'Nome é obrigatório')
  .min(2, 'Nome deve ter pelo menos 2 caracteres')
  .max(100, 'Nome muito longo')
  .refine(
    (name) => {
      // Check for potentially malicious content
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /<iframe/i,
        /<object/i,
        /<embed/i,
      ];
      return !suspiciousPatterns.some(pattern => pattern.test(name));
    },
    'Nome contém caracteres não permitidos'
  );

// Message validation with XSS protection
export const messageSchema = z
  .string()
  .min(1, 'Mensagem é obrigatória')
  .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
  .max(2000, 'Mensagem muito longa')
  .refine(
    (message) => {
      // Check for potentially malicious content
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /<iframe/i,
        /<object/i,
        /<embed/i,
      ];
      return !suspiciousPatterns.some(pattern => pattern.test(message));
    },
    'Mensagem contém caracteres não permitidos'
  );

// Contact form validation schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema,
});

// Team invitation validation schema
export const teamInvitationSchema = z.object({
  email: emailSchema,
  full_name: nameSchema,
  role: z.enum(['admin', 'support', 'it'], {
    required_error: 'Função é obrigatória',
  }),
});

// Input sanitization function
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent basic XSS
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

// Phone number formatting for Brazilian phones
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return phone; // Return original if format doesn't match
}

// Generate secure invitation token
export function generateInvitationToken(): string {
  // Generate a cryptographically secure random token
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Validate invitation token format
export function isValidInvitationToken(token: string): boolean {
  // Token should be 64 hex characters
  return /^[a-f0-9]{64}$/.test(token);
}

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type TeamInvitationData = z.infer<typeof teamInvitationSchema>;