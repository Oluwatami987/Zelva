import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { ArrowUpRight, Check, Leaf, Shirt, Sparkles, Menu, X } from 'lucide-react';
import './styles.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;
const whatsappGroupUrl = import.meta.env.VITE_WHATSAPP_GROUP_URL || '';

function App() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!supabase) {
      setError('The waitlist is not connected yet. Please try again soon.');
      return;
    }
    setStatus('loading');
    const { error: insertError } = await supabase.from('waitlist').insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      source: 'zelva-landing-page'
    });
    if (insertError) {
      setStatus('idle');
      setError(insertError.code === '23505'
        ? 'That email is already on the list. You’re all set.'
        : 'Something went wrong. Please try again in a moment.');
      return;
    }
    setStatus('success');
  }

  return (
    <main>
      <div className="announcement">THE FIRST DROP · 11 NOVEMBER 2026 <span>—</span> FIRST LOOK AT 6 PM</div>
      <header className="nav shell">
        <a href="#top" className="wordmark" aria-label="Zelva home">
          <img src="/zelva-placeholder.jpg" alt="Zelva Fashion placeholder wordmark" />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#story" onClick={() => setMenuOpen(false)}>Our approach</a>
          <a href="#first-look" onClick={() => setMenuOpen(false)}>First look</a>
          <a className="nav-cta" href="#first-look" onClick={() => setMenuOpen(false)}>Join the list <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A MORE THOUGHTFUL WARDROBE</p>
          <h1>Everyone deserves<br />to feel <em>put together.</em></h1>
          <p className="hero-description">Good finds. Thoughtfully chosen. Ready for another life — and a place in your wardrobe.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#first-look">Get first-look access <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#story">Get to know Zelva <span>↓</span></a>
          </div>
          <div className="hero-note"><span className="note-dot" /> THE FIRST DROP IS ALMOST HERE</div>
        </div>
        <div className="hero-art" aria-label="Zelva brand introduction">
          <div className="art-frame">
            <div className="art-topline"><span>THE ART OF FINDING</span><span>NO. 001</span></div>
            <div className="editorial-word">wear<br /><i>well.</i></div>
            <div className="art-circle"><span>Z</span></div>
            <div className="art-caption">SOURCED WITH CARE.<br />CHOSEN TO BE WORN.</div>
            <div className="art-footer"><span>ZELVA</span><span>EST. 2026</span></div>
          </div>
          <div className="art-stamp">LESS WASTE<br /><b>MORE WEAR</b></div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>THOUGHTFULLY SOURCED <span>✳</span> CAREFULLY REWORKED <span>✳</span> MADE TO LAST <span>✳</span> THOUGHTFULLY SOURCED <span>✳</span> CAREFULLY REWORKED <span>✳</span> MADE TO LAST <span>✳</span></div>
      </div>

      <section className="story section shell" id="story">
        <div className="section-label"><span>01</span> OUR APPROACH</div>
        <div className="story-content">
          <h2>Good clothes.<br /><em>More life.</em></h2>
          <div className="story-right">
            <p className="story-lede">We believe looking good shouldn’t mean paying designer prices — or treating clothes as disposable.</p>
            <p>Zelva is about finding pieces with something left to give. We source with care, check the details, and rework each find so it’s ready to be worn and loved again.</p>
            <a className="text-link" href="#first-look">Be there from the beginning <span>↗</span></a>
          </div>
        </div>
        <div className="values-grid">
          <article className="value-card">
            <div className="value-icon"><Leaf size={20} strokeWidth={1.5} /></div>
            <p className="value-number">01 / CONSIDERED</p>
            <h3>Chosen with care</h3>
            <p>Pieces selected for their character, quality and potential.</p>
          </article>
          <article className="value-card">
            <div className="value-icon"><Shirt size={20} strokeWidth={1.5} /></div>
            <p className="value-number">02 / READY TO WEAR</p>
            <h3>Checked & finished</h3>
            <p>Every find gets attention before it finds its way to you.</p>
          </article>
          <article className="value-card">
            <div className="value-icon"><Sparkles size={20} strokeWidth={1.5} /></div>
            <p className="value-number">03 / LONGER LIFE</p>
            <h3>More than one story</h3>
            <p>Giving good pieces another chapter — in your own way.</p>
          </article>
        </div>
      </section>

      <section className="drop-section" id="first-look">
        <div className="drop-inner shell">
          <div className="drop-copy">
            <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> THE FIRST DROP</p>
            <h2>Be first in.<br /><em>Find your piece.</em></h2>
            <p>Join the list for first access, launch updates, and a first look at the pieces before everyone else.</p>
            <div className="drop-date"><span>11</span><div><b>NOVEMBER 2026</b><small>First look access opens at 6 PM</small></div></div>
          </div>
          <div className="form-card">
            {status === 'success' ? (
              <div className="success-state">
                <div className="success-icon"><Check size={23} /></div>
                <p className="eyebrow">YOU'RE ON THE LIST</p>
                <h3>We’ll keep you<br /><em>in the loop.</em></h3>
                <p>Your first-look signup is in. Join the Zelva WhatsApp group too, so you can catch the updates and be part of the conversation.</p>
                {whatsappGroupUrl ? <a className="button button-dark full-button" href={whatsappGroupUrl} target="_blank" rel="noreferrer">Join the WhatsApp group <ArrowUpRight size={17} /></a> : <p className="setup-note">WhatsApp invite link will appear here once configured.</p>}
              </div>
            ) : (
              <>
                <p className="form-kicker">YOUR NEXT GOOD FIND STARTS HERE</p>
                <h3>Get on the <em>list.</em></h3>
                <p className="form-intro">A little note when we’re ready. No noise, just Zelva.</p>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" placeholder="What should we call you?" value={form.name} onChange={update} required maxLength={80} autoComplete="name" />
                  <label htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={update} required maxLength={254} autoComplete="email" />
                  <label htmlFor="phone">Phone number <span className="optional">(optional)</span></label>
                  <input id="phone" name="phone" type="tel" placeholder="+234 ..." value={form.phone} onChange={update} maxLength={30} autoComplete="tel" />
                  <label className="consent"><input type="checkbox" required /> <span>I agree to receive Zelva launch updates by email or phone.</span></label>
                  {error && <p className="form-error" role="alert">{error}</p>}
                  <button className="button button-dark full-button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Adding you…' : 'Join the first-look list'} <ArrowUpRight size={17} /></button>
                </form>
                <p className="privacy-note">Your details stay with Zelva. We won’t sell your information.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <a href="#top" className="footer-wordmark">ZELVA<span>®</span></a>
        <p>Everyone deserves to feel put together.</p>
        <div className="footer-bottom"><span>THOUGHTFULLY SOURCED · CAREFULLY REWORKED</span><a href="#top">BACK TO TOP ↑</a><span>© ZELVA 2026</span></div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
