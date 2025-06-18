// Tipos para la tabla header_content en Supabase
export interface HeaderContent {
  id: string; // UUID
  title: string;
  subtitle: string | null;
  logo_url: string | null;
  nav_links: Array<{
    label: string;
    url: string;
  }>;
  cta_label: string | null;
  cta_url: string | null;
  created_at: string;
  updated_at: string;
  quick_links?: Array<{
    name: string;
    url: string;
  }>;
}
