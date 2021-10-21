const keys = [
  { key: "AC", className: "allClear" },
  { key: "C", className: "clear" },
  { key: "/", className: "operators" },
  { key: "7", className: "seven" },
  { key: "8", className: "eight" },
  { key: "9", className: "nine" },
  { key: "*", className: "operators" },
  { key: "4", className: "four" },
  { key: "5", className: "five" },
  { key: "6", className: "six" },
  { key: "-", className: "operators" },
  { key: "1", className: "one" },
  { key: "2", className: "two" },
  { key: "3", className: "three" },
  { key: "+", className: "operators" },
  { key: "0", className: "zero" },
  { key: ".", className: "dot" },
  { key: "=", className: "equalOperator" },
].map((key, index) => ({ ...key, id: index }));

const initialResult = "0";

export { initialResult, keys };
