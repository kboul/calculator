import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Calculator from ".";
import { initialResult, keys } from "./constants";

let allClearKey: HTMLElement;
let clearKey: HTMLElement;

let divisionOperator: HTMLElement;
let multiplicationOperator: HTMLElement;
let additionOperator: HTMLElement;
let subtractionOperator: HTMLElement;
let equalOperator: HTMLElement;

let twoKey: HTMLElement;
let threeKey: HTMLElement;
let fourKey: HTMLElement;
let fiveKey: HTMLElement;
let sixKey: HTMLElement;
let sevenKey: HTMLElement;
let eightKey: HTMLElement;
let nineKey: HTMLElement;

let result: HTMLElement;

beforeEach(() => {
  render(<Calculator />);

  allClearKey = screen.getByText(keys[0].label);
  clearKey = screen.getByText(keys[1].label);

  divisionOperator = screen.getByText(keys[2].label);
  multiplicationOperator = screen.getByText(keys[6].label);
  additionOperator = screen.getByText(keys[keys.length - 4].label);
  subtractionOperator = screen.getByText(keys[keys.length - 8].label);
  equalOperator = screen.getByText(keys[keys.length - 1].label);

  twoKey = screen.getByText(keys[keys.length - 6].label);
  threeKey = screen.getByText(keys[keys.length - 5].label);
  fourKey = screen.getByText(keys[7].label);
  fiveKey = screen.getByText(keys[8].label);
  sixKey = screen.getByText(keys[9].label);
  sevenKey = screen.getByText(keys[3].label);
  eightKey = screen.getByText(keys[4].label);
  nineKey = screen.getByText(keys[5].label);

  result = screen.getByLabelText("result");
});

describe("buttons appear on the UI and have the correct label", () => {
  let buttons: HTMLElement[];
  beforeEach(() => (buttons = screen.getAllByRole("button")));

  test("18 buttons should appear on the screen", () => {
    expect(buttons).toHaveLength(18);
  });

  test("buttons have the correct label", () => {
    buttons.forEach((button, index) =>
      expect(button.innerHTML).toEqual(keys[index].label)
    );
  });
});

test("initial screen value is 0", () => {
  expect(result.innerHTML).toBe("0");
});

test("AC clears the result screen", () => {
  userEvent.click(sevenKey);
  userEvent.click(eightKey);

  expect(result.innerHTML).toBe("78");

  userEvent.click(allClearKey);
  expect(result.innerHTML).toBe("");
});

test("C button clears only last screen's character", () => {
  userEvent.click(nineKey);
  userEvent.click(fourKey);

  expect(result.innerHTML).toBe("94");

  const clearButton = screen.getByText(keys[1].label);
  userEvent.click(clearButton);
  expect(screen.getByLabelText("result").innerHTML).toBe("9");
});

describe("user typed one of the operators when value is empty", () => {
  let result: HTMLElement;
  beforeEach(() => {
    userEvent.click(allClearKey);
    result = screen.getByLabelText("result");
  });

  test("user typed ÷", () => {
    userEvent.click(divisionOperator);
    expect(result.innerHTML).toBe("");
  });

  test("user typed ×", () => {
    userEvent.click(multiplicationOperator);
    expect(result.innerHTML).toBe("");
  });

  test("user typed +", () => {
    userEvent.click(additionOperator);
    expect(result.innerHTML).toBe("");
  });

  test("user typed -", () => {
    userEvent.click(subtractionOperator);
    expect(result.innerHTML).toBe("");
  });

  test("user typed =", () => {
    userEvent.click(equalOperator);
    expect(result.innerHTML).toBe("");
  });
});

describe("user typed one of the operators when value is 0 or any other number", () => {
  test("user typed ÷", () => {
    userEvent.click(divisionOperator);
    expect(result.innerHTML).toBe(`${initialResult}${keys[2].label}`);
  });

  test("user typed ×", () => {
    userEvent.click(multiplicationOperator);
    expect(result.innerHTML).toBe(`${initialResult}${keys[6].label}`);
  });

  test("user typed +", () => {
    userEvent.click(additionOperator);
    expect(result.innerHTML).toBe(
      `${initialResult}${keys[keys.length - 4].label}`
    );
  });

  test("user typed -", () => {
    userEvent.click(subtractionOperator);
    expect(result.innerHTML).toBe(
      `${initialResult}${keys[keys.length - 8].label}`
    );
  });

  test("user typed =", () => {
    const equalOperator = screen.getByText(keys[keys.length - 1].label);
    userEvent.click(equalOperator);
    expect(result.innerHTML).toBe(initialResult);
  });
});

test("user can calculate via division", () => {
  [sixKey, divisionOperator, threeKey, equalOperator].forEach(element =>
    userEvent.click(element)
  );
  expect(result.innerHTML).toBe("2");
});

test("user can calculate via multiplication", () => {
  [sixKey, multiplicationOperator, threeKey, equalOperator].forEach(element =>
    userEvent.click(element)
  );
  expect(result.innerHTML).toBe("18");
});

test("user performs multiple calculations correctly without receiving errors", () => {
  [
    nineKey,
    sixKey,
    multiplicationOperator,
    nineKey,
    subtractionOperator,
    sixKey,
    fourKey,
    clearKey,
    threeKey,
    divisionOperator,
    multiplicationOperator,
    additionOperator,
    twoKey,
    fiveKey,
    divisionOperator,
    eightKey,
    sevenKey,
    multiplicationOperator,
    nineKey,
    sixKey,
    equalOperator
  ].forEach(element => userEvent.click(element));
  expect(result.innerHTML).toBe("828.5862068965517");
});

test("user types an operator multile times and last operator is changed with the operator that was clicked last", () => {
  [
    threeKey,
    divisionOperator,
    additionOperator,
    subtractionOperator,
    multiplicationOperator,
    twoKey,
    clearKey,
    fiveKey,
    divisionOperator,
    additionOperator
  ].forEach(element => userEvent.click(element));
  expect(result.innerHTML).toBe("3×5+");
});

test("user performs a calculation and after equal operator is clicked a new calculation takes place", () => {
  [
    sixKey,
    multiplicationOperator,
    threeKey,
    twoKey,
    clearKey,
    equalOperator
  ].forEach(element => userEvent.click(element));
  expect(result.innerHTML).toBe("18");
  userEvent.click(twoKey);
  expect(result.innerHTML).toBe("2");
});

test("user types from keyboard instead of calculator buttons", async () => {
  [
    { key: "9", code: 57 },
    { key: "Escape", code: 27 },
    { key: "1", code: 49 },
    { key: "2", code: 50 },
    { key: "+", code: 107 },
    { key: "×", code: 106 },
    { key: "÷", code: 111 },
    { key: "-", code: 189 },
    { key: "6", code: 54 },
    { key: "8", code: 56 },
    { key: "Backspace", code: 8 },
    { key: "Enter", code: 12 }
  ].forEach(userAction => fireEvent.keyUp(window, userAction));

  await waitFor(() => expect(result.innerHTML).toBe("6"));
});
