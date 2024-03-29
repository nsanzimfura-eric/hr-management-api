import bcrypt from "bcrypt";

export const hashString = async (plainText: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(plainText, salt);
};

export const verifyStringHash = async (
  plainText: string,
  cipherText: string
): Promise<boolean> => {
  return await bcrypt.compare(plainText, cipherText);
};
