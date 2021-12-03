export interface user {
  id: number | null;
  mail: string;
  pseudo: string;
  isAdmin: boolean;
  lieuNaissance: string;
  prenom: string;
  nom: string;
  password: string;
  sessionToken: string;
  refreshToken: string;
}
