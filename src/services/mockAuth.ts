/** Credenciais mock (MVP) — substituir por API / Firebase */
export const MOCK_LOGIN_EMAIL = 'demo@luby.co';
export const MOCK_LOGIN_PASSWORD = 'demo123';

export function validateMockLogin(email: string, password: string): boolean {
  const normalized = email.trim().toLowerCase();
  return normalized === MOCK_LOGIN_EMAIL && password === MOCK_LOGIN_PASSWORD;
}
