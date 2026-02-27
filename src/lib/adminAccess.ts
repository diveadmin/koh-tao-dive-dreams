type SupabaseUserLike = {
  email?: string | null;
  app_metadata?: Record<string, any> | null;
  user_metadata?: Record<string, any> | null;
};

const normalizeEmail = (value = '') => String(value).trim().toLowerCase();

const parseAllowedAdminEmails = () => {
  const raw = (import.meta.env.VITE_ADMIN_EMAILS || '').trim();
  return raw
    .split(',')
    .map(normalizeEmail)
    .filter(Boolean);
};

export const hasAdminAccess = (user: SupabaseUserLike | null | undefined) => {
  if (!user) return false;

  const appRole = user.app_metadata?.app_role;
  const userRole = user.user_metadata?.app_role || user.user_metadata?.role;
  if (appRole === 'admin' || userRole === 'admin') return true;

  const allowedEmails = parseAllowedAdminEmails();
  if (!allowedEmails.length) return false;

  return allowedEmails.includes(normalizeEmail(user.email || ''));
};
