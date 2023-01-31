import passworder from "browser-passworder";

export async function encrypt(object: any, password: string) {
  return await passworder.encrypt(password, object);
}

export async function decrypt<T>(blob: string, password: string) {
  return (await passworder.decrypt(password, blob)) as T;
}
