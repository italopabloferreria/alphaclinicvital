import { LucideIcon } from 'lucide-react';

export type PageRoute = 
  | 'home' 
  | 'tratamentos' 
  | 'sobre' 
  | 'contato' 
  | 'procedimento' 
  | 'clube'
  | 'privacidade' 
  | 'termos' 
  | 'cookies'
  | 'copyright';

export type NavigateFn = (route: PageRoute, slug?: string) => void;


export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  tag?: string;
  category?: 'facial' | 'corporal' | 'laser';
  duration?: string;
  recovery?: string;
  benefits?: string[];
  longDescription?: string;
}

export interface NavItem {
  label: string;
  route: PageRoute;
  href?: string;
}

export interface ClinicStatistic {
  value: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  credential: string;
  bio: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
