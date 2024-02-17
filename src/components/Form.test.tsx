import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "./Form";

const user = userEvent.setup();

describe("Form", () => {
  it("初期状態ではテキストは空欄", () => {
    render(<Form />);
    const input = screen.getByPlaceholderText("Enter text");

    // 要素がレンダリングされるか
    expect(input).toBeInTheDocument();
    // テキストが空欄か
    expect(input).toHaveTextContent("");
  });

  it("入力されたテキストがサブミットされる", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockReturnValue();
    render(<Form />);
    const input = screen.getByPlaceholderText("Enter text");

    // ユーザーの入力を再現
    await user.type(input, "Test Text");
    // 入力した値が反映されてるか
    expect(screen.getByDisplayValue("Test Text")).toBeInTheDocument();

    // submitをクリックした場合の挙動をテスト
    const button = screen.getByRole("button");
    await user.click(button);
    expect(alertSpy).toHaveBeenCalledWith("submitted: Test Text");
    alertSpy.mockRestore(); // スパイをクリア
  });
});
