import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/components/landing/header';
import landingData from '@/mock/landing.json';

const meta: Meta<typeof Header> = {
  title: 'Landing/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    siteName: landingData.siteName,
    poweredBy: landingData.poweredBy,
  },
};

export const WithoutPoweredBy: Story = {
  args: {
    siteName: landingData.siteName,
  },
};