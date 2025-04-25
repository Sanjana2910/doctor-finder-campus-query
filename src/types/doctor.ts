
export interface Doctor {
  id: number;
  name: string;
  specialities: { name: string }[];  // Changed from string[] to match API response
  experience: number;
  fees: number;
  consultationType: string[];
}
