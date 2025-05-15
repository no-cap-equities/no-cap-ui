import { LandingPage } from '@/components/landing/landing-page';
import landingData from '@/mock/landing.json';

export default function Home() {
  return (
    <LandingPage 
      siteName={landingData.siteName}
      poweredBy={landingData.poweredBy}
      roles={landingData.roles}
      features={landingData.features}
      links={landingData.links}
      certs={landingData.certs}
      // In a real app, we'd use a client component to handle this
      // onRoleSelect={(id) => console.log(`Selected role: ${id}`)}
    />
  );
}