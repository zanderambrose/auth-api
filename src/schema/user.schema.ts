import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First Name is Required",
    }),
    lastName: string({
      required_error: "Last Name is Required",
    }),
    password: string({
      required_error: "Password is Required",
    }).min(6, "Password is too short, min is 6 chars"),
    password2: string({
      required_error: "Password 2 is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Please enter a valid email"),
  }).refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
