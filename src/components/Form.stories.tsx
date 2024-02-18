import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import Form from "./Form";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Form",
  component: Form,
} as Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};

export const Testing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement); // react testing libraryのscreenと似ているもの

    // プロジェクトによるが、基本的にテストはJestだけでOK
    // → Jest一箇所にテストをまとめた方が良い
    // → StoryBookのインタラクションテストではモックが使えない（現状）など機能が不足している

    // input要素の取得
    const input = canvas.getByRole("textbox");
    // 初期状態が空であることをテスト
    await expect(input).toHaveTextContent("");

    // ユーザーによるにテキスト入力を再現
    // testing-libraryの時とは違い、setup関数でユーザーインスタンスを生成する必要はない
    const inputText = "play function";
    await userEvent.type(input, inputText);
    // 入力内容が反映されていることをテスト
    await expect(canvas.getByDisplayValue(inputText)).toBeInTheDocument();
  },
};
