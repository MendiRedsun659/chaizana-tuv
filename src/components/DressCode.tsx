import { useState } from 'react';
import { Shirt, HelpCircle, Check, Info } from 'lucide-react';

interface PaletteColor {
  name: string;
  sub: string;
  hex: string;
  textColor: string;
  borderColor: string;
  description: string;
}

export default function DressCode() {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  const colors: PaletteColor[] = [
    {
      name: 'Кол чымчак-розовый оң',
      sub: 'Tender Pink',
      hex: 'bg-[#ffccd5]',
      textColor: 'text-[#db2754]',
      borderColor: 'border-[#ff99ac]',
      description: 'Байырлалывыстың кол чараш оңу. Бистиң оөрүшкувусту илереткен чымчак оттенок.',
    },
    {
      name: 'Чараш ак оң',
      sub: 'Soft White',
      hex: 'bg-[#fafafa]',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-200 border',
      description: 'Розовый оң-биле чараш демнешкен ак рубашкалар, костюмнар, платьялар байырлалдың утказын улам тодарадыр.',
    },
    {
      name: 'Кремовый база Сарыг-куу оңнар',
      sub: 'Cream & Beige',
      hex: 'bg-[#f5ebe0]',
      textColor: 'text-[#a3704c]',
      borderColor: 'border-[#e6ccb2]',
      description: 'Чылыг, пастель оңнары розовый оң-биле чараш демнижип, уюттуг стильди чогудар.',
    },
    {
      name: 'Розовое золото / Шампань',
      sub: 'Rose Gold & Wine',
      hex: 'bg-[#e0a96d]',
      textColor: 'text-[#87551c]',
      borderColor: 'border-[#dfbd97]',
      description: 'Көгүдүг алдын база чырык оңнар силерниң кежээки образыңарны улам чараш кылыр.',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3.5 bg-brand-50 rounded-full text-brand-500 mb-3 border border-brand-100">
          <Shirt className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#8a4b57] font-semibold tracking-tight">
          Байырлалдың Дресс-коду
        </h3>
        <p className="font-sans text-xs text-gray-500 max-w-md mx-auto mt-2 leading-relaxed">
          Кады тырттырган чуруктарывыс чараш, чаңгыс аай болзун дээш, Чизе пастель оңнарын шилип алырыңарны диледим.
        </p>
      </div>

      {/* Styled Color Circles Container */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-brand-100 shadow-sm transition-all duration-300">
        <p className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-6">
          Даржалыг оңнар
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center mb-6">
          {colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(selectedColor === idx ? null : idx)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 group relative ${
                selectedColor === idx
                  ? 'bg-brand-50 border-brand-300 scale-102 shadow-sm'
                  : 'bg-white/40 border-transparent hover:bg-brand-50/40 hover:scale-101 border hover:border-brand-100'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full ${color.hex} ${color.borderColor} border-2 shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
              >
                {selectedColor === idx && (
                  <Check className={`w-5 h-5 ${color.textColor} stroke-[3] animate-[scaleIn_0.2s_ease-out_forwards]`} />
                )}
              </div>
              <span className="font-sans text-xs font-semibold text-gray-800 text-center mt-3 leading-tight block">
                {color.name.split(' ')[1] ? color.name.split(' ').slice(1).join(' ') : color.name}
              </span>
              <span className="font-sans text-[10px] text-gray-400 uppercase tracking-wide block mt-0.5">
                {color.sub}
              </span>

              {/* Miniature label for main color */}
              {idx === 0 && (
                <span className="absolute top-1 right-2 font-serif text-[8px] bg-brand-500 text-white rounded-full px-1.5 py-0.5 scale-90">
                  кол
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Selected Color Description Box */}
        <div className="min-h-[72px] transition-all duration-300">
          {selectedColor !== null ? (
            <div className="bg-brand-50/60 rounded-xl p-4 border border-brand-100 text-left flex items-start gap-3 animate-fade-in">
              <Info className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-brand-700">
                  {colors[selectedColor].name} ({colors[selectedColor].sub})
                </h4>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  {colors[selectedColor].description}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <span className="font-sans text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-gray-300" />
                Оңнар дугайында билип алыр дээш кайы-бир кружокче базыптыңаар
              </span>
            </div>
          )}
        </div>

        {/* Dress code style gentle suggestions */}
        <div className="mt-6 pt-5 border-t border-brand-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-3 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600 font-bold text-xs">
              ✓
            </div>
            <div>
              <span className="font-sans text-xs font-semibold text-emerald-800 block">Быжыг сүме:</span>
              <span className="font-sans text-[11px] text-gray-600 block mt-0.5 leading-relaxed">
                Чараш кежээки платьялар, чырык костюмнар, ак рубашкалар, таарымчалыг чараш хептер.
              </span>
            </div>
          </div>

          <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-3 flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5 text-rose-600 font-bold text-xs">
              ✕
            </div>
            <div>
              <span className="font-sans text-xs font-semibold text-rose-800 block">Херекчок:</span>
              <span className="font-sans text-[11px] text-gray-600 block mt-0.5 leading-relaxed">
                Спортчу хептер, джинсылар, кара өңнүг азы хып дээн неоновый өңнүг хептер.
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
