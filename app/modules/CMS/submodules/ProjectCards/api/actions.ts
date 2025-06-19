import { createClient } from "@/utils/supabase/client";
import { z } from "zod";
import { projectSchema } from "../schema";

const supabase = createClient();

export async function listItems() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getItem(id: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createItem(input: z.infer<typeof projectSchema>) {
  const { data, error } = await supabase
    .from("projects")
    .insert([input])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateItem(
  id: string,
  input: Partial<z.infer<typeof projectSchema>>
) {
  const { data, error } = await supabase
    .from("projects")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteItem(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
  return true;
}
