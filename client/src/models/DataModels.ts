export interface AppointmentData {
  key: number;
  serviceType: string;
  date: string;
  veterinarianName: string;
  appointmentStatus: string;
  appointmentNotes: string;
}

export interface CustomerData {
  email: string;
  username: string;
  fullName?: string | "";
  phoneNumber?: string;
  gender?: boolean | null;
  photoUrl?: string | null;
  city?: string | null;
  district?: string | null;
  ward?: string | null;
  detailAddress?: string | "";
}
