// Define types
export interface MenteeLoginInput {
  email: string;
  password: string;
}

export interface MenteeLoginResponse {
  data: T;
  status: number;
}

export interface MenteeData {
  menteeName: string;
  menteeId: string;
  accessToken: string;
  refreshToken: string;
  message: string;
}
