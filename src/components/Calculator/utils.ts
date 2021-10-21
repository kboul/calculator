import { keys } from "./constants";

const operators: string[] = keys
  .filter(({ className }) => className === "operators")
  .map(({ label }) => label);

const getAllExceptLastLetter = (word: string): string =>
  word.substring(0, word.length - 1);

const getLastLetter = (word: string): string => word.slice(-1);

const getArithmeticOperation = (result: string, key: string): string => {
  const operation = `${result}${key}`.replace("=", "");

  if (operation.includes(keys[2].label))
    return operation.replace(keys[2].label, "/");

  if (operation.includes(keys[6].label))
    return operation.replace(keys[6].label, "*");

  return operation;
};

export {
  getAllExceptLastLetter,
  getArithmeticOperation,
  getLastLetter,
  operators,
};
