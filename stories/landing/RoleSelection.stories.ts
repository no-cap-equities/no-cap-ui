import type { Meta, StoryObj } from '@storybook/react';
import { RoleSelection } from '@/components/landing/role-selection';
import landingData from '@/mock/landing.json';

const meta: Meta<typeof RoleSelection> = {
  title: 'Landing/RoleSelection',
  component: RoleSelection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onRoleSelect: { action: 'role selected' },
  },
};

export default meta;
type Story = StoryObj<typeof RoleSelection>;

export const Default: Story = {
  args: {
    roles: landingData.roles,
  },
};

// With one role disabled
export const WithDisabledRole: Story = {
  args: {
    roles: [
      { ...landingData.roles[0] },
      { ...landingData.roles[1], disabled: true },
      { ...landingData.roles[2] },
    ],
  },
};