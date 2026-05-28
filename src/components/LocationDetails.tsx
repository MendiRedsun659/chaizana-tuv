import { Calendar, MapPin, Clock } from 'lucide-react';

// Import our beautiful custom generated banquet photo
// @ts-ignore
import banquetPhoto from '../assets/images/banket.jpg';

export default function LocationDetails() {
  const VENUE_NAME = '«Очур» банкет залы';
  const ADDRESS = 'Кызыл х., Оюна-Курседи куд., 143 у.';
  const DATE_STR = 'Пятница, 5 июнь 2026 ч.';
  const TIME_STR = 'Эгези 16:00 шакта.';

  // Map Links
  const YANDEX_MAPS_URL = 'https://yandex.ru/maps/?text=Кызыл%20улица%20Оюна-Курседи%20143%20Очур';
  const GOOGLE_MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Очур+улица+Оюна-Курседи+143+Кызыл';

  // Elegant Interactive ICS Download
  const handleAddToCalendar = () => {
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Chaizana Graduation Invitation//EN',
      'BEGIN:VEVENT',
      'UID:graduation-chaizana-2026-06-05',
      'DTSTAMP:20260527T120000Z',
      'DTSTART:20260605T090000Z', // June 5, 2026, 16:00 Kyzyl Time (UTC +7)
      'DTEND:20260605T160000Z',   // June 5, 2026, 23:00 Kyzyl Time
      'SUMMARY:Чайзананың диплом байырлалы 🎉',
      'DESCRIPTION:Чайзана Донгактың өөредилгезин чаагай доосканы база диплом алганы-биле байырлаар кежээзин кады үлежиринче чаладывыс!',
      'LOCATION:«Очур» банкет залы, Оюна-Курседи куд.\\, 143 у.\\, Кызыл х.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Graduation_Chaizana_Invite.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3.5 bg-brand-50 rounded-full text-brand-500 mb-3 border border-brand-100">
          <MapPin className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#8a4b57] font-semibold tracking-tight">
          Байырлал болур чери база үези
        </h3>
        <p className="font-sans text-xs text-gray-500 max-w-md mx-auto mt-2">
          Силерниң амыр-тайбыш база оорук сериин олурарыңар дээш байырлал болур черин база үезин шилип алдывыс.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date and Time Details */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-brand-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-gray-800">Кажан болуру?</h4>
            </div>

            <div className="space-y-2 mt-2 font-sans text-sm text-gray-600">
              <p className="font-semibold text-brand-700 text-base">{DATE_STR}</p>
              <p className="font-medium text-gray-700">{TIME_STR}</p>
              <p className="text-xs text-gray-400 italic">Олуттарны ээлеп, выпускница-биле ужуражыр дээш байырлал эгелевейн турунда 15-20 минут бурунгаар келириңерни сүмелеп турар бис.</p>
            </div>

            {/* June 2026 Calendar Month Circle Marker */}
            <div className="mt-5 p-4 bg-white/95 rounded-2xl border border-brand-100 shadow-sm relative overflow-hidden select-none">
              <div className="text-center font-serif text-xs font-bold text-brand-700 tracking-wider mb-3 uppercase">
                Июнь 2026
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-sans font-black text-gray-400 border-b border-brand-50 pb-2 mb-2">
                <span>Пн</span>
                <span>Вт</span>
                <span>Ср</span>
                <span>Чт</span>
                <span>Пт</span>
                <span>Сб</span>
                <span className="text-[#db2754]/80">Вс</span>
              </div>
              <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center text-xs font-sans font-bold text-gray-700">
                {/* June 1 2026 is Monday, June ends with 30 days */}
                {Array.from({ length: 30 }, (_, index) => {
                  const day = index + 1;
                  const isCelebrationDate = day === 5;
                  return (
                    <div key={day} className="relative flex items-center justify-center p-0.5 min-h-[26px]">
                      {isCelebrationDate ? (
                        <div className="relative z-10 w-7 h-7 flex items-center justify-center">
                          {/* Circle marker hand-crafted design */}
                          <span className="absolute inset-0 rounded-full border-2 border-dashed border-[#db2754] bg-[#db2754]/15 animate-[spin_12s_linear_infinite]" />
                          <span className="absolute -inset-1 rounded-full border border-[#db2754]/30" />
                          <span className="relative font-black text-[#db2754] text-xs">
                            {day}
                          </span>
                          {/* Animated pointer tag */}
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#db2754] text-white font-sans text-[7px] font-black px-1.5 py-0.5 rounded-md shadow-md uppercase tracking-tight whitespace-nowrap animate-bounce z-20">
                            Байырлал хүнү! 🎉
                          </div>
                        </div>
                      ) : (
                        <span className={`${day % 7 === 0 || day % 7 === 6 ? 'text-[#db2754]/70' : 'text-gray-500'}`}>
                          {day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            id="add-to-calendar"
            onClick={handleAddToCalendar}
            className="mt-6 w-full py-2.5 px-4 bg-white hover:bg-brand-50 text-brand-600 border border-brand-200 hover:border-brand-300 rounded-xl font-sans text-xs font-semibold shadow-sm transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Календарьже немеп алыр (.ics)
          </button>
        </div>

        {/* Address & Venue Details */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-brand-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg font-semibold text-gray-800">Каяа демдеглээр бис?</h4>
            </div>

            <div className="space-y-2 mt-2 font-sans text-sm text-gray-600">
              <p className="font-semibold text-brand-700 text-base">{VENUE_NAME}</p>
              <p className="font-medium text-gray-700 leading-relaxed">{ADDRESS}</p>
           
            </div>

            {/* Luxury Banquet Photo Card block */}
            <div className="mt-5 rounded-2xl overflow-hidden border-2 border-white shadow-md relative aspect-[14/9] group bg-brand-100">
              <img
                src={banquetPhoto}
                alt="Праздничный Банкет"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[9px] font-sans font-black tracking-widest text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase">
                  ⭐ «Очур» банкет залы
                </span>
              </div>
            </div>
          </div>

          {/* Map links */}
          <div className="grid grid-cols-2 gap-2 mt-6">
            <a
              id="yandex-maps-link"
              href={YANDEX_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-sans text-[11px] font-semibold text-center transition-all duration-300 hover:shadow-md flex items-center justify-center gap-1.5"
            >
              Яндекс Карты
            </a>

            <a
              id="google-maps-link"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-sans text-[11px] font-semibold text-center transition-all duration-300 hover:shadow-md flex items-center justify-center gap-1.5"
            >
              Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
