import { z } from "zod"

export const userSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  image: z.string().trim().url("Enter a valid URL").or(z.literal("")),
})

export type UserFormValues = z.infer<typeof userSchema>

export const validateUser = (values: UserFormValues) => {
  const result = userSchema.safeParse(values)
  const errors: Partial<Record<keyof UserFormValues, string>> = {}
  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof UserFormValues
      if (!errors[field]) errors[field] = issue.message
    }
  }
  return errors
}
