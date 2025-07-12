import { AboutHero } from "@/components/home/nosotros/AboutHero";
import { CertificationsSection } from "@/components/home/nosotros/CertificationsSection";
import { CompanyHistory } from "@/components/home/nosotros/CompanyHistory";
import { FacilitiesSection } from "@/components/home/nosotros/FacilitiesSection";
import { TeamSection } from "@/components/home/nosotros/TeamSection";

export function NosotrosView() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <CompanyHistory />
      <TeamSection />
      <CertificationsSection />
      <FacilitiesSection />
    </div>
  );
}
