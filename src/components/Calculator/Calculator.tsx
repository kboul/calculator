import { useState } from "react";

import { initialResult, keys } from "./constants";
import "./Calculator.sass";

export default function Calculator() {
  const [result] = useState(initialResult);

  return (
    <div className='wrapper'>
      <div className='buttonsWrapper'>
        <div className='result'>{result}</div>

        {keys.map(({ id, key, className }) => (
          <button
            className={`button ${className}`}
            key={id}
            onClick={() => {}}
            type='button'
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
