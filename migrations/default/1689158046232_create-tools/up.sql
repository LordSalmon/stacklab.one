SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare _new record;
begin _new := new;
_new."updated_at" = now();
return _new;
end;
$$;
CREATE TABLE public.tools (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying NOT NULL,
    description_short text NOT NULL,
    website_url character varying NOT NULL,
    repository_url character varying NOT NULL,
    icon uuid NOT NULL,
    background_image uuid NOT NULL,
    stars integer NOT NULL,
    tags jsonb NOT NULL,
    is_free boolean NOT NULL,
    is_maintained boolean NOT NULL,
    author uuid NOT NULL,
    language uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    hydrated_at timestamp with time zone NOT NULL
);
ALTER TABLE ONLY public.tools
    ADD CONSTRAINT tools_pkey PRIMARY KEY (id);
