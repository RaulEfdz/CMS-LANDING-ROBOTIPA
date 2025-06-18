// Tipos para la tabla hero_content en Supabase
export interface HeroContent {
  id: number;
  welcome_title: string;
  welcome_subtitle: string;
  mission_title: string;
  mission_text: string;
  vision_title: string;
  vision_text: string;
  main_image_url: string;
  main_image_alt: string;
  main_image_ai_hint?: string;
}
