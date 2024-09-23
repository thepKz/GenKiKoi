export interface SignUpData {
  username: string;
  email: string;
  password: string;
  photoUrl: string;
}

export interface AuthState {
  _id: string;
  username: string;
  email: string;
  role: string;
  token: string;
}
