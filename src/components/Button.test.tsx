import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("buttonタグがレンダリングされる", () => {
    render(<Button label="ボタン" onClick={() => alert("click")} />);

    const element = screen.getByRole("button");

    // レンダリングされるか
    expect(element).toBeInTheDocument();
    // labelが正常に反映されるか
    expect(element).toHaveTextContent("ボタン");
  });
});
