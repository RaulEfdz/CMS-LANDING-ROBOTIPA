import { create } from "@/app/actions/create";
import { formatAndValidateEventData } from "../formatters/eventData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createEvent(inData:any, tags:string[], customTags:string[], budget: string | number) {
    const formData = new FormData(inData);
    formData.append('tags', JSON.stringify(tags));
    formData.append('custom_tags', JSON.stringify(customTags));
    formData.append('budget', String(budget)); // **AÑADIDO: Append budget to formData**
    const data = await formatAndValidateEventData(formData);
    return  await create(data, "events")
  }