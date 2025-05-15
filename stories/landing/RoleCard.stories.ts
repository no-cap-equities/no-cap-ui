import type { Meta, StoryObj } from '@storybook/react';
import { RoleCard } from '@/components/landing/role-card';

const meta: Meta<typeof RoleCard> = {
  title: 'Landing/RoleCard',
  component: RoleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof RoleCard>;

export const Founder: Story = {
  args: {
    id: 'founder',
    title: 'Founder / Admin',
    img: '/img/role-founder.svg',
    cta: 'Enter as Founder',
  },
};

export const Investor: Story = {
  args: {
    id: 'investor',
    title: 'Investor',
    img: '/img/role-investor.svg',
    cta: 'Enter as Investor',
  },
};

export const Employee: Story = {
  args: {
    id: 'employee',
    title: 'Employee',
    img: '/img/role-employee.svg',
    cta: 'Enter as Employee',
  },
};

// Disabled role card
export const Disabled: Story = {
  args: {
    id: 'investor',
    title: 'Investor',
    img: '/img/role-investor.svg',
    cta: 'Enter as Investor',
    disabled: true,
  },
};

// Fallback when image is not available
export const Fallback: Story = {
  args: {
    id: 'founder',
    title: 'Founder / Admin',
    img: '', // Empty image path to trigger fallback
    cta: 'Enter as Founder',
  },
};