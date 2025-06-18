"use server";

import { createClient } from "@/utils/supabase/server";
import { headerContentSchema, HeaderContentSchema } from "./schema";

export async function getHeaderContent() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("header_content")
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function updateHeaderContent(values: HeaderContentSchema) {
  const supabase = createClient();
  const parsed = headerContentSchema.safeParse(values);
  if (!parsed.success) throw parsed.error;
  const { error } = await supabase
    .from("header_content")
    .update(parsed.data)
    .eq("id", values.id);
  if (error) throw error;
  return true;
}
