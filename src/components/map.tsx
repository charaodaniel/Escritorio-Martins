"use client";

export default function Map() {
  const address = "Rua Franklin Bastos de Carvalho, 754, Centro, Manoel Viana, RS, 97640-000, Brazil";
  const embedUrl = `https://maps.google.com/maps?q=${encodeURI(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

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
