"use client";

export default function Map() {
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d728.850118302598!2d-55.48408930199405!3d-29.588578439747604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x950000990542d9c9%3A0xa57001657aa150a!2sR.%20Jos%C3%A9%20Jo%C3%A3o%20Saldanha%2C%20815%20-%20Centro%2C%20Manoel%20Viana%20-%20RS%2C%2097640-000!5e0!3m2!1spt-BR!2sbr!4v1759533695379!5m2!1spt-BR!2sbr";

  return (
    <div className="h-[450px] w-full overflow-hidden rounded-xl shadow-xl border-4 border-card">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title="Localização do Escritório"
        aria-label="Localização do Escritório"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
