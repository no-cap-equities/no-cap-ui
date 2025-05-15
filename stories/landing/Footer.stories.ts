import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '@/components/landing/footer';
import landingData from '@/mock/landing.json';

const meta: Meta<typeof Footer> = {
  title: 'Landing/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    links: landingData.links,
    certs: landingData.certs,
  },
};

export const LinksOnly: Story = {
  args: {
    links: landingData.links,
  },
};

export const CertsOnly: Story = {
  args: {
    certs: landingData.certs,
  },
};