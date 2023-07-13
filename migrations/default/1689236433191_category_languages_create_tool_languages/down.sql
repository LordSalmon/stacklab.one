
-- Compare this snippet from migrations/default/1689236433191_category_languages_create_tool_languages/down.sql:
DROP TABLE public.tool_categories;
DROP TABLE public.tool_languages;
DROP TABLE public.categories;
DROP TABLE public.languages;
DROP TABLE public.tools;
DROP FUNCTION public.set_current_timestamp_updated_at();
