import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { RSVPReply } from '../types';

interface RsvpFormProps {
  onRsvpAdded?: () => void;
}

export default function RsvpForm({ onRsvpAdded }: RsvpFormProps) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [guestsCount, setGuestsCount] = useState(1);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Адыңар база фамилияңарны киириптериңерни диледим.');
      return;
    }

    setIsSubmitting(true);

    const newReply: RSVPReply = {
      id: Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      isAttending: attendance,
      guestsCount: attendance === 'yes' ? guestsCount : 0,
      beverages: [],
      comment: comment.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    // 1. Send Email Notification using FormSubmit (Free secure form email sender)
    // This allows email delivery to work perfectly on static hosts like GitHub Pages!
    const TARGET_EMAIL = 'chmen00@mail.ru'; 
    const emailPayload = {
      _subject: `🎓 Ответ на приглашение: ${newReply.name}`,
      _captcha: 'false',
      _template: 'table',
      'Имя и Фамилия': newReply.name,
      'Придет ли на праздник': newReply.isAttending === 'yes' ? 'Да, придет ✓' : newReply.isAttending === 'no' ? 'Нет, не придет ✕' : 'Думает ⌛',
      'Количество гостей': newReply.isAttending === 'yes' ? newReply.guestsCount : '0',
      'Пожелание или комментарий': newReply.comment || 'Без комментария',
      'Дата отправки': new Date(newReply.submittedAt).toLocaleString('ru-RU')
    };

    try {
      fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      }).catch(err => {
        console.error('Error sending email notification:', err);
      });
    } catch (e) {
      console.error(e);
    }

    // 2. Try sending to the backend server API for persistent dashboard sync (if server is active)
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReply),
      });

      if (response.ok) {
        // Success backend save
        setIsSubmitted(true);
        if (onRsvpAdded) {
          onRsvpAdded();
        }
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.warn('Backend server not available, falling back to local storage:', err);
    }

    // 3. Fallback to localStorage (ensures the client remains updated even offline or on static host)
    try {
      const saved = localStorage.getItem('chaizana_rsvp_replies');
      const replies: RSVPReply[] = saved ? JSON.parse(saved) : [];

      const filtered = replies.filter((r) => r.name.toLowerCase() !== newReply.name.toLowerCase());
      const updated = [...filtered, newReply];

      localStorage.setItem('chaizana_rsvp_replies', JSON.stringify(updated));
      setIsSubmitted(true);

      if (onRsvpAdded) {
        onRsvpAdded();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Харыы чорударынга чазыг болду. Дараа катап шинеп көүңер.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setAttendance('yes');
    setGuestsCount(1);
    setComment('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-brand-200 shadow-md text-center">
          <div className="inline-flex items-center justify-center p-3.5 bg-brand-50 rounded-full text-brand-500 mb-4 animate-bounce">
            <CheckCircle2 className="w-8 h-8 text-brand-500" />
          </div>
          <h4 className="font-serif text-2xl text-brand-700 font-semibold mb-2 font-bold">
            Харыы чаагай чоруттунду!
          </h4>
          <p className="font-sans text-xs text-gray-600 mt-2 leading-relaxed max-w-sm mx-auto">
            Хүндүлүг {name}, силерниң харыыңар камгалаттынган база Чайзанаже дамчыттынган. Улуг четтирдивис! Силерни байырлалывыста чылыг манап турар бис! 
          </p>

          <button
            id="rsvp-button-reset"
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-xl font-sans text-xs font-semibold border border-brand-100 transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className="w-4.5 h-4.5" />
            Харыыны өскертир
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center p-3.5 bg-brand-50 rounded-full text-brand-500 mb-3 border border-brand-100">
          <Sparkles className="w-6 h-6 animate-[pulse_2s_infinite]" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#8a4b57] font-semibold tracking-tight font-bold">
          Келириңерни бадыткаары
        </h3>
        <p className="font-sans text-xs text-gray-500 max-w-md mx-auto mt-2">
          Эрттирикчилер столдар база праздничное менюну баш ула бээр кылдыр, адаанда каш айтырыгга харыылап каарыңарны диледим.
        </p>
      </div>

      {/* Styled Elegant Gift Notice block directly before the form */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4.5 mb-6 text-left max-w-xl mx-auto flex gap-3 shadow-inner select-none">
        <span className="text-xl shrink-0 mt-0.5">🎁</span>
        <div>
          <h4 className="font-serif text-sm font-bold text-amber-800 font-bold">
            Кичээнгей, оюн!
          </h4>
          <p className="font-sans text-xs text-amber-700 leading-relaxed mt-1 font-semibold">
            Эң баштай долу чыглы берген ийи столга выпускницадан тускай беллектер белен боор! Шагында келириңерни улуг өөрүшкү-биле манап турар бис! 
          </p>
        </div>
      </div>

      <form
        id="rsvp-invitation-form"
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-brand-100 shadow-sm transition-all duration-300 space-y-5"
      >
        {/* Name input */}
        <div className="space-y-1.5 text-left">
          <label className="font-sans text-xs font-bold text-gray-600 uppercase tracking-widest block font-bold">
            Силерниң Адыңар база Фамилияңар <span className="text-brand-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Чижээ, Менди Чулдум"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-brand-100 bg-white/50 focus:bg-white text-gray-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all font-semibold"
          />
        </div>

        {/* Attendance Select */}
        <div className="space-y-1.5 text-left">
          <label className="font-sans text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">
            Байырлалга келип шыдаар силер бе?
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'yes', label: 'Келир мен ✓', bg: 'bg-brand-50 border-brand-300 text-brand-700 font-semibold' },
              { id: 'no', label: 'Шыдавас мен ✕', bg: 'bg-rose-50 border-rose-200 text-rose-700 font-semibold' },
              { id: 'maybe', label: 'Боданыр мен ⌛', bg: 'bg-amber-50 border-amber-200 text-amber-700 font-semibold' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAttendance(option.id as 'yes' | 'no' | 'maybe')}
                className={`py-3 px-1 rounded-xl font-sans text-xs text-center border transition-all duration-300 cursor-pointer ${
                  attendance === option.id
                    ? option.bg
                    : 'bg-white/40 border-gray-150 hover:bg-gray-50/70 text-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {attendance === 'yes' && (
          <div className="space-y-5 block">
            {/* Guest Count */}
            <div className="space-y-1.5 text-left">
              <label className="font-sans text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">
                Аалчылар саны (силерни база кады санааш)
              </label>
              <div className="flex items-center gap-3 bg-white/40 border border-brand-100 rounded-xl p-1.5 max-w-[150px]">
                <button
                  type="button"
                  onClick={() => setGuestsCount((c) => Math.max(1, c - 1))}
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-brand-50 border border-brand-100 rounded-lg text-brand-600 font-bold text-lg select-none cursor-pointer"
                >
                  -
                </button>
                <span className="font-sans text-base font-bold text-gray-800 w-8 text-center select-none">
                  {guestsCount}
                </span>
                <button
                  type="button"
                  onClick={() => setGuestsCount((c) => Math.min(5, c + 1))}
                  className="w-9 h-9 flex items-center justify-center bg-white hover:bg-brand-50 border border-brand-100 rounded-lg text-brand-600 font-bold text-lg select-none cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comments Box */}
        <div className="space-y-1.5 text-left">
          <label className="font-sans text-xs font-bold text-gray-600 uppercase tracking-widest block">
            Силерниң күзелдериңер база тайылбырыңар (албан эвес)
          </label>
          <textarea
            rows={3}
            placeholder="Чижээ, эш-өөрүм-биле келир мен / Чайзанага йөрээл сөстер..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-brand-100 bg-white/50 focus:bg-white text-gray-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all resize-none font-semibold"
          />
        </div>

        {errorMsg && (
          <p className="font-sans text-xs text-rose-600 font-medium text-center">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-brand-500 hover:bg-brand-600 text-white font-sans text-sm font-semibold rounded-xl shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 hover:shadow-brand-140/30 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Чорудуп турар...' : 'Харыыны чорудар'}
        </button>
      </form>
    </div>
  );
}
