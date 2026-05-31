import { describe, expect, it } from "vitest";
import {
  loginFormDefaultValues,
  loginFormSchema,
  type LoginFormValues
} from "@/lib/forms/login-form-schema";

function getIssuePaths(result: ReturnType<typeof loginFormSchema.safeParse>) {
  if (result.success) {
    return [];
  }

  return result.error.issues.map((issue) => issue.path.join("."));
}

describe("loginFormSchema", () => {
  it("accepts a valid login payload", () => {
    const result = loginFormSchema.safeParse({
      email: "admin@example.com",
      password: "fake-password"
    });

    expect(result.success).toBe(true);
  });

  it("trims email before returning parsed values", () => {
    const result = loginFormSchema.parse({
      email: "  admin@example.com  ",
      password: "fake-password"
    });

    expect(result).toEqual({
      email: "admin@example.com",
      password: "fake-password"
    });
  });

  it("rejects an empty email", () => {
    const result = loginFormSchema.safeParse({
      email: "   ",
      password: "fake-password"
    });

    expect(result.success).toBe(false);
    expect(getIssuePaths(result)).toContain("email");
  });

  it("rejects an invalid email", () => {
    const result = loginFormSchema.safeParse({
      email: "not-an-email",
      password: "fake-password"
    });

    expect(result.success).toBe(false);
    expect(getIssuePaths(result)).toContain("email");
  });

  it("rejects an empty password", () => {
    const result = loginFormSchema.safeParse({
      email: "admin@example.com",
      password: ""
    });

    expect(result.success).toBe(false);
    expect(getIssuePaths(result)).toContain("password");
  });

  it("exports default values that match the inferred login form type", () => {
    const defaults: LoginFormValues = loginFormDefaultValues;

    expect(defaults).toEqual({
      email: "",
      password: ""
    });
  });
});
