import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import AdminPanel from './pages/AdminPanel';
import CustomerDashboard from './pages/CustomerDashboard';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import hrs1 from './images/hrs1.webp';
import image from './images/image.png';
import hrs2 from './images/hrs2.webp';
import hrs3 from './images/hrs3.jpg';

function App() {
  return (
    <Router>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .nav-btn { position: relative; overflow: hidden; transition: all 0.3s ease; }
        .nav-btn::before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(0, 255, 255, 0.3); transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s; }
        .nav-btn:hover::before { width: 300px; height: 300px; }
        .nav-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4); border-color: #00ffff; color: #00ffff; }
        .feature-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; }
        .feature-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent); transform: rotate(45deg); transition: all 0.6s; }
        .feature-card:hover::before { left: 100%; }
        .feature-card:hover { transform: translateY(-15px) scale(1.03); box-shadow: 0 25px 50px rgba(0, 255, 255, 0.3); }
        .cta-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 40px rgba(255, 0, 255, 0.4); }
        .particle { position: absolute; width: 4px; height: 4px; background: rgba(0, 255, 255, 0.6); border-radius: 50%; animation: float 6s infinite ease-in-out; }
        .footer-link { transition: all 0.3s ease; }
        .footer-link:hover { color: #ff00ff; transform: translateY(-2px); }
        .social-icon { transition: all 0.3s ease; }
        .social-icon:hover { background: rgba(255, 0, 255, 0.3); border-color: #ff00ff; transform: scale(1.1); box-shadow: 0 0 20px rgba(255, 0, 255, 0.5); }
        .review-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 50px rgba(52, 168, 83, 0.6); }
        .login-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 50px rgba(66, 133, 244, 0.6); }
        @media (max-width: 768px) {
          .navbar { flex-direction: column !important; padding: 15px 20px !important; gap: 15px; }
          .nav-buttons { width: 100%; justify-content: center; }
          .hero-title { font-size: 2.5rem !important; }
          .hero-subtitle { font-size: 1.1rem !important; }
          .section-title { font-size: 2rem !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .cta-buttons { flex-direction: column; width: 100%; padding: 0 20px; }
          .cta-btn { width: 100%; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .footer-links { flex-direction: column; gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 2rem !important; }
          .stats-number { font-size: 2.5rem !important; }
        }
      `}</style>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const slides = [
    { title: 'State-of-the-Art Recording Studio', description: 'Experience world-class recording with cutting-edge technology and acoustic perfection.', image: hrs1 },
    { title: 'Professional Music Production', description: 'Transform your musical vision into reality with our expert production team.', image: image },
    { title: 'Your Sound, Perfected', description: 'From recording to mastering, we deliver exceptional quality that makes your music stand out.', image: hrs2 },
    { title: 'Premium Studio Equipment', description: 'Industry-leading technology for pristine sound quality and professional results.', image: hrs3 },
    { title: 'Expert Sound Engineering', description: 'Skilled engineers bringing decades of experience to every recording session.', image: hrs1 },
    { title: 'Creative Music Space', description: 'Inspiring environment designed to unlock your creative potential and musical expression.', image: image },
    { title: 'Full Production Services', description: 'Complete production suite from pre-production to final mastering and distribution.', image: hrs2 },
    { title: 'Artist-Focused Studio', description: 'Dedicated to bringing your unique artistic vision to life with personalized attention.', image: hrs3 }
  ];

  const features = [
    { icon: '🎤', title: 'Premium Recording', desc: 'Industry-leading equipment and pristine acoustics for flawless audio captures' },
    { icon: '🎵', title: 'Music Production', desc: 'Full-service production from concept to final master with expert guidance' },
    { icon: '🎧', title: 'Mixing & Mastering', desc: 'Professional mixing and mastering that makes your tracks radio-ready' },
    { icon: '🎸', title: 'Live Sessions', desc: 'Multi-track live session recording with real-time monitoring capabilities' },
    { icon: '🎹', title: 'Custom Compositions', desc: 'Original compositions and custom arrangements tailored to your project' },
    { icon: '✨', title: 'Audio Post-Production', desc: 'Complete audio solutions for film, podcasts, and multimedia projects' }
  ];

  const testimonials = [
    { text: 'HRS Studio transformed our sound completely. The quality and professionalism are absolutely unmatched!', name: 'Sarah Johnson', role: 'Independent Artist' },
    { text: 'Best recording experience ever! The team really understands music and brings out the best in every track.', name: 'Mike Chen', role: 'Music Producer' },
    { text: 'From acoustics to equipment, everything is world-class. This studio takes your music to the next level!', name: 'Emma Davis', role: 'Professional Vocalist' }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 5000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => { clearInterval(slideInterval); window.removeEventListener('scroll', handleScroll); };
  }, [slides.length]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`, animationDuration: `${4 + Math.random() * 4}s`
  }));

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#000', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', backgroundSize: '400% 400%', animation: 'gradientShift 15s ease infinite', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        {particles.map((p, i) => <div key={i} className="particle" style={{ top: p.top, left: p.left, animationDelay: p.animationDelay, animationDuration: p.animationDuration }} />)}
      </div>
      
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: scrolled ? '15px 60px' : '20px 60px', position: 'fixed', top: 0, width: '100%', background: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,255,255,0.2)', zIndex: 1000, transition: 'all 0.3s', boxSizing: 'border-box' }}>
        <div style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer', letterSpacing: 2 }} onClick={() => navigate('/')}>🎵 HRS STUDIO</div>
        <div className="nav-buttons" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {['Login', 'Admin', 'Dashboard', 'Contact', 'About'].map((label, i) => (
            <button key={i} className="nav-btn" style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(0,255,255,0.5)', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600, borderRadius: 30, cursor: 'pointer', position: 'relative', zIndex: 1 }} onClick={() => navigate(['login','admin','dashboard','contact','about'][i])}>{label}</button>
          ))}
        </div>
      </nav>

      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', zIndex: 2, paddingTop: 80 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${hrs3})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3) contrast(1.2)', zIndex: -1 }} />
        <div style={{ maxWidth: 900, padding: '0 20px', animation: 'fadeInUp 1s ease-out' }}>
          <h1 className="hero-title" style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: 20, background: 'linear-gradient(135deg, #0ff, #f0f, #0ff)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 3s linear infinite', lineHeight: 1.2 }}>Where Music Comes Alive</h1>
          <p className="hero-subtitle" style={{ fontSize: '1.5rem', color: '#e0e0e0', marginBottom: 40, fontWeight: 300, lineHeight: 1.8 }}>Professional recording studio delivering exceptional sound quality and unforgettable musical experiences</p>
          <div className="cta-buttons" style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-btn" style={{ padding: '18px 45px', fontSize: '1.1rem', fontWeight: 700, borderRadius: 50, border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1, background: 'linear-gradient(135deg, #f0f, #0ff)', color: '#000', boxShadow: '0 10px 40px rgba(255,0,255,0.5)', transition: 'all 0.3s' }} onClick={() => navigate('/login')}>Get Started</button>
            <button className="cta-btn" style={{ padding: '18px 45px', fontSize: '1.1rem', fontWeight: 700, borderRadius: 50, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1, background: 'transparent', color: '#0ff', border: '2px solid #0ff', transition: 'all 0.3s' }} onClick={() => navigate('/about')}>Learn More</button>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 50 }}>
            {[40,60,35,70,45,55,40].map((h, i) => <div key={i} style={{ width: 6, height: h, background: 'linear-gradient(180deg, #0ff, #f0f)', borderRadius: 10, animation: `pulse ${0.6+i*0.1}s ease-in-out infinite` }} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 40px', position: 'relative', zIndex: 2 }}>
        <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 70, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'scaleIn 0.8s ease-out' }}>Our Premium Services</h2>
        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, maxWidth: 1400, margin: '0 auto' }}>
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '50px 35px', borderRadius: 25, border: '1px solid rgba(0,255,255,0.3)', textAlign: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: '4rem', marginBottom: 25, display: 'block', filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.5))' }}>{f.icon}</span>
              <h3 style={{ fontSize: '1.8rem', color: '#0ff', marginBottom: 15, fontWeight: 700 }}>{f.title}</h3>
              <p style={{ color: '#b0b0b0', fontSize: '1.05rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 40px', position: 'relative', zIndex: 2, background: 'rgba(0,0,0,0.5)' }}>
        <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 70, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Featured Highlights</h2>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', borderRadius: 30, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,255,255,0.3)' }}>
          <div style={{ display: 'flex', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transform: `translateX(-${currentSlide*100}%)` }}>
            {slides.map((s, i) => (
              <div key={i} style={{ minWidth: '100%', position: 'relative' }}>
                <img src={s.image} alt={s.title} style={{ width: '100%', height: 450, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)', padding: '40px' }}>
                  <h3 style={{ fontSize: '2rem', color: '#0ff', marginBottom: 10, fontWeight: 800 }}>{s.title}</h3>
                  <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: 1.6 }}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 30, flexWrap: 'wrap', padding: '0 20px' }}>
            {slides.map((_, i) => <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: currentSlide===i?40:12, height: 12, borderRadius: currentSlide===i?6:'50%', background: currentSlide===i?'#0ff':'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: currentSlide===i?'0 0 20px rgba(0,255,255,0.8)':'none' }} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 40px', background: 'rgba(255,0,255,0.05)', position: 'relative', zIndex: 2 }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 50, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          {[{n:'1000+',l:'Projects Completed'},{n:'15+',l:'Years Experience'},{n:'500+',l:'Happy Artists'},{n:'24/7',l:'Support'}].map((s, i) => (
            <div key={i} style={{ animation: 'scaleIn 0.6s ease-out' }}>
              <div className="stats-number" style={{ fontSize: '4rem', fontWeight: 900, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 10 }}>{s.n}</div>
              <div style={{ fontSize: '1.2rem', color: '#999', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 40px', position: 'relative', zIndex: 2 }}>
        <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 70, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>What Our Clients Say</h2>
        <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 35, maxWidth: 1300, margin: '0 auto' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: 40, borderRadius: 20, border: '1px solid rgba(255,0,255,0.3)', transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.02)';e.currentTarget.style.boxShadow='0 15px 40px rgba(0,255,255,0.3)'}} onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none'}}>
              <p style={{ fontSize: '1.1rem', color: '#ddd', marginBottom: 25, lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg, #0ff, #f0f)' }} />
                <div>
                  <div style={{ fontSize: '1.1rem', color: '#0ff', fontWeight: 700 }}>{t.name}</div>
                  <div style={{ fontSize: '0.9rem', color: '#888' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 40px', textAlign: 'center', background: 'rgba(0,255,255,0.05)', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(15px)', padding: '60px 40px', borderRadius: 30, border: '2px solid rgba(0,255,255,0.3)' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: 20, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Share Your Experience</h2>
          <p style={{ color: '#ccc', fontSize: '1.2rem', marginBottom: 10 }}>Your feedback helps us grow and serve you better</p>
          <p style={{ color: '#999', fontSize: '1rem', marginBottom: 20 }}>Leave a review and let others know about your HRS Studio experience</p>
          <button className="review-btn" style={{ background: 'linear-gradient(135deg, #34a853, #2d8e47)', color: '#fff', border: 'none', padding: '18px 50px', fontSize: '1.2rem', borderRadius: 50, cursor: 'pointer', fontWeight: 700, marginTop: 30, boxShadow: '0 10px 40px rgba(52,168,83,0.5)', transition: 'all 0.3s' }} onClick={() => window.open('https://g.co/kgs/Co7pMp7', '_blank')}>Leave a Google Review</button>
        </div>
      </section>

      <section style={{ padding: '100px 40px', position: 'relative', zIndex: 2 }}>
        <h2 className="section-title" style={{ fontSize: '3.5rem', fontWeight: 900, textAlign: 'center', marginBottom: 70, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get In Touch</h2>
        <ContactPage />
      </section>

      <footer style={{ background: 'rgba(0,0,0,0.95)', padding: '80px 40px 30px', borderTop: '1px solid rgba(0,255,255,0.2)', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 20 }}>🎵 HRS STUDIO</div>
          <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: 40 }}>Your trusted partner in music production and recording excellence</p>
          <div className="footer-links" style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', marginBottom: 40 }}>
            {[{p:'/',l:'Home'},{p:'/about',l:'About'},{p:'/contact',l:'Contact'},{p:'/dashboard',l:'Dashboard'},{p:'/login',l:'Login'}].map((x, i) => <Link key={i} to={x.p} className="footer-link" style={{ color: '#0ff', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 600 }}>{x.l}</Link>)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 25, marginBottom: 40 }}>
            {['bi-facebook', 'bi-twitter-x', 'bi-instagram', 'bi-music-note-beamed'].map((icon, i) => (
              <div key={i} className="social-icon" style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(0,255,255,0.1)', border: '2px solid rgba(0,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', cursor: 'pointer' }}>
                <i className={icon}></i>
              </div>
            ))}
          </div>
          <p style={{ color: '#555', fontSize: '0.95rem', paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.1)' }}>© {new Date().getFullYear()} HRS Studio. All rights reserved. | Designed with 💜 & 🎵</p>
        </div>
      </footer>
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user.email === "asharhiten@gmail.com") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(-45deg, #000, #1a0033, #000033, #330033)', backgroundSize: '400% 400%', animation: 'gradientShift 15s ease infinite', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', padding: '60px 50px', borderRadius: 30, border: '2px solid rgba(0,255,255,0.3)', textAlign: 'center', maxWidth: 450, width: '90%', boxShadow: '0 30px 80px rgba(0,255,255,0.3)', animation: 'scaleIn 0.6s ease-out' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: 15, background: 'linear-gradient(135deg, #0ff, #f0f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome Back</h1>
        <p style={{ color: '#999', fontSize: '1.1rem', marginBottom: 40 }}>Sign in to access your HRS Studio account</p>
        {error && <p style={{ background: 'rgba(255,68,68,0.2)', color: '#f44', padding: 15, borderRadius: 15, marginTop: 20, fontSize: '0.95rem', border: '1px solid rgba(255,68,68,0.5)' }}>{error}</p>}
        <button className="login-btn" style={{ background: 'linear-gradient(135deg, #4285f4, #357ae8)', color: '#fff', border: 'none', padding: '18px 40px', fontSize: '1.1rem', borderRadius: 50, cursor: 'pointer', width: '100%', fontWeight: 700, boxShadow: '0 10px 40px rgba(66,133,244,0.5)', transition: 'all 0.3s' }} onClick={loginWithGoogle} disabled={loading}>{loading ? 'Signing in...' : 'Sign in with Google'}</button>
        <p style={{ color: '#666', marginTop: 30, fontSize: '0.9rem' }}>By signing in, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
};

export default App;