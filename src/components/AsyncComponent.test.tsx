import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AsyncComponent from "./AsyncComponent";

const user = userEvent.setup();

describe("AsyncComponent", () => {
  it("ボタンをクリックすると非同期処理が実行される", async () => {
    render(<AsyncComponent />);

    // 初期表示
    expect(screen.getByText("Initial text")).toBeInTheDocument();

    // ボタンをクリックすると非同期処理が実行され、テキストが変更されるか
    const button = screen.getByRole("button");
    await user.click(button);
    // 非同期処理実行中
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // 非同期処理実行後
    // waitFor(): 所定の時間、引数のコールバック関数をリトライし続ける関数
    await waitFor(
      () => {
        expect(screen.getByText("Updated text")).toBeInTheDocument();
      },
      {
        interval: 50,
        timeout: 3000,
      }
    );
  });
});
