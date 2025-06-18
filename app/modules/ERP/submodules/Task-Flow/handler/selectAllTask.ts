// dashboad_2/app/modules/ERP/submodules/Task-Flow/handler/selectAllTask.ts
import { selectAll } from "@/app/actions/selectAll";
import { TaskType } from "../types/types";

export function SelectAllTask(): Promise<TaskType[]> { // ✅ Anota el tipo de retorno como Promise<Task[]>
  const tableName = "tasks";
  return selectAll(tableName) as Promise<TaskType[]>; // ✅  Casteo para asegurar el tipo de retorno
}