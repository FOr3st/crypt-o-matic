import { validatePassword } from "./validation";

describe("validation utils", () => {
  describe("validatePassword()", () => {
    test("Should return validation message when password is empty or shorter than 6 symbols", () => {
      expect(validatePassword("asd")).toBe("Password is too short");
      expect(validatePassword("12345")).toBe("Password is too short");
      expect(validatePassword("")).toBe("Password is empty");
    });

    test("Should return nothing if input is valid", () => {
      expect(validatePassword("123456")).toBeUndefined();
      expect(validatePassword("password")).toBeUndefined();
    });
  });
});
