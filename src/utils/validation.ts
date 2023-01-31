export function validatePassword(password: string) {
  if (!password.length) {
    return "Password is empty";
  }

  if (password.length < 6) {
    return "Password is too short";
  }
}
