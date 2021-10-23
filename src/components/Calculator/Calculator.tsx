import { useState } from "react";

import useKeyPress from "./hooks";
import {
  adjustToKeyboardKeys,
  getAllExceptLastLetter,
  getArithmeticOperation,
  getLastLetter,
  operators
} from "./utils";
import { initialResult, keys } from "./constants";
import "./Calculator.sass";

export default function Calculator() {
  const [result, setResult] = useState(initialResult);
  const [equalOperatorClicked, setEqualOperatorClicked] = useState(false);

  keys.forEach(({ label }) => {
    useKeyPress(adjustToKeyboardKeys(label), () => handleKeyClick(label)());
  });

  const clearOperator = () => setResult(getAllExceptLastLetter);

  const equalOperator = (label: string) => {
    const lastResultLetter = getLastLetter(result);
    if (operators.includes(lastResultLetter) || result === "") return;

    const arithmeticOperation = getArithmeticOperation(result, label);
    setResult(eval(arithmeticOperation).toString());
    setEqualOperatorClicked(true);
  };

  const changeResult = (label: string) => {
    const keyIsAnOperator = operators.includes(label);
    if (!result && keyIsAnOperator) return;

    const lastResultLetter = getLastLetter(result);
    const isLastLetterAnOperation = operators.includes(lastResultLetter);
    if (keyIsAnOperator && isLastLetterAnOperation)
      return setResult(
        prevResult => `${getAllExceptLastLetter(prevResult)}${label}`
      );

    const userTypedAfterResult = equalOperatorClicked && !keyIsAnOperator;
    setResult(prevResult => {
      if (
        userTypedAfterResult ||
        (prevResult === initialResult && !keyIsAnOperator)
      )
        return label;
      return prevResult + label;
    });

    if (equalOperatorClicked) setEqualOperatorClicked(false);
  };

  const handleKeyClick = (label: string) => () => {
    switch (label) {
      case keys[0].label:
        return setResult("");
      case keys[1].label:
        return clearOperator();
      case keys[keys.length - 1].label:
        return equalOperator(label);
      default:
        changeResult(label);
    }
  };

  return (
    <div className="wrapper">
      <div className="buttonsWrapper">
        <div aria-label="result" className="result">
          {result}
        </div>

        {keys.map(({ id, label, className }) => (
          <button
            className={`button ${className}`}
            key={id}
            onClick={handleKeyClick(label)}
            type="button">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
