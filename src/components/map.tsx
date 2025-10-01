"use client";

export default function Map() {
  const address = "Rua Franklin Bastos de Carvalho, 754, Centro, Manoel Viana, RS, 97640-000, Brazil";
  const embedUrl = `https://maps.google.com/maps?q=${encodeURI(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="h-full min-h-[300px] w-full overflow-hidden rounded-lg shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title="Localização do Escritório"
        aria-label="Localização do Escritório"
        style={{ border: 0, minHeight: '300px' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
