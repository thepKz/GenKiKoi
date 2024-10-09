export interface SignUpData {
  username: string;
  email: string;
  password: string;
  photoUrl: string;
}

export interface AuthState {
  _id: string;
  username: string;
  photoUrl: string;
  email: string;
  role: string;
  token: string;
}
