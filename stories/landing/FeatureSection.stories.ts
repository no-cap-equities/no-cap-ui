import type { Meta, StoryObj } from '@storybook/react';
import { FeatureSection } from '@/components/landing/feature-section';
import landingData from '@/mock/landing.json';

const meta: Meta<typeof FeatureSection> = {
  title: 'Landing/FeatureSection',
  component: FeatureSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeatureSection>;

export const Default: Story = {
  args: {
    features: landingData.features,
  },
};

// With custom features
export const CustomFeatures: Story = {
  args: {
    features: [
      { icon: 'ShieldCheck', label: 'Enterprise Security' },
      { icon: 'PieChart', label: 'Data Analytics' },
      { icon: 'Zap', label: 'Fast Performance' },
      { icon: 'Unknown', label: 'Feature with unknown icon' },
    ],
  },
};