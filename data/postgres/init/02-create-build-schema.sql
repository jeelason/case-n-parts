\connect great-value
CREATE TABLE IF NOT EXISTS public.build
(
    Id SERIAL NOT NULL PRIMARY KEY,
    "Name" CHARACTER VARYING(200),
    MoboId INTEGER REFERENCES mobos,
    CpuId INTEGER REFERENCES cpu,
    PsuId INTEGER REFERENCES psu ,
    "Private" BOOLEAN DEFAULT false,
    UserId INTEGER REFERENCES "user"
);

