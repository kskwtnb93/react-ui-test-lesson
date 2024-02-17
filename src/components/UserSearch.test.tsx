import axios from "axios";

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { UserSearch } from "./UserSearch";

const user = userEvent.setup();

jest.mock("axios");
const mockAxios = jest.mocked(axios);

describe("UserSearch", () => {
  // 各テストの前にモックをリセット
  beforeEach(() => {
    mockAxios.get.mockReset();
  });

  it("入力フォームに入力した内容でAPIリクエストが送信される", async () => {
    const userInfo = {
      id: 1,
      name: "Taro",
    };
    const res = { data: userInfo };
    mockAxios.get.mockResolvedValue(res);

    render(<UserSearch />);

    const input = screen.getByRole("textbox");
    await user.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/api/users?query=${userInfo.name}`
    );
  });

  it("APIから取得したユーザー情報が画面に表示される", async () => {
    const userInfo = {
      id: 1,
      name: "Taro",
    };
    const res = { data: userInfo };
    mockAxios.get.mockResolvedValue(res);

    render(<UserSearch />);

    const input = screen.getByRole("textbox");
    await user.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText(userInfo.name)).toBeInTheDocument();
    });
  });
});
