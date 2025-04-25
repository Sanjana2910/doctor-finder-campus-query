
export interface Doctor {
  id: number;
  name: string;
  specialities: { name: string }[];  // Array of objects with name property
  experience: number;
  fees: number;
  consultationType?: string[];  // Made optional with ? since some doctors might not have this field
}
