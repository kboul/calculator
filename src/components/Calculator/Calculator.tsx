import { useState } from "react";

import {
  getAllExceptLastLetter,
  getArithmeticOperation,
  getLastLetter,
  operators,
} from "./utils";
import { initialResult, keys } from "./constants";
import "./Calculator.sass";

export default function Calculator() {
  const [result, setResult] = useState(initialResult);

  const clearOperator = () =>
    setResult((prevResult) => getAllExceptLastLetter(prevResult));

  const equalOperator = (label: string) => {
    const lastResultLetter = getLastLetter(result);
    if (operators.includes(lastResultLetter)) return;

    const arithmeticOperation = getArithmeticOperation(result, label);
    setResult(eval(arithmeticOperation).toString());
  };

  const changeResult = (label: string) => {
    const lastResultLetter = getLastLetter(result);
    const isLastTypedKeyAnOperation = operators.includes(label);
    const isLastLetterAnOperation = operators.includes(lastResultLetter);
    if (isLastTypedKeyAnOperation && isLastLetterAnOperation)
      return setResult((prevResult) =>
        prevResult.replace(getLastLetter(prevResult), label)
      );

    setResult((prevResult) => {
      if (
        prevResult === initialResult &&
        (!operators.includes(label) || label === keys[10].label)
      )
        return label;
      return prevResult + label;
    });
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
    <div className='wrapper'>
      <div className='buttonsWrapper'>
        <div className='result'>{result}</div>

        {keys.map(({ id, label, className }) => (
          <button
            className={`button ${className}`}
            key={id}
            onClick={handleKeyClick(label)}
            type='button'
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
