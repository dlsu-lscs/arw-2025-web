// User type definitions
export interface User {
  sub: string;
  name: string;
  picture: string;
  needsRefresh?: boolean;
}

// Return type for auth functions that may need refresh
export type AuthUser = User | null;
