import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().nonempty({ message: "Video prompt cannot be empty" }),
});