import { useState } from 'react';
import { Award, Heart, Shield, Sparkles, Phone } from 'lucide-react';
import CountdownTimer from './components/CountdownTimer';
import DressCode from './components/DressCode';
import LocationDetails from './components/LocationDetails';
import RsvpForm from './components/RsvpForm';
import HostDashboard from './components/HostDashboard';
import AudioPlayer from './components/AudioPlayer';
import TimingTimeline from './components/TimingTimeline';
import PhotoGallery from './components/PhotoGallery';
import { ElegantBow } from './components/ElegantBow';

// Import our beautiful custom generated banner
// @ts-ignore
import graduationBanner from './assets/images/banner.jpg';

export default function App() {
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [showDashboard, setShowDashboard] = useState(false);

  const handleRsvpAdded = () => {
    setLastUpdated(Date.now());
  };

  return (
    <div className="min-h-screen bg-[#d88a9a] text-gray-800 flex flex-col md:flex-row items-stretch justify-start selection:bg-brand-100 selection:text-brand-700 relative overflow-x-hidden">
      
      {/* LEFT SIDEBAR BANNER: Mockup-style vertical sidebar for wide screens */}
      <aside className="hidden lg:flex w-[260px] bg-[#be7282] border-r border-[#af6374] flex-col justify-between items-center py-12 px-6 text-white select-none shrink-0 shrink-b relative">
        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
        
        {/* Top Logo Elements */}
        <div className="text-center relative z-10">
          <span className="font-serif text-3xl font-black italic tracking-wider block">ДЧ</span>
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-pink-100 block mt-1">
            Бүтүрүүшкүн 2026
          </span>
        </div>

        {/* Center Vertical Text - Just like in the designer mockup! */}
        <div className="rotate-270 whitespace-nowrap text-center my-auto py-1   text-pink-100/90 tracking-[0.2em] font-serif uppercase text-lg font-black relative z-10">
          ЧАЛАЛГА САЙТЫ • ДИПЛОМ БАЙЫРЛАЛЫ • ЧАЙЗАНА
        </div>

        {/* Bottom footer text */}
        <div className="text-center relative z-10">
          <ElegantBow />
          <p className="font-sans text-[10px] text-pink-200 mt-2 font-medium">
            Июнь, 2026
          </p>
        </div>
      </aside>

      {/* RIGHT CONTENT FRAME: Matches the elegant centered smartphone card invite perfectly */}
      <div className="flex-grow bg-[#d88a9a] md:py-8 md:px-4 flex items-start justify-center overflow-y-auto">
        
        {/* Center Envelope Capsule Container */}
        <div className="w-full max-w-[560px] bg-[#fffbf9] shadow-2xl md:rounded-[36px] overflow-hidden border border-white/40 flex flex-col justify-start relative">
          
          {/* Inner luxury decorative border frames (just like the lace visual border in the photo) */}
          <div className="absolute inset-3 sm:inset-5 border border-[#8a4b57]/15 rounded-[28px] pointer-events-none z-0" />
          <div className="absolute inset-4 sm:inset-6 border border-[#8a4b57]/10 rounded-[26px] pointer-events-none z-0" />

          {/* Internal watercolor aesthetics */}
          <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-[#ffe5ea] to-transparent pointer-events-none -z-0" />
          <div className="absolute top-[800px] -right-36 w-72 h-72 bg-brand-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-[300px] -left-36 w-72 h-72 bg-brand-50/65 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Floating Music Toggle */}
          <AudioPlayer />

          {/* Core Content Box wrapper */}
          <div className="relative z-10 w-full px-5 sm:px-8 py-8 sm:py-12 space-y-10 text-center">
            
            {/* HERO SECTION */}
            <header className="flex flex-col items-center pt-2 sm:pt-4">
              {/* Badge */}
              <div className="bg-white/95 border border-[#8a4b57]/15 px-4 py-1.5 rounded-full shadow-md text-[10px] font-sans text-brand-500 tracking-widest uppercase font-black flex items-center gap-1.5 mb-6">
                <Award className="w-3.5 h-3.5 text-brand-500 animate-[spin_4s_linear_infinite]" />
                Диплом байырлалы
              </div>

              {/* Names header matching Playfair Display & cursive font */}
              <div className="mb-4 relative text-center">
                <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#8a4b57] font-bold block mb-4">
                  Ч а л а л г а
                </p>
                <span className="font-cursive text-5xl sm:text-6xl text-brand-600 block mb-1 leading-none select-none animate-float">
                  Чайзананы
                  <span className="relative inline-block">
                    н
                    <svg
                      className="absolute -bottom-[0.18em] -right-[0.05em] w-[0.25em] h-[0.45em] text-brand-600 pointer-events-none"
                      viewBox="0 0 10 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M 2 2 C 2 7, 7 8, 4 13" />
                    </svg>
                  </span>
                </span>
                <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-[#8a4b57]/80 uppercase block font-semibold my-2.5 select-none">
                  Диплом
                </span>
                <h1 className="font-cursive text-5xl sm:text-6.5xl lg:text-7xl text-[#8a4b57] font-medium block leading-none my-3 select-none">
                  Байырлалы
                </h1>
              </div>

              {/* Custom SVG gloss bow divider */}
              <ElegantBow />

              {/* Generated Illustration Card framed like a premium polaroid */}
              <div className="w-full max-w-[280px] mt-6 rounded-[28px] overflow-hidden shadow-lg shadow-brand-200/50 border-4 border-white relative group">
                <img
                  src={graduationBanner}
                  alt="Чайзананың Диплом Байырлалы"
                  className="w-full object-cover aspect-[4/5] transition-transform duration-700 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Quick info badges styled matching the beautiful photograph */}
              <div className="my-8 text-center select-none w-full max-w-[400px]">
                <div className="font-serif text-3xl sm:text-4.5xl text-[#8a4b57] tracking-[0.12em] font-medium leading-none">
                  05 <span className="text-[#8a4b57]/20 font-light mx-1">|</span> 06 <span className="text-[#8a4b57]/20 font-light mx-1">|</span> 2026
                </div>
                <div className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#8a4b57]/70 font-bold mt-3.5">
                  Пятница &bull; Эгези 16:00 шакта.
                </div>
                <div className="font-serif text-sm sm:text-base italic font-bold text-[#8a4b57] mt-3">
                  «Очур» банкет залы
                </div>
              </div>
            </header>

            {/* BOW SEGMENT OVERLAYS */}
            <div className="flex justify-center py-2">
              <div className="w-16 h-px bg-[#ffccd5]" />
            </div>

            {/* COUNTDOWN */}
            <section className="bg-white/40 backdrop-blur-sm rounded-3xl py-6 px-3 border border-brand-50/50">
              <CountdownTimer />
            </section>

            {/* BOW SEGMENT OVERLAYS */}
            <div className="flex justify-center py-2">
              <ElegantBow />
            </div>

            {/* PERSONAL WELCOME NOTE */}
            <section className="text-center max-w-xl mx-auto">
              <div className="bg-white/95 rounded-[32px] p-6 sm:p-10 border border-brand-100 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-full blur-xl pointer-events-none" />
                
                <h2 className="font-serif text-xl sm:text-2xl text-brand-800 font-semibold mb-6 italic leading-snug">
                  «Эргим улузум, төрелдерим база чоок кижилерим!»
                </h2>

                <div className="font-sans text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed font-semibold text-center whitespace-pre-line">
                  <p>
                    Эрткен орук, берге чылдар артывыста<br />
                    Эртине дег дипломумну алганым бо
                  </p>
                  <p>
                    Ынак торел, башкыларым, чоок улузум ачызында<br />
                    Амыдыралдын чаа чадазы ажыттынды
                  </p>
                  <p className="pt-2">
                    Улуг оорушкуну мен-биле улежип, бистин байырлалывыстын<br /> 
                    хундулуг аалчызы болурунарны улуг хундуткел-биле чаладым.
                  </p>
                </div>
              </div>
            </section>

            {/* PHOTO GALLERY BAR */}
            <section className="py-2">
              <PhotoGallery />
            </section>

            {/* BOW SEGMENT OVERLAYS */}
            <div className="flex justify-center py-2">
              <ElegantBow />
            </div>

            {/* TIMELINE */}
            <section>
              <TimingTimeline />
            </section>

            {/* BOW SEGMENT OVERLAYS */}
            <div className="flex justify-center py-2">
              <div className="w-16 h-px bg-[#ffccd5]" />
            </div>

            {/* LOCATION DETAILS */}
            <section>
              <LocationDetails />
            </section>

            {/* BOW SEGMENT OVERLAYS */}
            <div className="flex justify-center py-2">
              <ElegantBow />
            </div>

            {/* DRESS CODE */}
            <section>
              <DressCode />
            </section>

            {/* BOW SEGMENT OVERLAYS */}
            <div className="flex justify-center py-2">
              <div className="w-16 h-px bg-[#ffccd5]" />
            </div>

            {/* RSVP FORM */}
            <section>
              <RsvpForm onRsvpAdded={handleRsvpAdded} />
            </section>

            {/* BOW SEGMENT OVERLAYS */}
            <div className="flex justify-center py-2">
              <ElegantBow />
            </div>

            {/* CONTACT PHONE SECTION */}
            <section className="w-full max-w-xl mx-auto px-4 mt-2">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-brand-100 shadow-sm text-center">
                <div className="inline-flex items-center justify-center p-3 bg-brand-50 rounded-full text-brand-500 mb-3 border border-brand-100">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <h4 className="font-serif text-lg font-bold text-gray-800">
                  Харылзажыр телефон дугаары
                </h4>
              
                
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <a
                    href="tel:89338881717"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2.5 px-5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-sans text-xs font-bold rounded-xl border border-brand-150 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    89338881717 
                  </a>
                  
                </div>
              </div>
            </section>

            {/* BOW SEGMENT OVERLAYS */}
            <div className="flex justify-center py-2">
              <div className="w-16 h-px bg-[#ffccd5]" />
            </div>

            {/* HOST CONTROLLERS VIEW */}
            <section className="flex flex-col items-center pt-4">
              <button
                id="toggle-host-dashboard-capsule"
                onClick={() => setShowDashboard(!showDashboard)}
                className="inline-flex items-center gap-2 py-2 px-5 bg-white/90 hover:bg-brand-50 border border-brand-100 hover:border-brand-200 rounded-full font-sans text-xs font-semibold text-gray-500 hover:text-brand-600 shadow-md transition-all duration-300 hover:scale-102 cursor-pointer"
              >
                <Shield className="w-4 h-4 text-brand-400" />
                {showDashboard ? 'Панельди дуглаар' : 'Чайзананың панели (хост)'}
              </button>

              {showDashboard && (
                <div className="w-full mt-6 animate-fade-in">
                  <HostDashboard lastUpdated={lastUpdated} />
                </div>
              )}
            </section>

          </div>

          {/* CAPSULE LUX FOOTER */}
          <footer className="w-full text-center py-10 bg-[#fff5f6] border-t border-[#8a4b57]/10 mt-12 relative z-10">
            <div className="max-w-md mx-auto px-4 text-center">
              <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8a4b57]/70 font-semibold">
                Дүрген ужурашкыже!
              </p>
              <p className="font-cursive text-brand-600 text-[40px] mt-3 animate-float select-none">
                Силерни манап турар мен!
              </p>
              <p className="font-cursive text-[#8a4b57] text-2xl mt-1.5 font-medium opacity-90 select-none">
                Чайзана
              </p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
