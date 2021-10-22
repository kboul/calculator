import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Calculator from ".";
import { initialResult, keys } from "./constants";

beforeEach(() => render(<Calculator />));

describe("buttons appear on the UI and have the correct label", () => {
  let buttons: HTMLElement[];
  beforeEach(() => (buttons = screen.getAllByRole("button")));

  test("18 buttons should appear on the screen", () => {
    expect(buttons).toHaveLength(18);
  });

  test("buttons have the correct label", () => {
    buttons.forEach((button, index) => {
      expect(button.innerHTML).toEqual(keys[index].label);
    });
  });
});

test("initial screen value is 0", () => {
  const result = screen.getByLabelText("result");
  expect(result.innerHTML).toBe("0");
});

test("AC clears the result screen", () => {
  const seven = screen.getByText(keys[3].label);
  const eight = screen.getByText(keys[4].label);
  userEvent.click(seven);
  userEvent.click(eight);

  const result = screen.getByLabelText("result");
  expect(result.innerHTML).toBe(`${keys[3].label}${keys[4].label}`);

  const allClearBtn = screen.getByText(keys[0].label);
  userEvent.click(allClearBtn);
  expect(result.innerHTML).toBe("");
});

test("C button clears only last screen's character", () => {
  const nine = screen.getByText(keys[5].label);
  const four = screen.getByText(keys[7].label);
  userEvent.click(nine);
  userEvent.click(four);

  const result = screen.getByLabelText("result");
  expect(result.innerHTML).toBe(`${keys[5].label}${keys[7].label}`);

  const clearButton = screen.getByText(keys[1].label);
  userEvent.click(clearButton);
  expect(screen.getByLabelText("result").innerHTML).toBe(keys[5].label);
});

describe("user typed one of the operators when value is empty", () => {
  let result: HTMLElement;
  beforeEach(() => {
    const allClearBtn = screen.getByText(keys[0].label);
    userEvent.click(allClearBtn);
    result = screen.getByLabelText("result");
  });

  test("user typed ÷", () => {
    const divisionOperator = screen.getByText(keys[2].label);
    userEvent.click(divisionOperator);
    expect(result.innerHTML).toBe("");
  });

  test("user typed ×", () => {
    const multiplicationOperator = screen.getByText(keys[6].label);
    userEvent.click(multiplicationOperator);
    expect(result.innerHTML).toBe("");
  });

  test("user typed +", () => {
    const addOperator = screen.getByText(keys[keys.length - 4].label);
    userEvent.click(addOperator);
    expect(result.innerHTML).toBe("");
  });

  test("user typed -", () => {
    const subtractOperator = screen.getByText(keys[keys.length - 8].label);
    userEvent.click(subtractOperator);
    expect(result.innerHTML).toBe("");
  });

  test("user typed =", () => {
    const equalOperator = screen.getByText(keys[keys.length - 1].label);
    userEvent.click(equalOperator);
    expect(result.innerHTML).toBe("");
  });
});

describe("user typed one of the operators when value is 0 or any other number", () => {
  let result: HTMLElement;
  beforeEach(() => (result = screen.getByLabelText("result")));

  test("user typed ÷", () => {
    const divisionOperator = screen.getByText(keys[2].label);
    userEvent.click(divisionOperator);
    expect(result.innerHTML).toBe(`${initialResult}${keys[2].label}`);
  });

  test("user typed ×", () => {
    const multiplicationOperator = screen.getByText(keys[6].label);
    userEvent.click(multiplicationOperator);
    expect(result.innerHTML).toBe(`${initialResult}${keys[6].label}`);
  });

  test("user typed +", () => {
    const addOperator = screen.getByText(keys[keys.length - 4].label);
    userEvent.click(addOperator);
    expect(result.innerHTML).toBe(
      `${initialResult}${keys[keys.length - 4].label}`
    );
  });

  test("user typed -", () => {
    const subtractOperator = screen.getByText(keys[keys.length - 8].label);
    userEvent.click(subtractOperator);
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
