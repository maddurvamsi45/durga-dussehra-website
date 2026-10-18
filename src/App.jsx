import React, { useState } from "react";
import { Menu, X, Flower2, ShieldCheck, Sun, HeartHandshake, Copy, Check, ExternalLink, Sparkles, Mail, MapPin, Phone, Send, ChevronDown, ChevronUp, Quote } from "lucide-react";
import { blessings, quotes, gallery, days, navItems } from "./data.js";

function Header() {
 const [open,setOpen] = useState(false);
 return <header className="header">
  <a className="brand" href="#home"><Flower2 size={31}/><span><b>Durga Maa</b><small>Victory of the Divine Mother</small></span></a>
  <button className="menu" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  <nav className={open?"nav nav-open":"nav"}>{navItems.map(n=><a key={n} href={"#"+n.toLowerCase()} onClick={()=>setOpen(false)}>{n}</a>)}</nav>
  <a className="festival-link" href="#blessings">🪔 Happy Dussehra</a>
 </header>;
}
function Heading({eyebrow,title,subtitle,light=false}) {
 return <div className={"heading "+(light?"heading-light":"")}><p className="eyebrow">✦ {eyebrow} ✦</p><h2>{title}</h2><p className="subtitle">{subtitle}</p><div className="ornament">❧ ❖ ❧</div></div>;
}
function Hero() {
 return <section className="hero" id="home">
  <img className="hero-img" src="https://commons.wikimedia.org/wiki/Special:FilePath/Traditional_maa_Durga.jpg?width=1600" alt="Traditional Maa Durga idol" fetchPriority="high"/>
  <div className="hero-shade"></div><div className="hero-copy">
   <p className="kicker"><Sparkles size={16}/> THE DIVINE MOTHER OF STRENGTH AND COMPASSION</p>
   <h1>Jai Maa <em>Durga</em></h1><p className="hero-intro">May her blessings fill your life with courage, peace, prosperity, and light.</p>
   <blockquote>“When you feel lost, just remember — Maa Durga is always with you.”</blockquote>
   <div className="actions"><a className="btn btn-gold" href="#blessings">Explore blessings ✦</a><a className="btn btn-outline" href="#gallery">View gallery</a></div>
   <p className="mantra">ॐ दुं दुर्गायै नमः</p>
  </div><a className="scroll" href="#about" aria-label="Scroll to about">↓</a>
 </section>;
}
function About() {
 return <section className="section about" id="about"><div className="container about-grid"><div>
  <Heading eyebrow="The story and spirit" title="A celebration of Shakti" subtitle="Maa Durga represents the power that protects, nurtures, and restores balance."/>
  <p>Dussehra, also known as Vijayadashami, celebrates the triumph of good over evil. Across India, families gather for prayer, cultural traditions, and the joy of a fresh start. The festival reminds us that courage and goodness can prevail even in difficult moments.</p>
  <p>This devotional space shares blessings, uplifting words, and traditional imagery to help you celebrate the spirit of Maa Durga with your loved ones.</p>
  <ul className="values">{["Choose courage over fear.","Let compassion guide your words.","Stand for truth and justice.","Make every new beginning meaningful."].map(v=><li key={v}>✓ &nbsp;{v}</li>)}</ul>
  <a className="text-link" href="#quotes">Read inspirational quotes →</a>
 </div><div className="about-art"><img src="https://commons.wikimedia.org/wiki/Special:FilePath/Maa_durga_image.jpg?width=1000" alt="Devotional image of Goddess Durga" loading="lazy"/><div className="stamp">☀<b>Shakti</b><small>Power • Grace • Wisdom</small></div><div className="caption">Faith gives us courage; kindness gives it purpose.</div></div></div></section>;
}
function Blessings() {
 const icons=[Flower2,ShieldCheck,Sun,HeartHandshake];
 return <section className="section" id="blessings"><div className="container"><Heading eyebrow="Divine grace" title="Maa Durga’s Blessings" subtitle="May the Divine Mother guide every heart toward strength, kindness, and inner peace."/><div className="blessing-grid">{blessings.map((b,i)=>{const Icon=icons[i];return <article className="blessing-card" key={b.title}><div className="blessing-icon"><Icon size={30}/></div><h3>{b.title}</h3><p>{b.text}</p><small>{b.mantra}</small></article>})}</div></div></section>;
}
function Quotes() {
 const [copied,setCopied]=useState(-1);
 async function copy(q,i){try{await navigator.clipboard.writeText("“"+q.text+"” — "+q.author);setCopied(i);window.setTimeout(()=>setCopied(-1),1800)}catch{setCopied(-1)}}
 return <section className="section quotes" id="quotes"><div className="container"><Heading light eyebrow="Words for the soul" title="Inspirational Blessings & Quotes" subtitle="Share a little faith, courage, and positivity with someone you love."/><div className="quote-grid">{quotes.map((q,i)=><article className="quote-card" key={q.text}><Quote size={27} className="quote-icon"/><p>{q.text}</p><div className="quote-bottom"><small>— {q.author}</small><button onClick={()=>copy(q,i)}>{copied===i?<Check size={15}/>:<Copy size={15}/>} {copied===i?"Copied":"Copy"}</button></div></article>)}</div></div></section>;
}
function Navratri() {
 const [expanded,setExpanded]=useState(0);
 return <section className="section navratri" id="navratri"><div className="container"><Heading eyebrow="Nine nights of devotion" title="Navratri at a glance" subtitle="A simple introduction to the nine forms traditionally honoured during Navratri."/><div className="navratri-grid"><aside><div className="sun-symbol">✺</div><h3>Nine forms, one divine energy</h3><p>Traditions vary across regions and families. Use this guide as a starting point for reflection, prayer, and learning.</p><a className="btn btn-maroon" href="#contact">Share a blessing</a></aside><div className="accordion">{days.map(([name,note],i)=><article key={name} className="day"><button onClick={()=>setExpanded(expanded===i?-1:i)} aria-expanded={expanded===i}><span className="day-num">{String(i+1).padStart(2,"0")}</span><span><small>DAY {i+1}</small><b>{name}</b></span>{expanded===i?<ChevronUp/>:<ChevronDown/>}</button>{expanded===i&&<p>{note}</p>}</article>)}</div></div></div></section>;
}
function Gallery() {
 const [filter,setFilter]=useState("All"),[active,setActive]=useState(null);
 const filters=["All","Deity","Festival","Art"],shown=filter==="All"?gallery:gallery.filter(g=>g.category===filter);
 return <section className="section gallery" id="gallery"><div className="container"><Heading eyebrow="A glimpse of devotion" title="Traditional Durga Gallery" subtitle="A gallery celebrating the artistry and festive beauty of Durga Puja."/><div className="filters">{filters.map(f=><button key={f} className={filter===f?"chip chip-active":"chip"} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="gallery-grid">{shown.map(g=><article className="gallery-card" key={g.title}><button className="image-button" onClick={()=>setActive(g)} aria-label={"View "+g.title}><img src={g.image} alt={g.alt} loading="lazy"/><span>View image ↗</span></button><div className="gallery-copy"><div><small>{g.category}</small><h3>{g.title}</h3></div><a href={g.source} target="_blank" rel="noreferrer" aria-label={"Source for "+g.title}><ExternalLink size={17}/></a></div><p className="credit">{g.credit}</p></article>)}</div><p className="gallery-note">Images are hosted by Wikimedia Commons. Check each source page for current licensing and attribution requirements before reuse.</p></div>{active&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={()=>setActive(null)}><button className="close" onClick={()=>setActive(null)} aria-label="Close image"><X/></button><div className="lightbox-box" onClick={e=>e.stopPropagation()}><img src={active.image} alt={active.alt}/><div><b>{active.title}</b><p>{active.credit}</p><a href={active.source} target="_blank" rel="noreferrer">View source and license ↗</a></div></div></div>}</section>;
}
function Contact() {
 const [form,setForm]=useState({name:"",email:"",message:""}),[sent,setSent]=useState(false);
 function change(e){setForm({...form,[e.target.name]:e.target.value});setSent(false)}
 function submit(e){e.preventDefault();setSent(true);setForm({name:"",email:"",message:""})}
 return <section className="section contact" id="contact"><div className="container"><Heading eyebrow="Send a prayer" title="Connect with us" subtitle="Have a blessing to share or a suggestion? We'd love to hear from you."/><div className="contact-grid"><div className="contact-info"><h3>May the Divine Mother guide you</h3><p>This demo form works on the client side. Connect it to an email service or backend before collecting real messages.</p><div><Mail/><span><small>Email</small><b>namaste@example.com</b></span></div><div><Phone/><span><small>Phone</small><b>+91 00000 00000</b></span></div><div><MapPin/><span><small>Celebrating from</small><b>India and around the world</b></span></div><blockquote>ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे</blockquote></div><form onSubmit={submit}><label htmlFor="name">Your name</label><input id="name" name="name" value={form.name} onChange={change} placeholder="Enter your name" required/><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required/><label htmlFor="message">Your message</label><textarea id="message" name="message" value={form.message} onChange={change} placeholder="Write a blessing or message..." rows="5" required/><button className="btn btn-maroon"><Send size={16}/> Send message</button>{sent&&<p className="success" role="status">✓ Thank you. Your form was validated locally.</p>}</form></div></div></section>;
}
function Footer() {
 return <footer><div className="footer-main"><a className="brand" href="#home"><Flower2/><span><b>Durga Maa</b><small>Victory of the Divine Mother</small></span></a><p>May Maa Durga bless you always 🙏</p><div className="social"><a href="https://www.instagram.com/" aria-label="Instagram">◎</a><a href="https://www.youtube.com/" aria-label="YouTube">▶</a><a href="#contact" aria-label="Contact">♡</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Durga Maa. Made with devotion.</span><span>Jai Mata Di 🪷</span></div></footer>;
}
export default function App(){return <><a className="skip" href="#main">Skip to content</a><Header/><main id="main"><Hero/><About/><Blessings/><Quotes/><Navratri/><Gallery/><Contact/></main><Footer/></>}
