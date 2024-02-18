import Button from "./Button";

import type { Meta, StoryObj } from "@storybook/react";

// メタデータ
const meta = {
  title: "Button",
  component: Button,
} as Meta<typeof Button>;

export default meta;

// 各ストーリーの名前付きエクスポート
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primaryボタン",
    primary: true,
  },
};

export const Normal: Story = {
  args: {
    label: "Normalボタン",
    primary: false,
  },
};
