/** Dados de cadastro de QA (mock local até integração com backend) */
export type QASeniority = 'intern' | 'junior' | 'mid' | 'senior' | 'lead' | 'principal';

export type QARegistrationPayload = {
  fullName: string;
  lubyEmail: string;
  seniority: QASeniority;
  city: string;
  primaryFocus: string;
};
