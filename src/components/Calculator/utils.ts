import { keys } from "./constants";

const operators: string[] = keys
  .filter(({ className }) => className === "operators")
  .map(({ label }) => label);

const getAllExceptLastLetter = (word: string): string =>
  word.substring(0, word.length - 1);

const getLastLetter = (word: string): string => word.slice(-1);

const replaceAllOccurences = (text: string): RegExp =>
  new RegExp(`\\b${text}\\b`, "gi");

const getArithmeticOperation = (result: string, key: string): string => {
  const operation = `${result}${key}`.replace(keys[keys.length - 1].label, "");

  const operatorDivision = operation.includes(keys[2].label);
  const operatorMultiplication = operation.includes(keys[6].label);

  if (operatorDivision && operatorMultiplication)
    return operation
      .replace(replaceAllOccurences(keys[2].label), "/")
      .replace(replaceAllOccurences(keys[6].label), "*");

  if (operatorDivision)
    return operation.replace(replaceAllOccurences(keys[2].label), "/");

  if (operatorMultiplication)
    return operation.replace(replaceAllOccurences(keys[6].label), "*");

  return operation;
};

const adjustToKeyboardKeys = (label: string): string => {
  if (label === keys[6].label) return "*";
  if (label === keys[2].label) return "/";
  if (label === keys[keys.length - 1].label) return "Enter";
  if (label === keys[1].label) return "Backspace";
  if (label === keys[0].label) return "Escape";
  return label;
};

export {
  adjustToKeyboardKeys,
  getAllExceptLastLetter,
  getArithmeticOperation,
  getLastLetter,
  operators
};
