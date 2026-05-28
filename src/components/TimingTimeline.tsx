import { Clock, Gift, Music, Sparkles } from 'lucide-react';
import { ElegantBow } from './ElegantBow';

export default function TimingTimeline() {
  const steps = [
    {
      time: '16:00',
      title: 'Аалчылар чыйылы',
      desc: '«Очур» банкет залынче моорлап келириңерни улуг өөрүшкү-биле манап турар бис! Ужуражып, кады байырлап, чараш фотозонага кады тырттырар уевис бо.',
      icon: <Clock className="w-5 h-5 text-brand-500" />,
    },
    {
      time: '17:00',
      title: 'Байырлалдың кезээ',
      desc: 'Кады манаанывыс улуг чедиишкинни байырлаар уевис келди! Чайзанага чылыг сөстерни, байыр чедириглерни база улуг йөрээлдерни үлежир бис.',
      icon: <Gift className="w-5 h-5 text-brand-500" />,
    },
    {
      time: '18:30',
      title: 'Байырлалдың шайы',
      desc: 'Чаагай национал чемнер, байлаг стол, хөгжүглүг чараш ырылар, оюн-тоглаа база шимченгир чараш самнар-биле кады дыштаныр бис!',
      icon: <Music className="w-5 h-5 text-brand-500" />,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 select-none">
      <div className="text-center mb-8">
        <ElegantBow />
        <h3 className="font-serif text-2xl sm:text-3xl text-[#8a4b57] font-semibold tracking-tight mt-3">
          Байырлалдың планы (Уези)
        </h3>
        <p className="font-sans text-xs text-gray-500 max-w-md mx-auto mt-2 font-medium">
          Бистиң байырлалывыстың кежээзи эң чылыг сактыышкыннарны арттырзын дээш детально сагынып алдывыс.
        </p>
      </div>

      {/* Vertical Interactive Timeline Stack */}
      <div className="space-y-6 relative before:absolute before:inset-y-3 before:left-6 before:w-[2px] before:bg-brand-100 text-left">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex gap-4 items-start relative group transition-all duration-300 hover:translate-x-1"
          >
            {/* Timeline Circle with custom icons */}
            <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-200 flex items-center justify-center shrink-0 shadow-sm relative z-10 transition-colors group-hover:border-brand-400 group-hover:bg-brand-50">
              {step.icon}
            </div>

            {/* Timings Details Card */}
            <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4.5 sm:p-5 border border-brand-100 shadow-sm flex-grow transition-all duration-300 group-hover:shadow-md group-hover:border-brand-200">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <span className="font-serif text-sm font-bold text-brand-600 bg-brand-50/80 px-2.5 py-0.5 rounded-full select-none">
                  {step.time}
                </span>
                <span className="font-sans text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-305" />
                  Кезээ 0{idx + 1}
                </span>
              </div>
              
              <h4 className="font-serif text-base font-bold text-gray-800 mt-2">
                {step.title}
              </h4>
              <p className="font-sans text-xs text-gray-600 leading-relaxed mt-1 font-medium">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

