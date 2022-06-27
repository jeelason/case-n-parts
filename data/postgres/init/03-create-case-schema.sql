\connect great-value

CREATE TABLE IF NOT EXISTS public.case
(
    Id SERIAL NOT NULL PRIMARY KEY,
    BuildId INT NOT NULL REFERENCES build,
    Color INT NOT NULL REFERENCES color,
    Size INT NOT NULL REFERENCES size,
    Picture INT NOT NULL REFERENCES caseimage,
    UNIQUE(BuildId)
);

ALTER TABLE IF EXISTS public.case
    OWNER to "great-value";