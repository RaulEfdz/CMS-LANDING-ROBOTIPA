import { z } from "zod";
import { galleryImageSchema } from "./schema";

export type GalleryImage = z.infer<typeof galleryImageSchema>;
