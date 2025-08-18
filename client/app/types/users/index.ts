export interface UserType {
  id: string;
  login: string;
  lastName: string;
  firstName: string;
  email?: string | null;
  phone?: string | null;
  image?: string | null;
  gender?: "Male" | "Female" | null;
  birthDate?: string | null; // ⚠️ côté API c’est une string ISO, pas un DateTime
  birthPlace?: string | null;
  matricule?: string | null;
  hasAccount: boolean;
  isVisible: boolean;

  createdAt: string; // ISO date renvoyée par Adonis
  updatedAt: string | null;
  deletedAt?: string | null;

  createdBy?: string | null;
  modifiedBy?: string | null;
  deletedBy?: string | null;
  suspendedBy?: string | null;
}
