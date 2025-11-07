// Fix: Removed self-import of `UserRole` which was causing a declaration conflict.
export enum UserRole {
  Orphan = 'orphan',
  Supervisor = 'supervisor',
  Volunteer = 'volunteer',
  Supporter = 'supporter',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
}

export enum Page {
  Home = 'Home',
  Community = 'Community',
  Education = 'Education',
  Support = 'Support',
  Collaboration = 'Collaboration',
  Talent = 'Talent',
  Volunteer = 'Volunteer',
  Donate = 'Donate',
  Login = 'Login',
  Register = 'Register',
  Profile = 'Profile',
  Admin = 'Admin',
}

export type Language = 'ar' | 'en';

export interface Activity {
  id: number;
  title: string;
  description: string;
  author: string;
  avatar: string;
}