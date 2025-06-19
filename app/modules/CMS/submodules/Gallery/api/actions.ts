import { createClient } from "@/utils/supabase/client";
import { z } from "zod";
import { galleryImageSchema } from "../schema";

const supabase = createClient();

export async function listItems() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getItem(id: string) {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createItem(input: z.infer<typeof galleryImageSchema>) {
  const { data, error } = await supabase
    .from("gallery")
    .insert([input])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateItem(
  id: string,
  input: Partial<z.infer<typeof galleryImageSchema>>
) {
  const { data, error } = await supabase
    .from("gallery")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteItem(id: string) {
  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error) throw error;
  return true;
}
