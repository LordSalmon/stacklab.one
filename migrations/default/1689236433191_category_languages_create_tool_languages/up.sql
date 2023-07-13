SET check_function_bodies = false;

CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL
);
CREATE TABLE public.languages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    name_short character varying NOT NULL
);
CREATE TABLE public.tool_categories (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tool_id uuid NOT NULL,
    category_id uuid NOT NULL
);
CREATE TABLE public.tool_languages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tool_id uuid NOT NULL,
    language_id uuid NOT NULL
);
CREATE TABLE public.tools (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title character varying NOT NULL,
    description_short text,
    website_url character varying,
    repository_url character varying,
    icon uuid,
    background_image uuid,
    stars integer,
    tags jsonb DEFAULT jsonb_build_array() NOT NULL,
    is_free boolean,
    is_maintained boolean,
    author uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    hydrated_at timestamp with time zone
);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tool_categories
    ADD CONSTRAINT tool_categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tool_languages
    ADD CONSTRAINT tool_languages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tools
    ADD CONSTRAINT tools_pkey PRIMARY KEY (id);
CREATE TRIGGER set_public_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_categories_updated_at ON public.categories IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_languages_updated_at BEFORE UPDATE ON public.languages FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_languages_updated_at ON public.languages IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.tool_categories
    ADD CONSTRAINT tool_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tool_categories
    ADD CONSTRAINT tool_categories_tool_id_fkey FOREIGN KEY (tool_id) REFERENCES public.tools(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tool_languages
    ADD CONSTRAINT tool_languages_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.tool_languages
    ADD CONSTRAINT tool_languages_tool_id_fkey FOREIGN KEY (tool_id) REFERENCES public.tools(id) ON UPDATE RESTRICT ON DELETE CASCADE;
