export interface IUser {
  username: string;
  email: string;
  password: string;
  photoUrl: string;
  fullName: string;
  phoneNumber: string;
  role: "customer" | "staff" | "doctor" | "manager";
  gender: "nam" | "nữ";
}
