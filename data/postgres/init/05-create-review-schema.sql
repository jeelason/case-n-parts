\connect great-value

CREATE TABLE IF NOT EXISTS public.rating
(
    Id SERIAL  PRIMARY KEY,
    Liked BOOLEAN DEFAULT false,
    BuildId INTEGER REFERENCES build,
    UserId INTEGER REFERENCES "user"
);

ALTER TABLE IF EXISTS public.rating
    OWNER to "great-value";