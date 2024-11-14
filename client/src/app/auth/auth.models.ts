// eslint-disable-next-line import/named
import { JwtPayload } from 'jwt-decode';

export interface AuthStatus {
  isAuthenticated: boolean;
  userId: number;
}

export interface AuthResponse {
  accessToken: string;
}

export const DEFAULT_AUTH_STATUS: AuthStatus = {
  isAuthenticated: false,
  userId: 0
};

export interface Auth0JwtPayload extends JwtPayload {
  email: string;
}
