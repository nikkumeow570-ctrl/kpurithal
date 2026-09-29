import { useState } from 'react'
import { Check, Lock, Play, RotateCcw, Sprout } from 'lucide-react'
import { useLS } from './useLS'

const WEEKS = ['புரிதல்', 'தூண்டுதல்கள்', 'குடும்பம்', 'உடலும் மனமும்', 'சூழல் & நண்பர்கள்', 'பணமும் எதிர்காலமும்', 'ஆசையை வெல்லுதல்', 'உணர்வுகள்', 'புதிய பழக்கங்கள்', 'நம்பிக்கை மீட்பு', 'தடுமாற்றத்தில் நிற்பது', 'புதிய வாழ்க்கை', 'என் பயணம்']
const TASKS = [
  ['உங்கள் காரணத்தை எழுதுங்கள்', 'நான் ஏன் மாற வேண்டும்? குறிப்புகளில் எழுதுங்கள்.'],
  ['தூண்டுதலைக் கவனியுங்கள்', 'இன்று எந்த நேரத்தில், எந்த இடத்தில் ஆசை வந்தது? கவனியுங்கள்.'],
  ['5 நிமிட மூச்சுப் பயிற்சி', 'SOS பொத்தானில் உள்ள மூச்சுப் பயிற்சியை ஒரு முறை செய்யுங்கள்.'],
  ['ஒருவரிடம் பேசுங்கள்', 'நம்பிக்கையான ஒருவரிடம் இன்றைய நிலையைப் பகிருங்கள்.'],
  ['மது இல்லாத மாலை', 'இன்று மாலை நேரத்திற்கு ஒரு திட்டம் போடுங்கள்: நடை, உணவு, குடும்பம்.'],
  ['உடலை நகர்த்துங்கள்', '20 நிமிடம் நடங்கள் அல்லது ஏதேனும் உடற்பயிற்சி செய்யுங்கள்.'],
  ['இன்றைய நன்றி', 'இன்று நடந்த மூன்று நல்ல விஷயங்களை எழுதுங்கள்.']
]
const VIDEO_TITLES = ['Phenomenon of Craving', 'குடும்பத்தின் வலி', 'தூண்டுதல்கள் புரிதல்', 'துணையாக நிற்பது எப்படி', 'மீட்பின் முதல் படிகள்', 'ஒரு நாள் ஒரு நேரத்தில்']
const MOODS = [['😔', 'கடினம்'], ['😐', 'சரி'], ['🙂', 'நல்லது']]
const MILESTONES = { 7: 'ஒரு வாரம்! முதல் அடி வலிமையாக இருந்தது.', 30: '30 நாட்கள்! இது பழக்கமாகிறது.', 60: '60 நாட்கள்! உங்கள் குடும்பம் மாற்றத்தை உணரும்.', 90: '90 நாட்கள்! நீங்கள் புதிய மனிதர்.' }

const today = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()) }
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export default function Journey({ goVideos }) {
  const [start, setStart] = useLS('kp_jstart', null)
  const [done, setDone] = useLS('kp_jdone', {})   // { day: mood }
  const [mood, setMood] = useState(null)
  const [sel, setSel] = useState(null)
  const [cheer, setCheer] = useState('')

  if (!start) {
    return (
      <div className="pt-8 space-y-6 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-sun/15 grid place-items-center"><Sprout size={36} className="text-sun" /></div>
        <h1 className="text-2xl font-semibold leading-snug">90 நாள் புரிதல் பயணம்</h1>
        <p className="text-sm text-mute font-medium leading-relaxed">தினமும் ஒரு சிறிய படி. ஒரு வீடியோ, ஒரு செயல், ஒரு மனநிலை பதிவு. அவசரம் வேண்டாம்.</p>
        <button onClick={() => setStart(iso(today()))} className="tap w-full py-4 rounded-[24px] bg-sun text-white text-base font-semibold shadow-sm">இன்றே தொடங்குவோம்</button>
        <p className="text-[11px] text-mute font-medium">நீண்ட நாள் அதிகமாக குடித்தவர்கள் திடீரென நிறுத்தும் முன் மருத்துவரை அணுகுங்கள். Tele-MANAS: 14416</p>
      </div>
    )
  }

  const cur = Math.min(90, Math.max(1, Math.round((today() - parse(start)) / 864e5) + 1))
  const day = sel ?? cur
  const week = Math.ceil(day / 7)
  const wStart = (week - 1) * 7 + 1
  const days = Array.from({ length: Math.min(7, 90 - wStart + 1) }, (_, i) => wStart + i)
  const [tTitle, tBody] = TASKS[(day - 1) % 7]
  const locked = day > cur
  const isDone = done[day] !== undefined
  const count = Object.keys(done).length

  const finish = () => {
    if (mood === null) return
    navigator.vibrate?.(20)
    setDone({ ...done, [day]: mood })
    setCheer(MILESTONES[day] || 'இன்றைய படி முடிந்தது. நன்றாகச் செய்தீர்கள்!')
    setMood(null)
    setTimeout(() => setCheer(''), 3500)
  }
  const restart = () => { if (confirm('மீண்டும் தொடங்கலாமா? விழுவது தோல்வி அல்ல, மீண்டும் எழுவதே வெற்றி.')) { setStart(iso(today())); setDone({}); setSel(null) } }

  return (
    <div className="space-y-5 pt-2">
      <div className="flex items-end justify-between">
        <div><p className="text-xs text-sun">வாரம் {week} · {WEEKS[week - 1]}</p><h1 className="text-2xl font-semibold">நாள் {day}</h1></div>
        <span className="text-xs text-mute">{count}/90</span>
      </div>
      <div className="h-1.5 rounded-full bg-line overflow-hidden"><div className="h-full rounded-full bg-sun transition-all duration-700" style={{ width: `${(count / 90) * 100}%` }} /></div>

      <div className="flex gap-2 justify-between">
        {days.map(d => {
          const ok = done[d] !== undefined, lock = d > cur, active = d === day
          return (
            <button key={d} onClick={() => { setSel(d); setMood(null) }} className={`tap w-11 h-14 rounded-2xl grid place-items-center text-sm border ${active ? 'border-sun bg-sun/10' : 'border-line bg-white'} ${lock ? 'opacity-40' : ''}`}>
              <span>{d}</span>{ok ? <Check size={14} className="text-sun" /> : lock ? <Lock size={12} /> : <span className={`w-1.5 h-1.5 rounded-full ${d === cur ? 'bg-sun' : 'bg-line'}`} />}
            </button>
          )
        })}
      </div>

      {locked ? (
        <div className="card p-8 text-center"><Lock className="mx-auto mb-3 text-mute" /><p className="text-sm text-mute font-medium">இந்த நாள் இன்னும் திறக்கவில்லை. இன்றைய படியை முடியுங்கள்.</p></div>
      ) : (
        <>
          <button onClick={goVideos} className="card tap w-full p-4 flex items-center gap-4 text-left">
            <span className="w-12 h-12 shrink-0 rounded-full bg-sun grid place-items-center"><Play size={20} fill="white" className="text-white" /></span>
            <span><span className="block text-xs text-sun">இன்றைய வீடியோ</span><span className="text-sm">{VIDEO_TITLES[(day - 1) % VIDEO_TITLES.length]}</span></span>
          </button>
          <div className="card p-5">
            <p className="text-xs text-sun mb-1">இன்றைய செயல்</p>
            <h2 className="text-lg font-semibold">{tTitle}</h2>
            <p className="text-sm text-mute font-medium mt-1 leading-relaxed">{tBody}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs text-mute mb-3">இன்று எப்படி உணர்கிறீர்கள்?</p>
            <div className="flex gap-3">
              {MOODS.map(([e, l], i) => {
                const on = (isDone ? done[day] : mood) === i
                return <button key={i} disabled={isDone} onClick={() => setMood(i)} className={`tap flex-1 py-3 rounded-2xl border text-center ${on ? 'border-sun bg-sun/15' : 'border-line bg-white'}`}><span className="block text-2xl">{e}</span><span className="text-[11px]">{l}</span></button>
              })}
            </div>
          </div>
          <button onClick={finish} disabled={isDone || mood === null} className="tap w-full py-4 rounded-[24px] bg-sun text-white font-semibold disabled:bg-line disabled:text-mute">
            {isDone ? '✓ முடிந்தது' : 'இன்றைய படியை முடி'}
          </button>
        </>
      )}
      <button onClick={restart} className="mx-auto flex items-center gap-1.5 text-[11px] text-mute"><RotateCcw size={12} /> மீண்டும் தொடங்க</button>
      {cheer && <div className="fixed z-50 top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-[350px] card shadow-md p-4 text-center text-sm animate-fade border-sun/30">🌅 {cheer}</div>}
    </div>
  )
}
