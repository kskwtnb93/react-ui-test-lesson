import Counter from "./Counter";

import type { Meta, StoryObj } from "@storybook/react";

// メタデータ
const meta = {
  title: "Counter",
  component: Counter,
} as Meta<typeof Counter>;

export default meta;

// 各ストーリーの名前付きエクスポート
type Story = StoryObj<typeof Counter>;

export const Default: Story = {};
