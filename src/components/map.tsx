"use client";

export default function Map() {
  const address = "Rua Sete de Setembro, 123, Manoel Viana, RS, Brazil";
  const embedUrl = `https://maps.google.com/maps?q=${encodeURI(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="h-full min-h-[300px] w-full overflow-hidden rounded-lg shadow-lg">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title="Office Location"
        aria-label="Office Location"
        style={{ border: 0, minHeight: '300px' }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
