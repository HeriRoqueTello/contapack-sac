import { ContactForm } from "@/components/home/contacto/ContactForm";
import { ContactHero } from "@/components/home/contacto/ContactHero";
import { ContactMap } from "@/components/home/contacto/ContactMap";
import { ContactMethods } from "@/components/home/contacto/ContactMethods";
import { ContactOffices } from "@/components/home/contacto/ContactOffices";

export function ContactoView() {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <ContactOffices />
      <ContactMap />
    </div>
  );
}
