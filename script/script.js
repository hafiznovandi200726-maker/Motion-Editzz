/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- mobile menu ---------- */
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click',()=>{
  mobileMenu.style.display = mobileMenu.style.display==='flex' ? 'none' : 'flex';
});
document.querySelectorAll('.mm-link').forEach(a=>a.addEventListener('click',()=>mobileMenu.style.display='none'));

/* ---------- portfolio data ---------- */
const portfolioItems = [
  {
    title:'Teaser Video PMB',
    catLabel:'Video Promosi',
    seed:'me-pf1',
    url:'https://www.instagram.com/reel/DcT3PTKP8am/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=='
  },
  {
    title:'Vlog Pekan Raya Sumatera Utara',
    catLabel:'Vlog',
    seed:'me-pf2',
    url:'https://www.instagram.com/reel/Dba_n8NRFga/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=='
  },
];
const pfGrid = document.getElementById('portfolioGrid');
pfGrid.innerHTML = portfolioItems.map(p=>`
  <a class="pf-item" href="${p.url}" target="_blank" rel="noopener">
    <img src="https://picsum.photos/seed/${p.seed}/700/900" alt="${p.title}" loading="lazy">
    <div class="pf-play">▶</div>
    <div class="pf-overlay">
      <span class="pf-cat">${p.catLabel}</span>
      <div class="pf-title">${p.title}</div>
      <span class="pf-link">Tonton di Instagram →</span>
    </div>
  </a>
`).join('');

/* ---------- products ---------- */
const products = [
  {
    name:'Aesthetic B-Roll Footage Pack — 100+ Cinematic Clips',
    tag:'Footage',
    seed:'me-prod1',
    url:'http://lynk.id/funixxyx/op09vzoq5p9r/checkout'
  },
  {
    name:'100+ Hook Video Viral — Bikin Konten Lebih Menarik & Nggak Gampang Di-Skip!',
    tag:'Hook Video',
    seed:'me-prod2',
    url:'http://lynk.id/funixxyx/rej4w9wj77w2/checkout'
  },
  {
    name:'30+ Template Instagram Produk Makanan — Template Promosi UMKM Restoran & Kuliner',
    tag:'Template',
    seed:'me-prod3',
    url:'http://lynk.id/funixxyx/zez65dv5jne1/checkout'
  },
];
const prodGrid = document.getElementById('productsGrid');
prodGrid.innerHTML = products.map(p=>`
  <div class="product-card">
    <div class="product-thumb"><img src="https://picsum.photos/seed/${p.seed}/500/375" alt="${p.name}" loading="lazy"></div>
    <div class="product-body">
      <span class="product-tag">${p.tag}</span>
      <span class="product-name">${p.name}</span>
      <div class="product-foot">
        <a class="buy-btn" href="${p.url}" target="_blank" rel="noopener">Beli Sekarang</a>
      </div>
    </div>
  </div>
`).join('');

/* ---------- contact form (Web3Forms) ---------- */
const contactForm = document.getElementById('contactForm');
const cfSubmitBtn = document.getElementById('cf-submit');
const cfMsg = document.getElementById('cf-msg');

cfSubmitBtn.addEventListener('click', async ()=>{
  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const detail = document.getElementById('cf-detail').value.trim();

  if(!name || !email || !detail){
    cfMsg.style.color = '#ff2e2e';
    cfMsg.textContent = 'Isi semua kolom dulu ya.';
    return;
  }

  const originalLabel = cfSubmitBtn.textContent;
  cfSubmitBtn.disabled = true;
  cfSubmitBtn.textContent = 'Mengirim...';
  cfMsg.style.color = '#9a9a9a';
  cfMsg.textContent = '';

  try{
    const formData = new FormData(contactForm);
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });
    const result = await res.json();

    if(result.success){
      cfMsg.style.color = '#7bd88f';
      cfMsg.textContent = 'Pesan terkirim — kami balas ke email kamu dalam 1x24 jam.';
      contactForm.reset();
    } else {
      cfMsg.style.color = '#ff2e2e';
      cfMsg.textContent = 'Gagal mengirim. Coba lagi atau hubungi kami lewat WhatsApp.';
    }
  } catch(err){
    cfMsg.style.color = '#ff2e2e';
    cfMsg.textContent = 'Koneksi bermasalah. Coba lagi atau hubungi kami lewat WhatsApp.';
  } finally {
    cfSubmitBtn.disabled = false;
    cfSubmitBtn.textContent = originalLabel;
  }
});