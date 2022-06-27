\connect great-value
-- gpu_id INT NULL REFERENCES tabletnae (id)
--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Debian 13.4-4.pgdg100+1)
-- Dumped by pg_dump version 13.4 (Debian 13.4-4.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cpu; Type: TABLE; Schema: public; Owner: jservice
--


CREATE TABLE IF NOT EXISTS public.cpu
(
    Id SERIAL  PRIMARY KEY,
    Processor character varying(60) COLLATE pg_catalog."default",
    Cores character varying(20) COLLATE pg_catalog."default",
    Threads character varying(70) COLLATE pg_catalog."default",
    Speed character varying(10) COLLATE pg_catalog."default",
    Socket_type character varying(30) COLLATE pg_catalog."default" 
);

ALTER TABLE IF EXISTS public.cpu
    OWNER to "great-value";

--
-- Name: gpu; Type: TABLE; Schema: public; Owner: jservice
--

CREATE TABLE IF NOT EXISTS public.gpu
(
    Id SERIAL  PRIMARY KEY,
    Manufacturer character varying(60) COLLATE pg_catalog."default",
    Chipset character varying(100) COLLATE pg_catalog."default",
    Core_Clock_Speed character varying(15) COLLATE pg_catalog."default",
    Video_Memory int,
    Memory_Type character varying(100) COLLATE pg_catalog."default",
    Height character varying(30) COLLATE pg_catalog."default",
    Length character varying(30) COLLATE pg_catalog."default",
    Width character varying(30) COLLATE pg_catalog."default",
    Hdmi character varying(30) COLLATE pg_catalog."default",
    Display_Port character varying(40) COLLATE pg_catalog."default" 
);

--
-- Name: gpu_id_seq; Type: SEQUENCE; Schema: public; Owner: jservice
--

ALTER TABLE IF EXISTS public.gpu
    OWNER to "great-value";

--
-- Name: hdd; Type: TABLE; Schema: public; Owner: jservice
--

CREATE TABLE IF NOT EXISTS public.hdd
(
    Id SERIAL  PRIMARY KEY,
    Brand character varying(30) COLLATE pg_catalog."default",
    Capacity character varying(5) COLLATE pg_catalog."default",
    Interface character varying(25) COLLATE pg_catalog."default",
    Cache character varying(30) COLLATE pg_catalog."default",
    Rpm character varying(30) COLLATE pg_catalog."default" 
);


ALTER TABLE IF EXISTS public.hdd
    OWNER to "great-value";


--
-- Name: ram; Type: TABLE; Schema: public; Owner: jservice
--

CREATE TABLE IF NOT EXISTS public.ram
(
    Id SERIAL  PRIMARY KEY,
    Brand character varying(30) COLLATE pg_catalog."default",
    Memory_Type character varying(8) COLLATE pg_catalog."default",
    Memory_Speed character varying(20) COLLATE pg_catalog."default" ,
    Memory_Channels character varying(10) COLLATE pg_catalog."default" ,
    Pin_Configuration character varying(20) COLLATE pg_catalog."default" 
);


ALTER TABLE IF EXISTS public.ram
    OWNER to "great-value";

--
-- Name: psu; Type: TABLE; Schema: public; Owner: jservice
--

CREATE TABLE IF NOT EXISTS public.psu
(
    Id SERIAL  PRIMARY KEY,
    Brand character varying(50) COLLATE pg_catalog."default",
    Wattage character varying(30) COLLATE pg_catalog."default",
    Atx_Connector character varying(30) COLLATE pg_catalog."default",
    Atx_12v_Connector character varying(30) COLLATE pg_catalog."default",
    Graphics_Connector character varying(30) COLLATE pg_catalog."default",
    Molex_Connector int,
    Sata_Connector int
);

ALTER TABLE IF EXISTS public.psu
    OWNER to "great-value";

CREATE TABLE IF NOT EXISTS public.mobos
(
    Id SERIAL  PRIMARY KEY,
    Brand CHARACTER VARYING(20),
    Socket_Type CHARACTER VARYING(5),
    Max_Memory CHARACTER VARYING(10),
    Max_Memory_Per_Slot CHARACTER VARYING(10),
    Pcie_Slots INT,
    Memory_Slots INT
);

ALTER TABLE IF EXISTS public.mobos
    OWNER to "great-value";



CREATE TABLE IF NOT EXISTS public.color
(
    Id SERIAL  PRIMARY KEY,
    Name character varying(30)
);


ALTER TABLE IF EXISTS public.color
    OWNER to "great-value";

CREATE TABLE IF NOT EXISTS public.user
(
    Id SERIAL  PRIMARY KEY,
    Username character varying(200) NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    Email character varying(255) NOT NULL UNIQUE
);


ALTER TABLE IF EXISTS public.user
    OWNER to "great-value";

CREATE TABLE IF NOT EXISTS public.size
(
    Id SERIAL  PRIMARY KEY,
    Name character varying(10)
);


ALTER TABLE IF EXISTS public.size
    OWNER to "great-value";

CREATE TABLE IF NOT EXISTS public.caseimage
(
    Id SERIAL NOT NULL PRIMARY KEY,
    Picture character varying(2000) NOT NULL
);

ALTER TABLE IF EXISTS public.caseimage
    OWNER to "great-value";

