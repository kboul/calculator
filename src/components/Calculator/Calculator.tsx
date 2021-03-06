import { useState } from "react";

import useKeyPress from "./hooks";
import {
  adjustToKeyboardKeys,
  getAllExceptLastLetter,
  getArithmeticOperation,
  getLastLetter,
  hasOperator,
  operators
} from "./utils";
import { initialResult, keys } from "./constants";
import "./Calculator.sass";

export default function Calculator() {
  const [result, setResult] = useState(initialResult);
  const [startNewCalculation, setStartNewCalculation] = useState(false);

  keys.forEach(({ label }) => {
    useKeyPress(adjustToKeyboardKeys(label), () => handleKeyClick(label)());
  });

  const allClearOperator = () => {
    setResult("");
    if (startNewCalculation) setStartNewCalculation(false);
  };

  const clearOperator = () => {
    setResult(getAllExceptLastLetter);
    if (startNewCalculation) setStartNewCalculation(false);
  };

  const equalOperator = (label: string) => {
    const lastResultLetter = getLastLetter(result);
    const resultHasOperator = hasOperator(result);
    if (
      operators.includes(lastResultLetter) ||
      result === "" ||
      !resultHasOperator
    )
      return;

    const arithmeticOperation = getArithmeticOperation(result, label);
    setResult(eval(arithmeticOperation).toString());
    setStartNewCalculation(true);
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

    const userTypedAfterResult = startNewCalculation && !keyIsAnOperator;
    setResult(prevResult => {
      if (
        userTypedAfterResult ||
        (prevResult === initialResult && !keyIsAnOperator)
      )
        return label;
      return prevResult + label;
    });

    if (startNewCalculation) setStartNewCalculation(false);
  };

  const handleKeyClick = (label: string) => () => {
    switch (label) {
      case keys[0].label:
        return allClearOperator();
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
