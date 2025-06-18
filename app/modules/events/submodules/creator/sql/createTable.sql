CREATE TYPE event_status AS ENUM ('initialized', 'in_process', 'completed', 'abandoned');

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL,
  budget NUMERIC,
  location TEXT,
  guests INT,
  tags JSONB,
  custom_tags TEXT[],
  possible_date DATE,
  status event_status DEFAULT 'initialized',
  ai_suggestions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);