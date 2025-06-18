-- SNIPER TITLE:  CREATE TABLE Details - Final SQL
CREATE TABLE details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL,
    user_id UUID NOT NULL,
    description TEXT,
    status_detail VARCHAR(255),
    requirements TEXT,
    theme VARCHAR(255),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);