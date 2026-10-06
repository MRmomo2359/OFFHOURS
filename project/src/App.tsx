import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, Search, ShoppingBag, X } from 'lucide-react';

const images = {
  hero: 'https://images.pexels.com/photos/4398389/pexels-photo-4398389.jpeg?auto=compress&cs=tinysrgb&w=1800',
  fiveAm: 'https://images.pexels.com/photos/6339651/pexels-photo-6339651.jpeg?auto=compress&cs=tinysrgb&w=1000',
  nightshift: 'https://images.pexels.com/photos/4754144/pexels-photo-4754144.jpeg?auto=compress&cs=tinysrgb&w=1000',
  essentials: 'https://images.pexels.com/photos/7672111/pexels-photo-7672111.jpeg?auto=compress&cs=tinysrgb&w=1000',
  accessories: 'https://images.pexels.com/photos/12882041/pexels-photo-12882041.jpeg?auto=compress&cs=tinysrgb&w=1000',
  story: 'https://images.pexels.com/photos/8744801/pexels-photo-8744801.jpeg?auto=compress&cs=tinysrgb&w=1200',
  journalOne: 'https://images.pexels.com/photos/6389509/pexels-photo-6389509.jpeg?auto=compress&cs=tinysrgb&w=1000',
  journalTwo: 'https://images.pexels.com/photos/35645137/pexels-photo-35645137.jpeg?auto=compress&cs=tinysrgb&w=1000',
  journalThree: 'https://images.pexels.com/photos/13588101/pexels-photo-13588101.jpeg?auto=compress&cs=tinysrgb&w=1000',
};

type Product = { name: string; price: string; image: string; tone: string };

const products: Product[] = [
  { name: 'Heavyweight Training Tee', price: '$68', image: images.essentials, tone: 'stone' },
  { name: 'The Offhours Hoodie', price: '$128', image: images.hero, tone: 'charcoal' },
  { name: 'Core Training Short', price: '$74', image: images.fiveAm, tone: 'bone' },
  { name: 'Everyday Performance Tight', price: '$92', image: images.story, tone: 'slate' },
  { name: 'Studio Cap', price: '$46', image: images.accessories, tone: 'sand' },
];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const path = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [path]);

  const addToCart = () => setCartCount((count) => count + 1);

  if (path !== '/') {
    return <ScaffoldPage path={path} />;
  }

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-solid' : ''}`}>
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={18} /></button>
        <nav className="header-nav header-nav-left" aria-label="Primary navigation">
          <a href="#shop">Shop</a><a href="#collections">Collections</a><a href="#journal">Journal</a>
        </nav>
        <a className="wordmark" href="/">OFFHOURS</a>
        <nav className="header-nav header-nav-right" aria-label="Secondary navigation">
          <a href="#search"><Search size={15} /> <span>Search</span></a><a href="#account">Account</a><a href="#cart" className="cart-link">Cart <span>({String(cartCount).padStart(2, '0')})</span></a>
        </nav>
      </header>

      {menuOpen && <div className="mobile-drawer"><button className="drawer-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={20} /></button><span className="drawer-label">Navigation</span><a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a><a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a></div>}

      <main>
        <section className="hero" style={{ backgroundImage: `url(${images.hero})` }}>
          <div className="hero-overlay" />
          <div className="hero-content reveal">
            <span className="eyebrow">Est. for the unseen hours</span>
            <h1>OFFHOURS</h1>
            <p>Train on your time.</p>
            <a className="text-link text-link-light" href="#collections">Shop the Collection <ArrowRight size={16} /></a>
          </div>
          <div className="scroll-note"><span className="scroll-line" /> Scroll to explore</div>
        </section>

        <section className="statement section-dark reveal"><p>Built for the hours no one sees.</p></section>

        <section className="drop-section section-light" id="collections">
          <div className="section-intro reveal"><div><span className="eyebrow">The first drop</span><h2>Made for 5AM<br />and 11PM.</h2></div><p>Two collections. One philosophy. Gear that works as hard when the world is asleep as it does when the world is watching.</p></div>
          <div className="collection-grid">
            <CollectionCard className="collection-card-large" image={images.fiveAm} title="The 5AM Drop" description="Before the sun. Before the noise." />
            <CollectionCard className="collection-card-small collection-card-offset" image={images.nightshift} title="The Nightshift" description="After the day ends, the work begins." />
            <CollectionCard className="collection-card-small" image={images.essentials} title="Essentials" description="The pieces you reach for without thinking." />
            <CollectionCard className="collection-card-large" image={images.accessories} title="Accessories" description="The details that finish the fit." />
          </div>
        </section>

        <section className="products-section section-bone" id="shop">
          <div className="section-intro reveal"><div><span className="eyebrow">Best sellers</span><h2>The ones that<br />keep selling out.</h2></div><p>Quietly. Without a single ad.</p></div>
          <div className="product-scroller">{products.map((product) => <ProductCard key={product.name} product={product} onAdd={addToCart} />)}</div>
          <div className="scroll-direction"><span>Drag to explore</span><ArrowRight size={15} /></div>
        </section>

        <section className="story-section section-light" id="story"><div className="story-image reveal"><img src={images.story} alt="Female boxer training in a shadowed gym" /></div><div className="story-copy reveal"><span className="eyebrow">Our story</span><h2>Off the clock.<br />On the grind.</h2><p>OFFHOURS was built for the people who train when no one is watching. The 5AM lift before work. The 10PM run after the kids are down. The hours that don't make the highlight reel but build everything that does.</p><p>We don't make gear for the gym selfie. We make gear for the work behind it.</p><a className="text-link" href="/about">Read Our Story <ArrowRight size={16} /></a></div></section>

        <section className="journal-section section-bone" id="journal"><div className="section-intro reveal"><div><span className="eyebrow">The journal</span><h2>Notes from the<br />off hours.</h2></div><p>Training, style, and the quiet discipline in between.</p></div><div className="journal-grid"><ArticleCard image={images.journalOne} title="Why the Best Training Happens When No One Is Watching" time="4 min" /><ArticleCard image={images.journalTwo} title="Building a Wardrobe That Works as Hard as You Do" time="6 min" /><ArticleCard image={images.journalThree} title="The 5AM Routine: What the First Hour Sets Up" time="3 min" /></div></section>

        <section className="newsletter section-dark reveal"><span className="eyebrow">Stay in the hours</span><h2>First access.<br />No noise.</h2><p>New drops, restocks, and the occasional note from the studio. Nothing else.</p>{subscribed ? <div className="subscribed">You're on the list. We'll be in touch.</div> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.trim()) setSubscribed(true); }}><input type="email" placeholder="Your email address" aria-label="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Subscribe"><ArrowRight size={17} /></button></form>}<span className="micro-caption">No spam. Unsubscribe anytime.</span></section>
      </main>
      <Footer />
    </div>
  );
}

function CollectionCard({ image, title, description, className = '' }: { image: string; title: string; description: string; className?: string }) {
  return <a className={`collection-card reveal ${className}`} href="#shop"><div className="image-frame"><img src={image} alt="" /></div><div className="card-copy"><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={18} /></div></a>;
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return <article className="product-card reveal"><div className={`product-image ${product.tone}`}><img src={product.image} alt={product.name} /></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.price}</p></div><button aria-label={`Add ${product.name} to cart`} onClick={onAdd}><ShoppingBag size={16} /></button></div></article>;
}

function ArticleCard({ image, title, time }: { image: string; title: string; time: string }) {
  return <a className="article-card reveal" href="/journal"><div className="article-image image-frame"><img src={image} alt="" /></div><h3>{title}</h3><span>Read · {time}</span></a>;
}

function Footer() {
  return <footer className="site-footer section-dark"><div className="footer-top"><div><a className="wordmark" href="/">OFFHOURS</a><p>Train on your time.</p></div><div className="footer-columns"><FooterColumn title="Shop" links={['All', 'Men', 'Women', 'Accessories']} /><FooterColumn title="Company" links={['Our Story', 'Journal', 'Contact']} /><FooterColumn title="Support" links={['FAQ', 'Shipping', 'Returns', 'Size Guide']} /><FooterColumn title="Follow" links={['Instagram', 'TikTok', 'YouTube']} /></div></div><div className="footer-bottom"><span>© OFFHOURS 2025</span><span>Train on your time.</span><a href="#top">Back to top <ArrowUpRight size={14} /></a></div></footer>;
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return <div className="footer-column"><span className="footer-label">{title}</span>{links.map((link) => <a key={link} href={link === 'Our Story' ? '/about' : link === 'Journal' ? '/journal' : '#'}>{link}</a>)}</div>;
}

function ScaffoldPage({ path }: { path: string }) {
  const page = path.startsWith('/product') ? 'Product detail' : path === '/shop' ? 'Shop' : path === '/journal' ? 'The Journal' : 'Our Story';
  return <div className="scaffold-page section-light"><header className="site-header is-solid"><a className="wordmark" href="/">OFFHOURS</a><a className="text-link" href="/">Back to home <ArrowRight size={16} /></a></header><main><span className="eyebrow">OFFHOURS</span><h1>{page}</h1><p>This page is being considered with the same quiet attention as the collection.</p><a className="text-link" href="/">Return home <ArrowRight size={16} /></a></main></div>;
}

export default App;
