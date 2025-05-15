export const config = {
  app: {
    name: 'No Cap',
    description: 'Equity management for the digital age',
    poweredBy: 'Forte',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api/mock',
  },
  auth: {
    providers: ['wallet', 'email'],
  },
  environment: process.env.NODE_ENV || 'development',
  deployment: {
    cloudProvider: 'google',
    region: 'us-central1',
  },
}