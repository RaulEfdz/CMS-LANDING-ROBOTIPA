export interface Service {
  id: string;
  title: string;
  industry?: string;
  service_type?: string;
  short_description?: string;
  long_description?: string;
  image?: string;
  has_demo?: boolean;
}

// Puedes añadir las otras interfaces (ServiceFeature, etc.) aquí también.
