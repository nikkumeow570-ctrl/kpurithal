import { useEffect, useState } from 'react'
import { Home, Sprout, PlayCircle, Wrench, LifeBuoy, Play, Pin, ChevronDown, X, Phone, Download, Youtube, Instagram, Facebook, Send, MessageCircle } from 'lucide-react'
import Journey from './Journey.jsx'
import { useLS } from './useLS'

const VIDEOS = [
  { id: 1, t: 'Phenomenon of Craving', d: '12:40', c: 'Craving', pin: true },
  { id: 2, t: 'குடும்பத்தின் வலி', d: '09:15', c: 'Family', pin: true },
  { id: 3, t: 'தூண்டுதல்கள் புரிதல்', d: '08:02', c: 'Craving' },
  { id: 4, t: 'துணையாக நிற்பது எப்படி', d: '11:30', c: 'Family' },
  { id: 5, t: 'மீட்பின் முதல் படிகள்', d: '14:20', c: 'Solution' },
  { id: 6, t: 'ஒரு நாள் ஒரு நேரத்தில்', d: '07:45', c: 'Solution' }
]
const CHANNEL = 'https://youtube.com/@kudipazhakkathinpurithal'
const yt = v => (v.yt ? 'https://youtu.be/' + v.yt : CHANNEL)
const CATS = ['All', 'Craving', 'Family', 'Solution']
const CONCEPTS = [
  ['முதல் படி: ஏற்றுக்கொள்ளுதல்', 'குடிப்பழக்கம் என் கட்டுப்பாட்டை மீறிவிட்டது என்பதை ஏற்பதே விடுதலையின் தொடக்கம். இது தோல்வி அல்ல, தெளிவு.'],
  ['ஒரு நேரத்தில் ஒரு நாள்', 'வாழ்நாள் முழுவதையும் இன்று சுமக்க வேண்டாம். இன்றைய நாளை மட்டும் கடந்து செல்லுங்கள்.'],
  ['நீங்கள் தனியாக இல்லை', 'புரிந்துகொள்ளும் மனிதர்களுடன் பேசுவதே பாதி மீட்பு. உதவி கேட்பது வலிமை.']
]
const SOCIAL = [['YouTube', Youtube, 'https://youtube.com/@kudipazhakkathinpurithal'], ['Instagram', Instagram, 'https://www.instagram.com/kpurithal'], ['Facebook', Facebook, 'https://www.facebook.com/share/1DC9YXHK81/'], ['Telegram', Send, 'https://t.me/+EUv45mLaIh83OWM1'], ['WhatsApp', MessageCircle, 'https://chat.whatsapp.com/GO7p9SgxGu82Rjbm6SFVmM']]
const todayISO = () => new Date().toLocaleDateString('en-CA')

const Thumb = ({ v, className = '' }) => (
  <div className={`relative bg-[#F3E4D8] grid place-items-center ${className}`}>
    <span className="w-11 h-11 rounded-full bg-white/90 grid place-items-center shadow-sm"><Play size={18} className="text-sun" fill="currentColor" /></span>
    <span className="absolute bottom-2 right-2 text-[11px] bg-ink/70 text-white rounded-md px-1.5">{v.d}</span>
  </div>
)

function HomeScreen({ go }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">வணக்கம்</h1>
        <p className="text-mute">இன்று ஒரு சிறிய படி போதும்.</p>
      </div>
      <div className="rounded-[20px] bg-[#FCE9DD] p-6">
        <p className="text-xl font-semibold leading-relaxed">புரிதலே விடுதலையின் முதல் படி</p>
      </div>
      <button onClick={() => go(1)} className="card tap w-full p-4 flex items-center gap-4 text-left">
        <span className="w-12 h-12 rounded-full bg-sun/15 grid place-items-center"><Sprout className="text-sun" /></span>
        <span><span className="block text-sm text-mute">90 நாள் பயணம்</span>இன்றைய படியைப் பார்க்க</span>
      </button>
      <a href={yt(VIDEOS[0])} target="_blank" rel="noreferrer" className="card tap block w-full overflow-hidden text-left">
        <Thumb v={VIDEOS[0]} className="aspect-video" />
        <div className="p-4"><p className="text-sm text-mute">இன்றைய வீடியோ</p><p className="font-semibold">{VIDEOS[0].t}</p></div>
      </a>
      <div className="card p-5">
        <p className="text-sm text-mute mb-3">எங்களுடன் இணையுங்கள்</p>
        <div className="flex justify-between">
          {SOCIAL.map(([n, Icon, url]) => (
            <a key={n} href={url} target="_blank" rel="noreferrer" aria-label={n} className="tap w-12 h-12 rounded-full bg-paper border border-line grid place-items-center"><Icon size={20} /></a>
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-mute px-4">குடிப்பழக்கம் ஒரு பழக்கம் அல்ல... குடும்பத்தையே பாதிக்கும் நோய். மீண்டு வர முடியும்.</p>
    </div>
  )
}

function VideosScreen() {
  const [cat, setCat] = useState('All')
  const list = VIDEOS.filter(v => cat === 'All' || v.c === cat)
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">வீடியோக்கள்</h1>
      <div className="flex gap-2 overflow-x-auto no-sb">
        {CATS.map(c => <button key={c} onClick={() => setCat(c)} className={`tap px-4 py-2 rounded-full text-sm border ${cat === c ? 'bg-sun border-sun text-white' : 'bg-white border-line text-mute'}`}>{c}</button>)}
      </div>
      <div className="space-y-3">
        {list.map(v => (
          <a key={v.id} href={yt(v)} target="_blank" rel="noreferrer" className="card tap flex overflow-hidden">
            <Thumb v={v} className="w-32 shrink-0 aspect-video" />
            <div className="p-3 min-w-0">
              <p className="font-semibold leading-snug">{v.t}</p>
              <p className="text-xs text-mute mt-1 flex items-center gap-1">{v.pin && <Pin size={11} className="text-sun" />}{v.c}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function ToolsScreen() {
  const [start, setStart] = useLS('kp_sober', null)
  const [pick, setPick] = useState(todayISO())
  const [note, setNote] = useLS('kp_note', '')
  const [open, setOpen] = useState(0)
  const days = start ? Math.max(0, Math.floor((Date.now() - new Date(start + 'T00:00:00')) / 864e5)) : 0
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">கருவிகள்</h1>
      <div className="card p-6 text-center">
        {start ? (
          <>
            <p className="text-6xl font-semibold text-sun">{days}</p>
            <p className="text-mute mt-1">{days === 0 ? 'இன்று உங்கள் முதல் நாள்' : 'நாட்கள் தெளிவாக'}</p>
            <button onClick={() => confirm('மீண்டும் தொடங்கலாமா? விழுவது தோல்வி அல்ல, மீண்டும் எழுவதே வெற்றி.') && setStart(todayISO())} className="text-sm text-mute underline mt-4">மீண்டும் தொடங்க</button>
          </>
        ) : (
          <>
            <p className="font-semibold mb-1">நிறுத்திய நாள்</p>
            <p className="text-sm text-mute mb-4">நாட்களை நாங்கள் எண்ணுகிறோம்.</p>
            <input type="date" max={todayISO()} value={pick} onChange={e => setPick(e.target.value)} className="w-full mb-4 p-3 rounded-xl border border-line bg-paper text-center" />
            <button className="btn" onClick={() => setStart(pick)}>தொடங்குவோம்</button>
          </>
        )}
      </div>
      <section className="space-y-3">
        <h2 className="text-sm text-mute">AA கருத்துகள்</h2>
        {CONCEPTS.map(([t, b], i) => (
          <div key={i} className="card overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between p-4 text-left">
              <span className="font-semibold">{t}</span><ChevronDown size={18} className={`text-mute transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="px-4 pb-4 text-mute">{b}</p>}
          </div>
        ))}
      </section>
      <section className="card p-4">
        <h2 className="text-sm text-mute mb-2">என் குறிப்புகள்</h2>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={5} placeholder="இன்று எப்படி உணர்கிறீர்கள்? எழுதுங்கள்…" className="w-full bg-transparent outline-none resize-none placeholder:text-mute/60" />
      </section>
    </div>
  )
}

const PHASES = [['உள்ளிழுங்கள்', 4, 1], ['நிறுத்துங்கள்', 4, 1], ['மெதுவாக வெளியேற்றுங்கள்', 6, 0.6]]
function Help({ onClose }) {
  const [i, setI] = useState(0)
  useEffect(() => { const t = setTimeout(() => setI(x => (x + 1) % 3), PHASES[i][1] * 1000); return () => clearTimeout(t) }, [i])
  const [label, dur, scale] = PHASES[i]
  return (
    <div className="fixed inset-0 z-50 bg-paper flex justify-center">
      <div className="w-full max-w-[390px] px-6 py-6 flex flex-col items-center text-center">
        <button onClick={onClose} aria-label="Close" className="self-end p-2 text-mute"><X size={24} /></button>
        <h2 className="text-xl font-semibold mt-2">மெதுவாக. நீங்கள் பாதுகாப்பாக இருக்கிறீர்கள்.</h2>
        <p className="text-mute mt-2">ஆசை ஒரு அலை போன்றது. உயர்ந்து, பிறகு அடங்கும்.</p>
        <div className="flex-1 grid place-items-center">
          <div className="w-44 h-44 rounded-full bg-sage/25 grid place-items-center" style={{ transform: `scale(${scale})`, transition: `transform ${dur}s ease-in-out` }}>
            <div className="w-24 h-24 rounded-full bg-sage/50" />
          </div>
        </div>
        <p className="text-xl font-semibold h-8">{label}</p>
        <a href="tel:14416" className="btn mt-8 flex items-center justify-center gap-2 no-underline"><Phone size={18} /> Tele-MANAS 14416 அழைக்க</a>
        <p className="text-xs text-mute mt-3">நம்பிக்கையான ஒருவரிடமும் பேசுங்கள். நீங்கள் தனியாக இல்லை.</p>
      </div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState(0)
  const [help, setHelp] = useState(false)
  const [prompt, setPrompt] = useState(null)
  useEffect(() => {
    const h = e => { e.preventDefault(); setPrompt(e) }
    window.addEventListener('beforeinstallprompt', h)
    return () => window.removeEventListener('beforeinstallprompt', h)
  }, [])
  const tabs = [['முகப்பு', Home], ['பயணம்', Sprout], ['வீடியோ', PlayCircle], ['கருவிகள்', Wrench]]
  const Screens = [<HomeScreen go={setTab} />, <Journey goVideos={() => setTab(2)} />, <VideosScreen />, <ToolsScreen />]
  return (
    <div className="min-h-screen bg-paper flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen">
        <header className="sticky top-0 z-30 bg-paper/95 flex items-center justify-between px-5 pt-[max(.75rem,env(safe-area-inset-top))] pb-3">
          <span className="font-semibold">குடிப்பழக்கத்தின் புரிதல்</span>
          <button onClick={() => setHelp(true)} className="tap flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-line text-sun font-semibold text-sm"><LifeBuoy size={16} /> உதவி</button>
        </header>
        <main key={tab} className="animate-fade px-5 pt-2 pb-28">
          {prompt && <button onClick={async () => { prompt.prompt(); await prompt.userChoice; setPrompt(null) }} className="card tap mb-4 w-full py-2.5 flex items-center justify-center gap-2 text-sm text-sun"><Download size={16} /> செயலியை நிறுவுங்கள்</button>}
          {Screens[tab]}
        </main>
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-line flex pb-[env(safe-area-inset-bottom)]">
          {tabs.map(([n, Icon], i) => (
            <button key={n} onClick={() => setTab(i)} className={`flex-1 py-3 flex flex-col items-center gap-0.5 text-xs ${tab === i ? 'text-sun font-semibold' : 'text-mute'}`}><Icon size={22} />{n}</button>
          ))}
        </nav>
        {help && <Help onClose={() => setHelp(false)} />}
      </div>
    </div>
  )
}
