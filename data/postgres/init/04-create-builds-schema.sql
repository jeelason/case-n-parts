\connect great-value

CREATE TABLE IF NOT EXISTS public.buildGpus
(
    Id SERIAL NOT NULL PRIMARY KEY,
    BuildId INTEGER REFERENCES build,
    GpuId INTEGER REFERENCES gpu,
    CardCount INTEGER NOT NULL DEFAULT 1 CHECK (CardCount > 0),

    UNIQUE(BuildId, GpuId)
);

ALTER TABLE IF EXISTS public.buildGpus
    OWNER to "great-value";

CREATE TABLE IF NOT EXISTS public.buildRam
(
    Id SERIAL NOT NULL PRIMARY KEY,
    BuildId INTEGER REFERENCES build,
    RamId INTEGER REFERENCES gpu,
    RamCount INTEGER NOT NULL DEFAULT 1 CHECK (RamCount > 0),

    UNIQUE(BuildId, RamId)
);

ALTER TABLE IF EXISTS public.buildRam
    OWNER to "great-value";

CREATE TABLE IF NOT EXISTS public.buildHdds
(
    Id SERIAL NOT NULL PRIMARY KEY,
    BuildId INTEGER REFERENCES build,
    HddId INTEGER REFERENCES hdd,
    HddCount INTEGER NOT NULL DEFAULT 1 CHECK (HddCount > 0),

    UNIQUE(BuildId, HddId)
);

ALTER TABLE IF EXISTS public.buildRam
    OWNER to "great-value";