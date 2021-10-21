const keys = [
  { label: "AC", className: "allClear" },
  { label: "C", className: "clear" },
  { label: "÷", className: "operators" },
  { label: "7", className: "seven" },
  { label: "8", className: "eight" },
  { label: "9", className: "nine" },
  { label: "×", className: "operators" },
  { label: "4", className: "four" },
  { label: "5", className: "five" },
  { label: "6", className: "six" },
  { label: "-", className: "operators" },
  { label: "1", className: "one" },
  { label: "2", className: "two" },
  { label: "3", className: "three" },
  { label: "+", className: "operators" },
  { label: "0", className: "zero" },
  { label: ".", className: "dot" },
  { label: "=", className: "equalOperator" },
].map((key, index) => ({ ...key, id: index }));

const initialResult = "0";

export { initialResult, keys };
