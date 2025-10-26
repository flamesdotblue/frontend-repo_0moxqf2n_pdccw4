import React, { useEffect, useMemo, useState } from 'react';

// Local storage helpers
const LS_KEYS = {
  PICS: 'nafim_pics',
  BLOGS: 'nafim_blogs',
  ADMIN_PW: 'nafim_admin_pw',
};

const DEFAULT_PICS = [
  {
    url: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=1400&auto=format&fit=crop',
    tags: ['analog', 'forest', 'night'],
    description: 'Cold shapes in a watching wood.',
  },
  {
    url: 'https://images.unsplash.com/photo-1453814235491-3cfac3999928?q=80&w=1400&auto=format&fit=crop',
    tags: ['urban', 'neon'],
    description: 'Alley lights blink like eyes.',
  },
  {
    url: 'https://images.unsplash.com/photo-1432256851563-20155d0b7a39?q=80&w=1400&auto=format&fit=crop',
    tags: ['mist', 'road'],
    description: 'The road remembers what we forget.',
  },
];

const DEFAULT_BLOGS = [
  {
    title: 'Echoes Under Fluorescents',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1400&auto=format&fit=crop',
    body: '## Corridor Studies\nThe camera coughs. *Shadows* lean. **Nerves** hum. \\u underlight \\u',
  },
  {
    title: 'Three Windows Facing North',
    image: 'https://images.unsplash.com/photo-1746116075727-f06d5e6720e4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUaHJlZSUyMFdpbmRvd3MlMjBGYWNpbmclMjBOb3J0aHxlbnwwfDB8fHwxNzYxNDc4NjgxfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    body: 'Silence becomes a frame. *Red* drips from memory.',
  },
];

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// Custom markup parser: *x* bold, **x** italic, ## subheading, \u x \u underline
function parseCustomMarkup(text) {
  if (!text) return null;
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // headings starting with ##
  html = html.replace(/^##\s?(.*)$/gm, '<h3 class="text-zinc-100 text-xl font-semibold mt-4 mb-2">$1</h3>');
  // underline with \u ... \u
  html = html.replace(/\\u\s?([^\\]+?)\s?\\u/g, '<span class="underline decoration-red-700 decoration-2 underline-offset-4">$1</span>');
  // italic with **x**
  html = html.replace(/\*\*(.*?)\*\*/g, '<em class="text-zinc-200">$1</em>');
  // bold with *x*
  html = html.replace(/\*(.*?)\*/g, '<strong class="text-zinc-100">$1</strong>');
  // line breaks
  html = html.replace(/\n/g, '<br />');

  return <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
}

// Utility to check anagram of the given phrase
const PHRASE = 'lacturapocrumservamultos';
function normalizeLetters(s) {
  return s.toLowerCase().replace(/\s+/g, '').split('').sort().join('');
}
function isAnagramOfPhrase(candidate) {
  return normalizeLetters(candidate) === normalizeLetters(PHRASE);
}

function Home({ pics, blogs }) {
  // simple 3x1 slideshow cycling
  const sources = [...pics.map(p => p.url), ...blogs.map(b => b.image)];
  const slides = sources.slice(0, Math.max(3, Math.min(9, sources.length)));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => {
          const index = (tick + i) % slides.length;
          const url = slides[index] || slides[0];
          return (
            <div key={i} className="relative aspect-[3/2] overflow-hidden rounded-lg bg-zinc-900 border border-red-900/30 shadow-[0_0_40px_rgba(127,29,29,0.15)]">
              <img src={url} alt="slideshow" className="w-full h-full object-cover transition-transform duration-[2500ms] scale-110 hover:scale-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-zinc-300 space-y-3">
        <p>
          I am <span className="text-zinc-100 font-semibold">Nafim</span>. In the hush between frames, stories stare back. My lens likes the dark — the places where color decides to whisper.
        </p>
        <p>
          Scroll through images, read the notes, and if the hall light flickers, thats part of the show.
        </p>
      </div>
    </div>
  );
}

function Pictures({ pics }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Pictures</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pics.map((p, idx) => (
          <div key={idx} className="group rounded-lg overflow-hidden bg-zinc-900 border border-red-900/30">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={p.url} alt={p.description} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <p className="text-zinc-200 text-sm">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t, i) => (
                  <span key={i} className="text-[11px] uppercase tracking-wide bg-red-900/20 text-red-400 px-2 py-1 rounded border border-red-900/40">#{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Blog({ blogs }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Blog</h2>
      <div className="space-y-10">
        {blogs.map((b, idx) => (
          <article key={idx} className="rounded-xl overflow-hidden bg-zinc-900 border border-red-900/30">
            <img src={b.image} alt={b.title} className="w-full h-64 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-zinc-100">{b.title}</h3>
              <div className="mt-3 text-zinc-300 text-sm">
                {parseCustomMarkup(b.body)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Admin({ pics, setPics, blogs, setBlogs, adminPw, setAdminPw }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');

  useEffect(() => {
    if (!adminPw) {
      // default credentials
      setAdminPw('nafimclicks');
    }
  }, [adminPw, setAdminPw]);

  const login = (e) => {
    e.preventDefault();
    if (user === 'nafim' && pw === (adminPw || 'nafimclicks')) {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const [newPic, setNewPic] = useState({ url: '', tags: '', description: '' });
  const [newBlog, setNewBlog] = useState({ title: '', image: '', body: '' });

  const addPic = (e) => {
    e.preventDefault();
    if (!newPic.url) return;
    const item = { url: newPic.url, description: newPic.description || '', tags: newPic.tags ? newPic.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    const next = [item, ...pics];
    setPics(next);
    writeLS(LS_KEYS.PICS, next);
    setNewPic({ url: '', tags: '', description: '' });
  };

  const addBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.image) return;
    const item = { ...newBlog };
    const next = [item, ...blogs];
    setBlogs(next);
    writeLS(LS_KEYS.BLOGS, next);
    setNewBlog({ title: '', image: '', body: '' });
  };

  const [candidatePw, setCandidatePw] = useState('');
  const changePw = (e) => {
    e.preventDefault();
    if (isAnagramOfPhrase(candidatePw)) {
      setAdminPw(candidatePw);
      writeLS(LS_KEYS.ADMIN_PW, candidatePw);
      alert('Password updated (valid anagram).');
      setCandidatePw('');
    } else {
      alert('New password must be an anagram of: ' + PHRASE);
    }
  };

  if (!loggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Admin Login</h2>
        <form onSubmit={login} className="space-y-4">
          <input value={user} onChange={e => setUser(e.target.value)} placeholder="username" className="w-full bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
          <input value={pw} onChange={e => setPw(e.target.value)} type="password" placeholder="password" className="w-full bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
          <button className="w-full bg-red-800 hover:bg-red-700 text-white font-medium rounded px-4 py-2 transition-colors">Enter</button>
        </form>
        <p className="mt-4 text-xs text-zinc-400">Default: nafim / nafimclicks</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Admin</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3">Add Picture</h3>
          <form onSubmit={addPic} className="space-y-3">
            <input value={newPic.url} onChange={e => setNewPic({ ...newPic, url: e.target.value })} placeholder="Image URL" className="w-full bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
            <input value={newPic.tags} onChange={e => setNewPic({ ...newPic, tags: e.target.value })} placeholder="tags (comma separated)" className="w-full bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
            <input value={newPic.description} onChange={e => setNewPic({ ...newPic, description: e.target.value })} placeholder="description" className="w-full bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
            <button className="bg-red-800 hover:bg-red-700 text-white font-medium rounded px-4 py-2 transition-colors">Upload</button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-3">Add Blog</h3>
          <form onSubmit={addBlog} className="space-y-3">
            <input value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} placeholder="title" className="w-full bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
            <input value={newBlog.image} onChange={e => setNewBlog({ ...newBlog, image: e.target.value })} placeholder="image url" className="w-full bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
            <textarea value={newBlog.body} onChange={e => setNewBlog({ ...newBlog, body: e.target.value })} rows={6} placeholder="Body (use *bold*, **italic**, \\u underline \\u, and ## subheadings)" className="w-full bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
            <button className="bg-red-800 hover:bg-red-700 text-white font-medium rounded px-4 py-2 transition-colors">Publish</button>
          </form>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-zinc-100 mb-3">Change Password</h3>
        <form onSubmit={changePw} className="flex gap-3">
          <input value={candidatePw} onChange={e => setCandidatePw(e.target.value)} placeholder="new password (anagram of phrase)" className="flex-1 bg-zinc-900 border border-red-900/40 rounded px-3 py-2 text-zinc-100 placeholder-zinc-500" />
          <button className="bg-red-900 hover:bg-red-800 text-white font-medium rounded px-4 py-2">Update</button>
        </form>
        <p className="mt-2 text-xs text-zinc-400">Phrase: {PHRASE}</p>
      </div>
    </div>
  );
}

export default function ContentArea({ path }) {
  const [pics, setPics] = useState(() => readLS(LS_KEYS.PICS, DEFAULT_PICS));
  const [blogs, setBlogs] = useState(() => readLS(LS_KEYS.BLOGS, DEFAULT_BLOGS));
  const [adminPw, setAdminPw] = useState(() => readLS(LS_KEYS.ADMIN_PW, 'nafimclicks'));

  useEffect(() => writeLS(LS_KEYS.PICS, pics), [pics]);
  useEffect(() => writeLS(LS_KEYS.BLOGS, blogs), [blogs]);

  if (path === '/pic') return <Pictures pics={pics} />;
  if (path === '/blog') return <Blog blogs={blogs} />;
  if (path === '/admin') return (
    <Admin pics={pics} setPics={setPics} blogs={blogs} setBlogs={setBlogs} adminPw={adminPw} setAdminPw={setAdminPw} />
  );
  return <Home pics={pics} blogs={blogs} />;
}
