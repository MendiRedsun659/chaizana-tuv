import { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';
import { KeyRound, Users, MessageSquare, Copy, Check, Trash2, Plus, Download, Upload, Info } from 'lucide-react';
import { RSVPReply } from '../types';

interface HostDashboardProps {
  lastUpdated: number;
}

export default function HostDashboard({ lastUpdated }: HostDashboardProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [replies, setReplies] = useState<RSVPReply[]>([]);
  const [unlockedError, setUnlockedError] = useState('');
  const [copied, setCopied] = useState(false);

  // Manual guest addition states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAttendance, setNewAttendance] = useState<'yes' | 'no' | 'maybe'>('yes');
  const [newGuestsCount, setNewGuestsCount] = useState(1);
  const [newComment, setNewComment] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const HOST_PASSWORD = 'chaizana2026';

  const loadReplies = async () => {
    try {
      // 1. Try reading from the server API first
      const response = await fetch('/api/rsvps');
      if (response.ok) {
        const data = await response.json();
        setReplies(data);
        return;
      }
    } catch (err) {
      console.warn('Backend server not available for load replies, falling back to local storage:', err);
    }

    // 2. Fallback to localStorage
    try {
      const saved = localStorage.getItem('chaizana_rsvp_replies');
      if (saved) {
        setReplies(JSON.parse(saved));
      } else {
        setReplies([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadReplies();
  }, [lastUpdated]);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    if (password.trim() === HOST_PASSWORD) {
      setIsUnlocked(true);
      setUnlockedError('');
      loadReplies();
    } else {
      setUnlockedError('Чазыг пароль. Дараа катап шинеп көүңер.');
    }
  };

  const handleManualAddSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newReply: RSVPReply = {
      id: Math.random().toString(36).substring(2, 9),
      name: newName.trim(),
      isAttending: newAttendance,
      guestsCount: newAttendance === 'yes' ? newGuestsCount : 0,
      beverages: [],
      comment: newComment.trim() || undefined,
      submittedAt: new Date().toISOString()
    };

    try {
      // Try backend first
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReply),
      });
      if (response.ok) {
        setNewName('');
        setNewComment('');
        setNewGuestsCount(1);
        setShowAddForm(false);
        loadReplies();
        return;
      }
    } catch (err) {
      console.warn('Backend server not available, saving to localStorage:', err);
    }

    // Save to localStorage fallback
    const updated = [...replies.filter(r => r.name.toLowerCase() !== newReply.name.toLowerCase()), newReply];
    localStorage.setItem('chaizana_rsvp_replies', JSON.stringify(updated));
    setReplies(updated);
    setNewName('');
    setNewComment('');
    setNewGuestsCount(1);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Бо харыыны листен шынап-ла узуткаар силер бе?')) {
      try {
        // Try deleting from backend first
        const response = await fetch(`/api/rsvp/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          loadReplies();
          return;
        }
      } catch (err) {
        console.warn('Backend server not available for deleting, falling back to local storage:', err);
      }

      // Fallback
      const updated = replies.filter((r) => r.id !== id);
      localStorage.setItem('chaizana_rsvp_replies', JSON.stringify(updated));
      setReplies(updated);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('КИЧЭЭНГЕЙ: бо бүгү аалчылар харыыларын узуткаар. Узуткаар ма?')) {
      try {
        // Try clearing backend first
        const response = await fetch('/api/rsvps/clear', {
          method: 'POST',
        });
        if (response.ok) {
          loadReplies();
          return;
        }
      } catch (err) {
        console.warn('Backend server not available for clearing, falling back to local storage:', err);
      }

      // Fallback
      localStorage.removeItem('chaizana_rsvp_replies');
      setReplies([]);
    }
  };

  // Export JSON backup for GitHub Pages users
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(replies, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `rsvps_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            const merged = [...replies];
            parsed.forEach((item: RSVPReply) => {
              if (item.name && item.isAttending) {
                const idx = merged.findIndex((r) => r.id === item.id || r.name.toLowerCase() === item.name.toLowerCase());
                if (idx !== -1) {
                  merged[idx] = item;
                } else {
                  merged.push(item);
                }
              }
            });
            localStorage.setItem('chaizana_rsvp_replies', JSON.stringify(merged));
            setReplies(merged);
            alert('Аалчылар лизи файлыдан амгы деңнелче киирирттинди! Четирген.');
          } else {
            alert('Ылаптыг backup файлы боор ужурлуг JSON хевирлиг.');
          }
        } catch (err) {
          alert('Файлды ажыдып шыдавадывыс, чазыглыг файл.');
        }
      };
    }
  };

  // Calculations
  const yesReplies = replies.filter((r) => r.isAttending === 'yes');
  const maybeReplies = replies.filter((r) => r.isAttending === 'maybe');
  const noReplies = replies.filter((r) => r.isAttending === 'no');

  const totalAttendingGuests = yesReplies.reduce((sum, r) => sum + r.guestsCount, 0);

  // Export Copy
  const handleCopySummary = () => {
    if (replies.length === 0) return;

    let text = `🎓 ЧАЙЗАНАНЫҢ ДИПЛОМ БАЫЙРЛАЛЫНГА ААЛЧЫЛАР ЛИЗИ (05.06.2026):\n\n`;
    text += `✅ ТОЧНО КЕЛИРЛЕР (${totalAttendingGuests} кижи):\n`;

    let counter = 1;
    yesReplies.forEach((r) => {
      text += `${counter}. ${r.name} - ${r.guestsCount} кижи.${r.comment ? ` [Йөрээл: ${r.comment}]` : ''}\n`;
      counter++;
    });

    if (maybeReplies.length > 0) {
      text += `\n⏳ БОДАНЫП ТУРАРЛАР (${maybeReplies.length} кижи):\n`;
      maybeReplies.forEach((r, idx) => {
        text += `${idx + 1}. ${r.name}${r.comment ? ` [Йөрээл: ${r.comment}]` : ''}\n`;
      });
    }

    if (noReplies.length > 0) {
      text += `\n❌ КЕЛИП ШЫДАВАС (${noReplies.length} кижи):\n`;
      noReplies.forEach((r, idx) => {
        text += `${idx + 1}. ${r.name}\n`;
      });
    }

    text += `\nЧалалга сайтызындан кылган!`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isUnlocked) {
    return (
      <div className="w-full max-w-sm mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-brand-200 shadow-md text-center">
          <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4 border border-brand-100">
            <KeyRound className="w-5 h-5 text-brand-500" />
          </div>
          <h4 className="font-serif text-lg font-semibold text-gray-800 font-bold">Эрттирикчиниң панели</h4>
          <p className="font-sans text-[11px] text-gray-400 mt-1 mb-4">
            Дорт Чайзанага кирер чер. Силер келир аалчыларның лизин көөр дээш пароль киириңер.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              placeholder="Эрттирикчиниң паролу"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-105 focus:outline-none focus:ring-2 focus:ring-brand-300 font-sans text-sm text-center text-gray-800 font-semibold"
            />
            {unlockedError && <p className="font-sans text-xs text-rose-600 font-medium font-bold">{unlockedError}</p>}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-sans text-xs font-semibold shadow-md transition-all cursor-pointer font-bold"
            >
              Панельче кирер
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-brand-200 shadow-lg text-left">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
          <div>
            <span className="font-sans text-[10px] bg-brand-100 text-brand-700 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
              Host Panel
            </span>
            <h3 className="font-serif text-2xl text-gray-800 font-bold mt-1">
              Экии, Чайзана! 👋
            </h3>
            <p className="font-sans text-xs text-gray-400 mt-1">
              Бо черге силер аалчыларның харыыларын база оон-даа өске барымдааларны хынап болур силер.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-telegram-list"
              onClick={handleCopySummary}
              disabled={replies.length === 0}
              className={`py-2 px-3.5 rounded-xl text-xs font-semibold font-sans flex items-center gap-1.5 shadow-sm transition-all duration-300 cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-100 disabled:opacity-40 font-bold'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> ОК!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Telegram-че
                </>
              )}
            </button>

            <button
              onClick={() => setIsUnlocked(false)}
              className="py-2 px-3.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold font-sans hover:scale-102 transition-all cursor-pointer font-bold"
            >
              Үнер
            </button>
          </div>
        </div>

        {/* Dashboard Stats Grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-brand-50/50 p-4 rounded-xl border border-brand-100 flex items-center gap-3">
            <div className="p-3 bg-brand-500 rounded-xl text-white animate-[pulse_3s_infinite]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-wider font-bold text-gray-400">Точно келирлер</span>
              <p className="text-xl font-bold text-brand-700 font-serif leading-tight">
                {totalAttendingGuests} <span className="text-xs text-gray-500 font-sans font-normal">кижи (тода)</span>
              </p>
            </div>
          </div>

          <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-100 flex items-center gap-3">
            <div className="p-3 bg-sky-500 rounded-xl text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans tracking-wider font-bold text-gray-400">Анкеттер саны</span>
              <p className="text-xl font-bold text-sky-700 font-serif leading-tight">
                {replies.length} <span className="text-xs text-gray-500 font-sans font-normal">харыылар</span>
              </p>
            </div>
          </div>
        </div>

        {/* GitHub Pages & Email Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left flex gap-3 text-blue-800">
          <Info className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
          <div className="font-sans text-xs">
            <h5 className="font-bold">Эскериг (GitHub Pages кавызындан):</h5>
            <p className="mt-1 leading-relaxed text-blue-700 font-semibold">
              Силер сайтыңарны GitHub-ка салган болгаш, аалчыларның харыылары дорт силерниң почтаңарже (<strong>chmen00@mail.ru</strong>) дамчып келир! 
              <br />
              <span className="text-gray-500">•</span> Баштайгы аалчы харыыны чоруткан соонда почтаңар узуп хынап, <strong>FormSubmit</strong> каттыжыышкынын экижидер кылдыр силерже келген холбааны бадыткап (Activate) каар силер.
              <br />
              <span className="text-gray-500">•</span> Бо черге почтадан келген аалчыларның харыыларын курап, адаанда <strong>«+ Аалчы мануалдыг немээр»</strong> ужуру таварыштыр киирзин дээш кылдывыс. База база өске телефон кавызындан киргенде камгалаар дээш листи файл кылдыр камгалап (Backup) база ажыдып болур.
            </p>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-150">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="py-2 px-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold font-sans flex items-center gap-1.5 shadow-sm transition-all duration-300 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {showAddForm ? 'Аалчы формазын хаар' : 'Аалчы мануалдыг немээр'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              disabled={replies.length === 0}
              className="py-2 px-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold font-sans flex items-center gap-1.5 transition-all disabled:opacity-40"
              title="Экспорттаар (Файлче камгалап алыр)"
            >
              <Download className="w-4 h-4" /> Камгалал Файл
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-2 px-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold font-sans flex items-center gap-1.5 transition-all"
              title="Импорттаар (Файлдан киирер)"
            >
              <Upload className="w-4 h-4" /> Файл ажыдар
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Manual Add Form Block */}
        {showAddForm && (
          <form onSubmit={handleManualAddSubmit} className="bg-brand-50/45 p-5 rounded-xl border border-brand-100 mb-6 text-left space-y-4">
            <h4 className="font-serif text-sm font-semibold text-brand-800 font-bold border-b border-brand-100 pb-2">
              📝 Чаа аалчы харыызын киирер
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-sans text-[11px] text-gray-500 font-bold block">Аалчының ады / фамилиязы</label>
                <input
                  type="text"
                  required
                  placeholder="Чижээ: Чингис Ооржак"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brand-100 bg-white font-sans text-xs focus:ring-2 focus:ring-brand-300 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] text-gray-500 font-bold block">Келир бе?</label>
                <select
                  value={newAttendance}
                  onChange={(e) => setNewAttendance(e.target.value as 'yes' | 'no' | 'maybe')}
                  className="w-full px-3 py-2 rounded-lg border border-brand-100 bg-white font-sans text-xs focus:ring-2 focus:ring-brand-300 focus:outline-none"
                >
                  <option value="yes">Ийе, келир ✓</option>
                  <option value="maybe">Боданып турар ⌛</option>
                  <option value="no">Келбес ✕</option>
                </select>
              </div>

              {newAttendance === 'yes' && (
                <div className="space-y-1">
                  <label className="font-sans text-[11px] text-gray-500 font-bold block">Аалчылар саны</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={newGuestsCount}
                    onChange={(e) => setNewGuestsCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg border border-brand-100 bg-white font-sans text-xs focus:ring-2 focus:ring-brand-300 focus:outline-none"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-sans text-[11px] text-gray-500 font-bold block">Тайылбыр / йөрээлдер</label>
                <input
                  type="text"
                  placeholder="Чуруктар дээш чижээ..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-brand-100 bg-white font-sans text-xs focus:ring-2 focus:ring-brand-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="py-1.5 px-3 bg-gray-100 hover:bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Чазындырар
              </button>
              <button
                type="submit"
                className="py-1.5 px-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-xs font-semibold shadow-sm cursor-pointer"
              >
                Листче киир каар
              </button>
            </div>
          </form>
        )}

        {/* Detailed Guest Tables */}
        <div>
          <h4 className="font-serif text-sm font-semibold text-gray-800 mb-4 font-bold">
            📋 Аалчыларның долу лизи
          </h4>

          {replies.length === 0 ? (
            <div className="text-center py-10 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <span className="font-sans text-xs text-gray-400">Амдыызында харыылар чок. Линкти аалчыларже чорудуптуңаар! Почтаар (chmen00@mail.ru) дорт келген ответы бо кавыже киирип каар силер.</span>
            </div>
          ) : (
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="bg-brand-50/40 text-brand-900 border-b border-brand-100 font-bold select-none">
                    <th className="py-3.5 px-4 font-semibold">Ады / Фамилиязы</th>
                    <th className="py-3.5 px-4 font-semibold">Келири</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Аалчылар саны</th>
                    <th className="py-3.5 px-4 font-semibold">Тайылбыр / Йөрээлдер</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Чогуур</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {replies.map((reply) => (
                    <tr key={reply.id} className="hover:bg-brand-50/10 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-gray-800 break-words">{reply.name}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            reply.isAttending === 'yes'
                              ? 'bg-emerald-50 text-emerald-700'
                              : reply.isAttending === 'no'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {reply.isAttending === 'yes'
                            ? 'Келир'
                            : reply.isAttending === 'no'
                            ? 'Келбес'
                            : 'Келир чадавас'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-gray-700">
                        {reply.isAttending === 'yes' ? reply.guestsCount : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 max-w-[200px] break-words italic font-medium">
                        {reply.comment || '—'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDelete(reply.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {replies.length > 0 && (
            <div className="mt-5 flex justify-end">
              <button
                onClick={handleClearAll}
                className="py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold font-sans transition-colors cursor-pointer font-bold"
              >
                Листи долу узуткаар
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
