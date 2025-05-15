import type { Meta, StoryObj } from '@storybook/react';
import { LandingPage } from '@/components/landing/landing-page';
import landingData from '@/mock/landing.json';

const meta: Meta<typeof LandingPage> = {
  title: 'Landing/LandingPage',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onRoleSelect: { action: 'role selected' },
  },
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {
  args: {
    siteName: landingData.siteName,
    poweredBy: landingData.poweredBy,
    roles: landingData.roles,
    features: landingData.features,
    links: landingData.links,
    certs: landingData.certs,
  },
};

// Without certificates and links
export const Minimal: Story = {
  args: {
    siteName: landingData.siteName,
    poweredBy: landingData.poweredBy,
    roles: landingData.roles,
    features: landingData.features,
  },
};