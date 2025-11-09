import React, { useState, useEffect, useRef } from 'react';

// --- Preloader (logo zoom) ---
const Preloader: React.FC<{ logoSrc: string }> = ({ logoSrc }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onReady = () => {
      setTimeout(() => setHidden(true), 400);
    };
    if (document.readyState === 'complete') {
      onReady();
    } else {
      window.addEventListener('load', onReady, { once: true });
    }
    return () => window.removeEventListener('load', onReady);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div
        className="relative"
        style={{
          animation: 'logo-zoom 900ms ease-out forwards',
        }}
      >
        <img
          src={logoSrc}
          alt=""
          className="h-24 w-auto md:h-28 will-change-transform"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <style>{`
        @keyframes logo-zoom {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { animation: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
};

// --- SVG Icons Component ---
const Icon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  const icons: { [key: string]: React.ReactNode } = {
    wrench: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.5 14h.01M4.5 14h.01M8.5 14h.01M12.5 14h.01M18.5 14h.01M15.5 17h.01M4.5 17h.01M8.5 17h.01M12.5 17h.01M18.5 17h.01M8.84 4.842A6.5 6.5 0 0117.5 4.5a6.5 6.5 0 014.658 11.158L12.5 21l-9.658-5.342A6.5 6.5 0 018.5 4.5a6.486 6.486 0 01.34-.458z" />,
    pipe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    badge: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    dollar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1.5M12 18v-1.5m-3.99-2.091A5.5 5.5 0 0012 16a5.5 5.5 0 003.99-1.091" />,
    star: <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />,
    whatsapp: <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.38 1.25 4.82L2 22l5.33-1.38c1.39.75 2.97 1.18 4.67 1.18h.01c5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zM17.2 15.3c-.28-.14-1.65-.81-1.9-0.91s-.44-.14-.62.14c-.18.28-.72.91-.88 1.1s-.33.21-.61.07c-.28-.14-1.18-.43-2.25-1.39-0.83-.75-1.39-1.67-1.56-1.95s-.02-.44.12-.58c.13-.13.28-.33.42-.49.14-.17.19-.28.28-.46.09-.18.05-.33-.02-.47s-.62-1.5-.85-2.05c-.23-.55-.46-.48-.62-.48-.16 0-.34-.01-.51-.01s-.44.07-.68.35c-.24.28-.92 0.9-1.12 2.18s-0.21 2.65 0.05 3.12c.26.47 1.15 1.83 2.79 2.96 1.64 1.13 2.92 1.8 3.9 2.22.98.42 1.87.36 2.58.21.71-.14 1.65-0.68 1.88-1.33.23-.65.23-1.2.16-1.34c-.07-.14-.25-.21-.53-.35z" />,
    facebook: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
    instagram: <path d="M16 11.37A4 4 0  1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01" />,
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icons[name]}
    </svg>
  );
};

// --- Header Component ---
const Header: React.FC<{ onGetQuoteClick: () => void; logoSrc: string }> = ({ onGetQuoteClick, logoSrc }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <img src={logoSrc} alt="Titan Plumber Dubai" className="h-14 md:h-16 w-auto" loading="eager" />
        <button
          onClick={onGetQuoteClick}
          className="bg-[#004487] text-white font-semibold px-5 md:px-6 py-2 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 transform hover:scale-105 hidden md:block"
        >
          contact us
        </button>
      </div>
    </header>
  );
};

// --- Hero Section Component ---
const heroImages = [
  "https://i.postimg.cc/30djV0N4/male-plumber-working-fix-problems-client-s-house.jpg",
  "https://i.postimg.cc/mckrQY5c/plumbing-professional-doing-his-job.jpg"
];

const SLIDE_DURATION = 4200; // ms, time per slide

const HeroSection: React.FC<{ onGetQuoteClick: () => void }> = ({ onGetQuoteClick }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timeout);
  }, [current]);

  return (
    <section className="relative h-[90vh] md:h-screen flex items-center justify-center text-white text-center overflow-hidden">
      {/* Image backgrounds slider */}
      {heroImages.map((img, i) => (
        <div
          key={img}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{
            opacity: current === i ? 1 : 0,
            zIndex: current === i ? 1 : 0,
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s'
          }}
          aria-hidden={current !== i}
        >
          {/* Overlay gradient per slide */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
        </div>
      ))}
      {/* Hero content */}
      <div className="relative z-10 p-6 w-full">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Your Trusted Plumbing Experts in Dubai
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow">
          Fast, reliable, and affordable plumbing services for homes and businesses.
        </p>
        <button
          onClick={onGetQuoteClick}
          className="bg-[#004487] text-white font-bold px-8 md:px-10 py-3.5 md:py-4 rounded-full text-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          contact us
        </button>
      </div>
    </section>
  );
};
// --- About Section Component ---
const features = [
  {
    icon: "wrench",
    label: "Emergency Repairs",
    desc: "Immediate response to urgent plumbing situations, available 24/7."
  },
  {
    icon: "pipe",
    label: "Pipe Installation",
    desc: "Expert installation and replacement for all types of pipes and fixtures."
  },
  {
    icon: "search",
    label: "Leak Detection",
    desc: "Advanced diagnostic tools to pinpoint and resolve hidden water leaks."
  }
];

const AboutSection: React.FC = () => (
  <section id="about" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left column: About */}
        <div className="flex flex-col gap-6">
          <span className="inline-block text-xs bg-[#004586] text-white px-3 py-1 font-bold rounded-lg w-fit mb-2 shadow-sm tracking-wide animate-pulse">10+ Years Experience</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight" style={{ color: "#004586" }}>
            About Titan Plumber Dubai
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg md:text-xl mb-2">
            The trusted name for top-tier plumbing solutions in Dubai. We combine technical excellence, transparent pricing, and a passion for customer satisfaction to deliver results you can rely on.
          </p>
          <ul className="list-disc text-gray-600 ml-6 text-base space-y-2">
            <li>Residential & commercial services</li>
            <li>Licensed, insured & highly trained team</li>
            <li>No hidden fees. Always upfront & fair</li>
          </ul>
        </div>
        {/* Right column: Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.label}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
            >
              <div className="bg-blue-100 text-[#004586] rounded-full p-4 inline-block mb-3 animate-pulse group-hover:animate-none transition">
                <Icon name={f.icon} className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg text-[#004586] mb-1">{f.label}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style>{`
      @import url('https://fonts.googleapis.com/css?family=Oswald:400,700&display=swap');
    `}</style>
  </section>
);

// --- Gallery Section ---
const galleryImages = [
  "https://i.postimg.cc/QV8RPKVM/imgi-23-AF1Qip-NR1tu-LH1j-PGPRih-Ij-KZjb3Hkj-O5CB0EG-N5q-Nx-s635-k-no.jpg",
  "https://i.postimg.cc/rzfvLytr/imgi-27-AF1Qip-ORGzd-U1TLy9r7UFl-W4V-Qt-Tf-IHni-Md9IXUNw-Qy-s536-k-no-1.jpg",
  "https://i.postimg.cc/8sZqVkrC/imgi-30-AF1Qip-MMt-Yqolfc-T-pc-Diz3Lj0TVefe1Yj-Ql1l2wez-FE-s544-k-no.jpg",
  "https://i.postimg.cc/t7BLHRVX/imgi-32-AF1Qip-Pltw-E8Qpcz-B8SKjm-Qh-FBI98kin-KIy0KIF4w-V1-s599-k-no.jpg",
  "https://i.postimg.cc/230PfjBy/imgi-36-AF1Qip-OEA3E-Ze-Yh-Zm66x-Mn-Nj-HV8gc-Kg-Vlr-P0QIqg-S-s696-k-no.jpg",
  "https://i.postimg.cc/3WtPHrD8/imgi-40-AF1Qip-NMd4M6a-Ai-J66Lb-SD4WHCG75t5xgx-JECn-Nv-SVkp-s618-k-no.jpg",
];

const GallerySection: React.FC = () => (
  <section id="gallery" className="py-20 bg-white">
    <div className="mx-auto max-w-5xl w-[92vw]">
      <h2
        className="text-center font-oswald font-light text-4xl md:text-5xl tracking-wider mb-10"
        style={{ color: "#004586" }}
      >
        OUR WORK
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {galleryImages.map((src, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03] bg-gray-100">
            <img
              src={src}
              alt={`Gallery work ${i + 1}`}
              className="w-full h-[230px] md:h-[270px] object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
    <style>{`
      .font-oswald {
        font-family: Oswald, Arial, sans-serif;
      }
    `}</style>
  </section>
);

// --- Why Choose Us Section ---
const whyChooseFeatures = [
  {
    icon: 'clock',
    title: '24/7 Support',
    description: 'We’re always ready for emergencies—call us any time, day or night.',
    highlight: 'Anytime Help',
    color: 'bg-[#eaf2fb] text-[#004586]'
  },
  {
    icon: 'badge',
    title: 'Licensed Professionals',
    description: 'Skilled, certified, and insured plumbers for peace of mind.',
    highlight: 'Certified Team',
    color: 'bg-[#f6f6ee] text-[#92631f]'
  },
  {
    icon: 'lightning',
    title: 'Fast Response',
    description: 'We guarantee a quick arrival and rapid results for every job.',
    highlight: 'Quick Arrival',
    color: 'bg-[#eefbf2] text-[#16713d]'
  },
  {
    icon: 'dollar',
    title: 'Affordable Pricing',
    description: 'Clear, fair, and transparent pricing—no costly surprises.',
    highlight: 'No Hidden Fees',
    color: 'bg-[#f2faff] text-[#2377a3]'
  },
];

const WhyChooseUsSection: React.FC = () => (
  <section id="why-us" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-3 tracking-tight" style={{ color: "#004586" }}>
        Why Choose Us?
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-center text-lg font-light">
        The best blend of expertise, speed, and service—just for you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {whyChooseFeatures.map((feature, i) => (
          <div
            key={feature.title}
            className="relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 group hover:-translate-y-2 transform transition-all duration-300"
          >
            <span className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold shadow ${feature.color} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
              {feature.highlight}
            </span>
            <div className={`mx-auto flex items-center justify-center rounded-full h-16 w-16 shadow ${feature.color} bg-opacity-50 mb-5 group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={feature.icon} className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-lg text-[#004586] mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


// --- Testimonials Section ---
const testimonials = [
  {
    name: "Ahmed Al Maktoum",
    text: "Incredibly fast service! They fixed my burst pipe in the middle of the night. Highly recommend Titan Plumber Dubai.",
    stars: 5,
    img: "https://picsum.photos/100/100?random=20"
  },
  {
    name: "Sophie Chen",
    text: "Professional, courteous, and very transparent with their pricing. The new bathroom installation is perfect.",
    stars: 5,
    img: "https://picsum.photos/100/100?random=21"
  },
  {
    name: "John D.",
    text: "Finally found a reliable plumbing company in Dubai. They detected a hidden leak that others missed. Saved me a lot of money!",
    stars: 5,
    img: "https://picsum.photos/100/100?random=22"
  },
];

const TestimonialsSection: React.FC = () => (
  <section id="testimonials" className="py-20 bg-gradient-to-br from-[#004586] via-blue-800 to-blue-900 text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight" style={{ color: "#fff" }}>
        What Our Clients Say
      </h2>
      <div className="mx-auto w-24 h-1 bg-[#004586] rounded-full mb-10"></div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-700 hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full mx-auto shadow ring-4 ring-[#004586] ring-offset-2 ring-offset-blue-900 overflow-hidden -mt-16 mb-3 border-4 border-white">
              <img
                src={t.img}
                alt={t.name}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
            {/* Stars */}
            <div className="flex justify-center mb-2">
              {Array(t.stars).fill(0).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 drop-shadow-sm"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <polygon points="10,1.5 12.59,7.02 18.59,7.63 14,11.97 15.27,17.93 10,14.8 4.73,17.93 6,11.97 1.41,7.63 7.41,7.02" />
                </svg>
              ))}
            </div>
            {/* Quote */}
            <blockquote className="mb-4 text-base italic text-blue-50 font-medium leading-relaxed group-hover:text-white transition">
              “{t.text}”
            </blockquote>
            <h4 className="font-bold text-lg text-[#ffd700] drop-shadow-lg">{t.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Contact Section ---
const ContactSection: React.ForwardRefRenderFunction<HTMLDivElement> = (_, ref) => {
  const ownerWhatsApp = "971522163478";

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const text =
      `New Contact Request!%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Email: ${encodeURIComponent(email)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Message: ${encodeURIComponent(message)}`;

    window.open(`https://wa.me/${ownerWhatsApp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Get in Touch</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Have a question or need a quote? Fill out the form below or contact us directly.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <form className="space-y-6" onSubmit={handleContactSubmit}>
            <input name="name" aria-label="Your Name" type="text" placeholder="Your Name" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input name="email" aria-label="Your Email" type="email" placeholder="Your Email" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input name="phone" aria-label="Your Phone" type="tel" placeholder="Your Phone" className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <textarea name="message" aria-label="Your Message" placeholder="Your Message" rows={5} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold p-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition">
              Send Message
            </button>
          </form>
          <div>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Contact Details</h3>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> +971522163478</p>
              <p className="text-gray-700 mb-4"><strong>Email:</strong> contact@titanplumberdubai.com</p>
              <a
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold p-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition"
                href={`https://wa.me/${ownerWhatsApp}`}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="whatsapp" className="w-6 h-6" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
                title="Titan Plumber in Dubai location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462561.65764262725!2d54.6177793890625!3d25.076022400000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4e640851085e812f%3A0x4553533dc4f28140!2sTitan%20Plumber%20in%20Dubai!5e0!3m2!1sfr!2sma!4v1762695226908!5m2!1sfr!2sma"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const ContactSectionWithRef = React.forwardRef(ContactSection);

// --- Footer Component ---
const Footer: React.FC = () => (
  <footer className="bg-gradient-to-tr from-[#004586] via-gray-900 to-[#222] text-gray-300 py-10">
    <div className="container mx-auto px-6 text-center">
      <div className="flex justify-center space-x-8 mb-6">
        <a
          aria-label="Facebook"
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#004586] transition-colors duration-300"
        >
          <Icon name="facebook" className="w-7 h-7" />
        </a>
        <a
          aria-label="TikTok"
          href="https://tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#004586] transition-colors duration-300"
        >
          {/* TikTok SVG icon */}
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.584 7.13v7.21c0 1.418-1.005 2.277-2.08 2.277-1.006 0-2.079-.508-2.079-2.277 0-1.351.71-2.175 2.079-2.175.238 0 .426.016.609.054V9.68c-.2-.02-.407-.025-.627-.025-3.027 0-4.981 1.87-4.981 4.878 0 2.929 1.988 4.86 4.981 4.86 3.018 0 4.968-1.955 4.968-4.86V8.06c.524.138 1.021.225 1.671.225V6.057c-.864 0-1.441-.196-1.921-.522-.462-.315-.771-.78-.917-1.279H13.09v2.874c-.166-.043-.341-.095-.506-.162z"></path>
          </svg>
        </a>
        <a
          aria-label="Instagram"
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#004586] transition-colors duration-300"
        >
          <Icon name="instagram" className="w-8 h-8" />
        </a>
      </div>
      <p className="text-sm font-semibold tracking-wide">
        Titan Plumber Dubai © 2025 | All Rights Reserved
      </p>
    </div>
  </footer>
);


// --- Main App Component ---
const App: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const logo = "https://i.postimg.cc/Bbj3pw7G/Chat-GPT-Image-9-nov-2025-14-45-53-removebg-preview.png";

  const handleGetQuoteClick = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      <Preloader logoSrc={logo} />
      <Header onGetQuoteClick={handleGetQuoteClick} logoSrc={logo} />
      <main>
        <HeroSection onGetQuoteClick={handleGetQuoteClick} />
        <AboutSection />
        <GallerySection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSectionWithRef ref={contactRef} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
