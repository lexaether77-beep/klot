/* ============================================================
   KLOT — Application JavaScript
   All features: storefront, cart, admin, import engine, PM
   ============================================================ */

// ── SVG Logo Snippets ──
const LOGO_SVG = function(fill, w) {
  return '<svg viewBox="0 0 60 70" fill="none" style="width:' + w + 'px;height:auto"><rect x="0" y="0" width="17" height="28" fill="' + fill + '"/><rect x="0" y="32" width="17" height="38" fill="' + fill + '"/><rect x="21.5" y="10" width="17" height="18" fill="' + fill + '"/><rect x="21.5" y="32" width="17" height="38" fill="' + fill + '"/><rect x="43" y="0" width="17" height="28" fill="' + fill + '"/><rect x="43" y="32" width="17" height="38" fill="' + fill + '"/></svg>';
};

// ── PRODUCT DATA ──
var products = [
  {id:1,  sku:'MN-001', name:'The Obsidian Jacket',  category:'fashion', tag:'new',     priceNGN:89000,  priceUSD:55,  sizes:'XS-XL',    color:'#1a2d42', style:'unisex', activity:'training', stock:42, status:'active',   imageUrl:'assets/images/product-01.svg', description:'A sleek all-season luxury active jacket.'},
  {id:2,  sku:'MN-002', name:'Ivory Tailored Jogger', category:'fashion', tag:'',        priceNGN:65000,  priceUSD:40,  sizes:'XS-XL',    color:'#e8e0d0', style:'unisex', activity:'training', stock:28, status:'active',   imageUrl:'assets/images/product-02.svg', description:'Tailored jogger in ivory performance fabric.'},
  {id:3,  sku:'MN-003', name:'Precision Run Vest',    category:'sports',  tag:'new',     priceNGN:48000,  priceUSD:30,  sizes:'XS-XL',    color:'#2a3d4a', style:'unisex', activity:'running',  stock:61, status:'active',   imageUrl:'assets/images/product-03.svg', description:'Lightweight vest engineered for performance running.'},
  {id:4,  sku:'MN-004', name:'Navy Flow Leggings',    category:'sports',  tag:'',        priceNGN:54000,  priceUSD:34,  sizes:'XS-XL',    color:'#0d1b2a', style:'women',  activity:'yoga',     stock:35, status:'active',   imageUrl:'assets/images/product-04.svg', description:'Ultra-soft navy leggings for yoga and training.'},
  {id:5,  sku:'MN-005', name:'Mini Luxe Sweatshirt',  category:'kids',    tag:'',        priceNGN:32000,  priceUSD:20,  sizes:'2-12 yrs', color:'#c8bfaa', style:'unisex', activity:'training', stock:19, status:'active',   imageUrl:'assets/images/product-05.svg', description:'Soft luxury sweatshirt for little ones.'},
  {id:6,  sku:'MN-006', name:'Editorial Trench Coat', category:'fashion', tag:'limited', priceNGN:145000, priceUSD:90,  sizes:'XS-XL',    color:'#9a8860', style:'unisex', activity:'training', stock:8,  status:'active',   imageUrl:'assets/images/product-06.svg', description:'Limited-edition trench coat with editorial drape.'},
  {id:7,  sku:'MN-007', name:'Sprint Elite Shorts',   category:'sports',  tag:'new',     priceNGN:38000,  priceUSD:24,  sizes:'XS-XL',    color:'#1a2d42', style:'men',    activity:'running',  stock:54, status:'active',   imageUrl:'assets/images/product-07.svg', description:'High-performance sprint shorts.'},
  {id:8,  sku:'MN-008', name:'Cashmere Hoodie',       category:'fashion', tag:'',        priceNGN:110000, priceUSD:68,  sizes:'XS-XL',    color:'#d4c4a8', style:'unisex', activity:'training', stock:22, status:'active',   imageUrl:'assets/images/product-08.svg', description:'Premium cashmere-blend hoodie in warm taupe.'},
  {id:9,  sku:'MN-009', name:'Kids Puffer Vest',      category:'kids',    tag:'new',     priceNGN:28000,  priceUSD:17,  sizes:'2-12 yrs', color:'#0d1b2a', style:'unisex', activity:'running',  stock:47, status:'active',   imageUrl:'assets/images/product-09.svg', description:'Lightweight puffer vest for active kids.'},
  {id:10, sku:'MN-010', name:'Yoga Luxe Bra',         category:'sports',  tag:'',        priceNGN:42000,  priceUSD:26,  sizes:'XS-XL',    color:'#3d2a42', style:'women',  activity:'yoga',     stock:33, status:'active',   imageUrl:'assets/images/product-10.svg', description:'Medium-support luxury sports bra.'},
  {id:11, sku:'MN-011', name:'Silk-Touch Bomber',     category:'fashion', tag:'limited', priceNGN:125000, priceUSD:78,  sizes:'XS-XL',    color:'#1a3a2a', style:'men',    activity:'training', stock:11, status:'active',   imageUrl:'assets/images/product-11.svg', description:'Silk-touch bomber in deep forest green.'},
  {id:12, sku:'MN-012', name:'Mini Sport Set',        category:'kids',    tag:'',        priceNGN:36000,  priceUSD:22,  sizes:'2-12 yrs', color:'#2a4a3a', style:'unisex', activity:'training', stock:26, status:'active',   imageUrl:'assets/images/product-12.svg', description:'Matching top and shorts sport set for kids.'},
  {id:13, sku:'MN-013', name:'Performance Tee',       category:'sports',  tag:'',        priceNGN:26000,  priceUSD:16,  sizes:'XS-XL',    color:'#f5f0e8', style:'unisex', activity:'running',  stock:78, status:'active',   imageUrl:'assets/images/product-13.svg', description:'Breathable performance tee in cream.'},
  {id:14, sku:'MN-014', name:'Draped Midi Skirt',     category:'fashion', tag:'new',     priceNGN:78000,  priceUSD:48,  sizes:'XS-XL',    color:'#c8bfaa', style:'women',  activity:'training', stock:17, status:'active',   imageUrl:'assets/images/product-14.svg', description:'Fluid draped midi skirt in warm sand.'},
  {id:15, sku:'MN-015', name:'Kids Jogger Pant',      category:'kids',    tag:'',        priceNGN:24000,  priceUSD:15,  sizes:'2-12 yrs', color:'#1a2d42', style:'unisex', activity:'training', stock:39, status:'active',   imageUrl:'assets/images/product-15.svg', description:'Comfortable jogger pant for everyday wear.'},
  {id:16, sku:'MN-016', name:'Ultra Stretch Tight',   category:'sports',  tag:'',        priceNGN:46000,  priceUSD:29,  sizes:'XS-XL',    color:'#0d1b2a', style:'unisex', activity:'yoga',     stock:44, status:'active',   imageUrl:'assets/images/product-16.svg', description:'Four-way stretch tight for yoga and training.'},
  {id:17, sku:'MN-017', name:'Linen Wide-Leg Pant',   category:'fashion', tag:'',        priceNGN:68000,  priceUSD:42,  sizes:'XS-XL',    color:'#e8e0d0', style:'unisex', activity:'training', stock:31, status:'active',   imageUrl:'assets/images/product-17.svg', description:'Relaxed wide-leg pant in premium linen.'},
  {id:18, sku:'MN-018', name:'Kids Luxe Tracksuit',   category:'kids',    tag:'limited', priceNGN:52000,  priceUSD:32,  sizes:'2-12 yrs', color:'#2a1a0d', style:'unisex', activity:'training', stock:14, status:'active',   imageUrl:'assets/images/product-18.svg', description:'Matching luxe tracksuit set for kids.'},
  {id:19, sku:'MN-019', name:'Trail Windbreaker',     category:'sports',  tag:'new',     priceNGN:72000,  priceUSD:45,  sizes:'XS-XL',    color:'#3a4a2a', style:'unisex', activity:'running',  stock:29, status:'active',   imageUrl:'assets/images/product-19.svg', description:'Packable windbreaker for trail running.'},
  {id:20, sku:'MN-020', name:'Merino Turtleneck',     category:'fashion', tag:'',        priceNGN:92000,  priceUSD:57,  sizes:'XS-XL',    color:'#8a6a4a', style:'unisex', activity:'training', stock:23, status:'active',   imageUrl:'assets/images/product-20.svg', description:'Fine merino turtleneck in warm cognac.'}
];

var orders = [
  {id:'#MN-2841', customer:'Amara Okafor',    items:2, total:143000, status:'delivered',  date:'Nov 12 2025'},
  {id:'#MN-2840', customer:'Emeka Nwosu',      items:1, total:89000,  status:'shipped',    date:'Nov 12 2025'},
  {id:'#MN-2839', customer:'Fatima Al-Hassan', items:3, total:231000, status:'processing', date:'Nov 11 2025'},
  {id:'#MN-2838', customer:'Chidera Eze',      items:1, total:65000,  status:'delivered',  date:'Nov 11 2025'},
  {id:'#MN-2837', customer:'Ngozi Williams',   items:4, total:320000, status:'shipped',    date:'Nov 10 2025'},
  {id:'#MN-2836', customer:'Ibrahim Musa',     items:2, total:156000, status:'processing', date:'Nov 10 2025'},
  {id:'#MN-2835', customer:'Adesola Bello',    items:1, total:48000,  status:'delivered',  date:'Nov 9 2025'},
  {id:'#MN-2834', customer:'Oluseun Adeyemi',  items:3, total:287000, status:'shipped',    date:'Nov 9 2025'}
];

var cart = [];
var lastShopPage = 'shop';  // tracks last visited shop/category page
var currentCurrency = 'NGN';

// ── CURRENCY ──
function toggleCurrency() {
  currentCurrency = currentCurrency === 'NGN' ? 'USD' : 'NGN';
  var pill = document.getElementById('currency-pill');
  var ngn  = document.getElementById('curr-label-ngn');
  var usd  = document.getElementById('curr-label-usd');
  if (currentCurrency === 'USD') {
    pill.classList.add('usd'); ngn.style.color = ''; usd.style.color = 'var(--gold)';
  } else {
    pill.classList.remove('usd'); ngn.style.color = 'var(--gold)'; usd.style.color = '';
  }
  renderAllGrids();
  updateCartDisplay();
}
function fmtPrice(p) {
  return currentCurrency === 'NGN' ? '\u20A6' + p.priceNGN.toLocaleString() : '$' + p.priceUSD;
}

// ── NAVIGATION ──
function showPage(page) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  var el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.toggle('active', a.dataset.page === page);
  });
  window.scrollTo(0, 0);
  if (page === 'shop')    renderGrid('shop-grid',    products);
  if (page === 'fashion') renderGrid('fashion-grid', products.filter(function(p) { return p.category === 'fashion'; }));
  if (page === 'sports')  renderGrid('sports-grid',  products.filter(function(p) { return p.category === 'sports'; }));
  // Track last shop-type page so order success can return here
  if (['shop','fashion','sports','collections'].indexOf(page) > -1) lastShopPage = page;
}

// ── PRODUCT RENDERING ──
function productCard(p) {
  var tagHtml = p.tag ? '<div class="product-badge">' + (p.tag === 'new' ? 'New' : p.tag === 'limited' ? 'Limited' : p.tag) + '</div>' : '';
  var imgContent = p.imageUrl
    ? '<img src="' + p.imageUrl + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center" onerror="this.style.display=\'none\'" alt="' + p.name + '">'
    : '<span class="product-img-icon">' + LOGO_SVG('#0e1c38', 48) + '</span>';
  var sizeOpts = (p.sizes && p.sizes.indexOf('yr') > -1)
    ? '<option>2Y</option><option>4Y</option><option>6Y</option><option>8Y</option><option>10Y</option><option>12Y</option>'
    : '<option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>';
  return '<div class="product-card">' +
    tagHtml +
    '<div class="product-img">' +
      '<div class="product-img-bg" style="background:' + (p.imageUrl ? '#f5f0e8' : 'linear-gradient(135deg,' + p.color + '88,' + p.color + ')') + '"></div>' +
      imgContent +
      '<div class="product-actions">' +
        '<select class="size-select" id="size-' + p.id + '"><option value="">Size</option>' + sizeOpts + '</select>' +
        '<button class="add-cart-btn" onclick="addToCart(' + p.id + ')">Add to Bag</button>' +
        '<button class="wishlist-btn">\u2661</button>' +
      '</div>' +
    '</div>' +
    '<div class="product-info">' +
      '<div class="product-category">' + p.category + ' \u00B7 ' + (p.style || 'unisex') + '</div>' +
      '<div class="product-name">' + p.name + '</div>' +
      '<div class="product-sizes">' + p.sizes + '</div>' +
      '<div class="product-price">' + fmtPrice(p) + '</div>' +
    '</div>' +
  '</div>';
}

function renderGrid(id, items) {
  var el = document.getElementById(id);
  if (!el) return;
  var active = items.filter(function(p) { return (p.status || 'active') === 'active'; });
  el.innerHTML = active.map(productCard).join('');
}

function renderAllGrids() {
  var sg = document.getElementById('shop-grid');
  if (sg) renderGrid('shop-grid', products);
}

// ── FILTERS ──
function filterProducts(cat, btn) {
  document.querySelectorAll('#page-shop .filter-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  renderGrid('shop-grid', cat === 'all' ? products : cat === 'new' ? products.filter(function(p){return p.tag==='new';}) : products.filter(function(p){return p.category===cat;}));
}
function filterFashion(style, btn) {
  document.querySelectorAll('#page-fashion .filter-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  var base = products.filter(function(p){return p.category==='fashion';});
  renderGrid('fashion-grid', style === 'all' ? base : base.filter(function(p){return p.style===style;}));
}
function filterSports(act, btn) {
  document.querySelectorAll('#page-sports .filter-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  var base = products.filter(function(p){return p.category==='sports';});
  renderGrid('sports-grid', act === 'all' ? base : base.filter(function(p){return p.activity===act;}));
}

// ── CART ──
function addToCart(pid) {
  var p = products.find(function(x){return x.id===pid;});
  if (!p) return;
  var sizeEl = document.getElementById('size-' + pid);
  var size = sizeEl ? sizeEl.value : '';
  if (!size) { showToast('Please select a size'); return; }
  var ex = cart.find(function(c){return c.id===pid && c.size===size;});
  if (ex) { ex.qty++; } else { cart.push(Object.assign({}, p, {size:size, qty:1})); }
  updateCartDisplay();
  showToast(p.name + ' added to bag');
}

function updateCartDisplay() {
  var count = cart.reduce(function(s,i){return s+i.qty;}, 0);
  document.getElementById('cart-count').textContent = count;
  var list = document.getElementById('cart-items-list');
  var footer = document.getElementById('cart-footer');
  if (!list) return;
  if (!cart.length) {
    list.innerHTML = '<div class="cart-empty">Your bag is beautifully empty.</div>';
    if (footer) footer.style.display = 'none';
    return;
  }
  if (footer) footer.style.display = 'block';
  list.innerHTML = cart.map(function(item) {
    return '<div class="cart-item">' +
      '<div class="cart-item-img">' +
        (item.imageUrl
          ? '<img src="' + item.imageUrl + '" style="width:100%;height:100%;object-fit:cover;object-position:top center" onerror="this.style.display=\'none\'">'
          : LOGO_SVG('#0e1c38', 28)) +
      '</div>' +
      '<div class="cart-item-info">' +
        '<div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-size">Size: ' + item.size + ' &middot; Qty: ' + item.qty + '</div>' +
        '<div class="cart-item-price">' + (currentCurrency==='NGN' ? '\u20A6'+(item.priceNGN*item.qty).toLocaleString() : '$'+(item.priceUSD*item.qty)) + '</div>' +
      '</div></div>';
  }).join('');
  var total = currentCurrency === 'NGN'
    ? '\u20A6' + cart.reduce(function(s,i){return s+i.priceNGN*i.qty;},0).toLocaleString()
    : '$' + cart.reduce(function(s,i){return s+i.priceUSD*i.qty;},0);
  var te = document.getElementById('cart-total'); if (te) te.textContent = total;
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
  document.getElementById('cart-overlay').classList.toggle('visible');
}

// ── ADMIN AUTH ──
var adminAuth = false, loginAttempts = 0, lockoutUntil = 0, sessionTimer = null, sessionStart = null;
var MAX_ATT = 5, LOCKOUT_MIN = 10;

function sha256(msg) {
  var buf = new TextEncoder().encode(msg);
  return crypto.subtle.digest('SHA-256', buf).then(function(hash) {
    return Array.from(new Uint8Array(hash)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
  });
}

function openAdminLogin() {
  var now = Date.now();
  if (lockoutUntil > now) { showLockout(Math.ceil((lockoutUntil-now)/60000)); document.getElementById('admin-login-overlay').classList.add('open'); return; }
  if (adminAuth) { document.getElementById('admin-panel').classList.add('open'); populateAdmin(); return; }
  document.getElementById('admin-login-overlay').classList.add('open');
  document.getElementById('admin-error').classList.remove('show');
  document.getElementById('admin-lockout').classList.remove('show');
  updateAttText();
  setTimeout(function(){ var u=document.getElementById('admin-username'); if(u)u.focus(); }, 100);
}
function closeAdminLogin() {
  document.getElementById('admin-login-overlay').classList.remove('open');
  var u=document.getElementById('admin-username'); if(u)u.value='';
  var p=document.getElementById('admin-password'); if(p)p.value='';
  document.getElementById('admin-error').classList.remove('show');
}
function closeAdminPanel() { document.getElementById('admin-panel').classList.remove('open'); }

function showLockout(min) {
  var el=document.getElementById('admin-lockout');
  el.innerHTML='Too many failed attempts. Locked for <strong>'+min+' minute'+(min!==1?'s':'')+'</strong>.';
  el.classList.add('show');
  var b=document.getElementById('admin-login-btn'); if(b)b.disabled=true;
  var u=document.getElementById('admin-username');  if(u)u.disabled=true;
  var p=document.getElementById('admin-password');  if(p)p.disabled=true;
}
function updateAttText() {
  var el=document.getElementById('admin-attempts-text'); if(!el)return;
  if(!loginAttempts){el.textContent='';return;}
  var r=MAX_ATT-loginAttempts; el.textContent=r+' attempt'+(r!==1?'s':'')+' remaining';
}

function attemptLogin() {
  var now=Date.now();
  if(lockoutUntil>now){showLockout(Math.ceil((lockoutUntil-now)/60000));return;}
  var u=(document.getElementById('admin-username').value||'').trim();
  var p=document.getElementById('admin-password').value||'';
  if(!u||!p){
    document.getElementById('admin-error').textContent='Enter both username and password.';
    document.getElementById('admin-error').classList.add('show'); return;
  }
  var btn=document.getElementById('admin-login-btn');
  btn.disabled=true; btn.textContent='Verifying\u2026';
  setTimeout(function(){
    Promise.all([sha256(u.toLowerCase()), sha256(p), sha256('admin'), sha256('Manoshia@2025')]).then(function(hashes) {
      if(hashes[0]===hashes[2] && hashes[1]===hashes[3]) {
        loginAttempts=0;
        logAdminAction('AUTH', 'Password verified - awaiting MFA');
        btn.disabled=false; btn.style.display='none';
        var mfaPanel=document.getElementById('admin-mfa-panel');
        if(mfaPanel){mfaPanel.style.display='block';var mi=document.getElementById('admin-mfa-code');if(mi){mi.value='';setTimeout(function(){mi.focus();},100);}}
        pendingLoginUser={user:u,role:ADMIN_ROLE};
      } else {
        loginAttempts++;
        logAdminAction('SECURITY','Failed login attempt '+loginAttempts+'/'+MAX_ATT);
        document.getElementById('admin-error').textContent='Incorrect username or password.';
        document.getElementById('admin-error').classList.add('show');
        var pw=document.getElementById('admin-password'); if(pw)pw.value='';
        if(loginAttempts>=MAX_ATT) {
          lockoutUntil=Date.now()+LOCKOUT_MIN*60000; showLockout(LOCKOUT_MIN);
          setTimeout(function(){
            lockoutUntil=0; loginAttempts=0;
            var el=document.getElementById('admin-lockout'); if(el)el.classList.remove('show');
            var b=document.getElementById('admin-login-btn'); if(b){b.disabled=false;b.style.display='';b.textContent='Sign In to Dashboard';}
            var u2=document.getElementById('admin-username'); if(u2)u2.disabled=false;
            var p2=document.getElementById('admin-password'); if(p2)p2.disabled=false;
            updateAttText();
          }, LOCKOUT_MIN*60000);
        } else { btn.disabled=false; btn.textContent='Sign In to Dashboard'; updateAttText(); }
      }
    });
  }, 600);
}

function openDashboard() {
  document.getElementById('admin-panel').classList.add('open');
  sessionStart=new Date(); updateSessionBar();
  if(sessionTimer)clearInterval(sessionTimer);
  sessionTimer=setInterval(updateSessionBar,30000);
  startSessionExpiry();
  enforceRBAC();
  populateAdmin();
  logAdminAction('SESSION', 'Admin dashboard opened — role: ' + ADMIN_ROLE);
}
function updateSessionBar() {
  var el=document.getElementById('admin-session-time'); if(!el||!sessionStart)return;
  var diff=Math.floor((new Date()-sessionStart)/60000);
  el.textContent=diff===0?'Session started just now':'Active for '+diff+' min';
}
function adminLogout() {
  logAdminAction('SESSION', 'Admin logged out manually');
  adminAuth=false; mfaPassed=false; pendingLoginUser=null;
  clearInterval(sessionTimer); sessionTimer=null; sessionStart=null;
  if(sessionCheckInterval) clearInterval(sessionCheckInterval); sessionCheckInterval=null;
  sessionExpiry=null;
  document.getElementById('admin-panel').classList.remove('open');
  var u=document.getElementById('admin-username'); if(u)u.value='';
  var p=document.getElementById('admin-password'); if(p)p.value='';
  var err=document.getElementById('admin-error'); if(err)err.classList.remove('show');
  var btn=document.getElementById('admin-login-btn'); if(btn){btn.style.display='';btn.textContent='Sign In to Dashboard';}
  // Reset MFA panel
  var mfaPanel=document.getElementById('admin-mfa-panel'); if(mfaPanel)mfaPanel.style.display='none';
  var mfaInp=document.getElementById('admin-mfa-code'); if(mfaInp)mfaInp.value='';
  showToast('Logged out');
}

// ── ADMIN TABS ──
function showAdminTab(tab, el) {
  document.querySelectorAll('.admin-tab').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('.admin-nav-item').forEach(function(n){n.classList.remove('active');});
  var te=document.getElementById('admin-'+tab); if(te)te.classList.add('active');
  el.classList.add('active');
  if(tab==='products'){pmState.page=1;pmRender();}
  if(tab==='orders')    populateOrders();
  if(tab==='inventory')  populateInventory();
  if(tab==='customers')  populateCustomers();
  if(tab==='audit')      renderAuditLog();
}

function statusBadge(s) { return '<span class="status-badge status-'+s+'">'+s+'</span>'; }

// ── POPULATE ADMIN ──
function populateAdmin() {
  // Overview stats
  var active=products.filter(function(p){return (p.status||'active')==='active';}).length;
  var low=products.filter(function(p){return p.stock!==undefined&&p.stock<=15;}).length;
  var rev=orders.reduce(function(s,o){return s+o.total;},0);
  var sap=document.getElementById('stat-active-products'); if(sap)sap.textContent=active;
  var sls=document.getElementById('stat-low-stock');       if(sls)sls.textContent=low+' low stock';
  var srv=document.getElementById('stat-revenue');         if(srv)srv.textContent='\u20A6'+rev.toLocaleString();
  var sor=document.getElementById('stat-orders');          if(sor)sor.textContent=orders.length;

  populateOrders();
  populateInventory();
  populateCustomers();
  pmRender();
}

function populateOrders() {
  var q    = (document.getElementById('orders-search')||{value:''}).value.toLowerCase();
  var stat = (document.getElementById('orders-filter')||{value:''}).value;
  var filtered = orders.filter(function(o){
    var mq = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    return mq && (!stat || o.status===stat);
  });
  var rob=document.getElementById('recent-orders-body');
  if(rob) rob.innerHTML=filtered.slice(0,5).map(function(o){
    return '<tr><td>'+o.id+'</td><td>'+o.customer+'</td><td>'+o.items+'</td><td>\u20A6'+o.total.toLocaleString()+'</td><td>'+statusBadge(o.status)+'</td><td>'+o.date+'</td></tr>';
  }).join('');
  var aob=document.getElementById('all-orders-body');
  if(aob) aob.innerHTML=filtered.map(function(o){
    return '<tr><td>'+o.id+'</td><td>'+o.customer+'</td><td>'+o.items+'</td><td>\u20A6'+o.total.toLocaleString()+'</td><td>'+statusBadge(o.status)+'</td><td>'+o.date+'</td>' +
      '<td><button class="pm-act-btn" onclick="editOrder(\''+o.id+'\')">Edit</button></td></tr>';
  }).join('');
}

function editOrder(oid) {
  var o=orders.find(function(x){return x.id===oid;}); if(!o)return;
  var ns=prompt('New status for '+oid+' (processing/shipped/delivered):',o.status);
  if(ns && ['processing','shipped','delivered'].indexOf(ns)>-1) {
    o.status=ns; populateOrders(); showToast(oid+' updated to '+ns);
  }
}

function populateInventory() {
  var q   = (document.getElementById('inv-search')||{value:''}).value.toLowerCase();
  var cat = (document.getElementById('inv-filter')||{value:''}).value;
  var filtered=products.filter(function(p){
    var mq=!q||(p.sku||'').toLowerCase().includes(q)||(p.name||'').toLowerCase().includes(q);
    return mq&&(!cat||p.category===cat);
  });
  var ib=document.getElementById('inventory-body');
  if(!ib)return;
  ib.innerHTML=filtered.map(function(p){
    var total=p.stock||0, seed=p.id||1;
    var xs=Math.max(0,Math.round(total*0.12+(seed%3)));
    var s=Math.max(0,Math.round(total*0.22+(seed%5)));
    var m=Math.max(0,Math.round(total*0.28+(seed%4)));
    var l=Math.max(0,Math.round(total*0.25+(seed%3)));
    var xl=Math.max(0,total-xs-s-m-l);
    var low=total<=15, st=p.status||'active';
    return '<tr style="'+(st==='inactive'?'opacity:.45':'')+'">' +
      '<td><div style="font-size:13px">'+p.name+'</div><div style="font-size:9px;letter-spacing:.1em;color:var(--gold)">'+p.sku+'</div></td>' +
      '<td>'+p.category+'</td>' +
      '<td class="'+(xs<5?'stock-low':'stock-ok')+'">'+xs+'</td>' +
      '<td class="'+(s<5?'stock-low':'stock-ok')+'">'+s+'</td>' +
      '<td class="'+(m<5?'stock-low':'stock-ok')+'">'+m+'</td>' +
      '<td class="'+(l<5?'stock-low':'stock-ok')+'">'+l+'</td>' +
      '<td class="'+(xl<5?'stock-low':'stock-ok')+'">'+xl+'</td>' +
      '<td style="font-weight:500;color:'+(total<=5?'#f87171':total<=15?'#fbbf24':'#4ade80')+'">'+total+'</td>' +
      '<td>'+statusBadge(low?'processing':'delivered').replace('processing','Low').replace('delivered','Good')+'</td>' +
      '<td><button class="pm-act-btn" onclick="adjustStock('+p.id+')">Adjust</button></td>' +
    '</tr>';
  }).join('');
}

function adjustStock(pid) {
  var p=products.find(function(x){return x.id===pid;}); if(!p)return;
  var n=parseInt(prompt('New stock qty for '+p.name+' (SKU:'+p.sku+'):',p.stock));
  if(!isNaN(n)&&n>=0){p.stock=n;populateInventory();populateAdmin();showToast(p.name+': stock updated to '+n);}
}

// ── EXPORT ORDERS ──
function exportOrders(fmt) {
  var headers=['Order ID','Customer','Items','Total NGN','Status','Date'];
  var rows=orders.map(function(o){return [o.id,o.customer,o.items,o.total,o.status,o.date];});
  if(fmt==='csv') {
    var csv=[headers.join(',')].concat(rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');})).join('\n');
    dlFile(csv,'text/csv','klot_orders.csv');
  } else {
    if(typeof XLSX==='undefined'){showToast('Library loading...');return;}
    var ws=XLSX.utils.aoa_to_sheet([headers].concat(rows));
    ws['!cols']=headers.map(function(){return {wch:18};});
    var wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Orders');
    XLSX.writeFile(wb,'klot_orders_'+today()+'.xlsx');
    showToast('Orders exported to Excel');
  }
}

function exportInventory(fmt) {
  var headers=['SKU','Name','Category','XS','S','M','L','XL','Total','Status'];
  var rows=products.map(function(p){
    var total=p.stock||0, seed=p.id||1;
    var xs=Math.max(0,Math.round(total*0.12+(seed%3)));
    var s=Math.max(0,Math.round(total*0.22+(seed%5)));
    var m=Math.max(0,Math.round(total*0.28+(seed%4)));
    var l=Math.max(0,Math.round(total*0.25+(seed%3)));
    var xl=Math.max(0,total-xs-s-m-l);
    return [p.sku,p.name,p.category,xs,s,m,l,xl,total,(p.status||'active').toUpperCase()];
  });
  if(fmt==='csv') {
    var csv=[headers.join(',')].concat(rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');})).join('\n');
    dlFile(csv,'text/csv','klot_inventory.csv');
  } else {
    if(typeof XLSX==='undefined'){showToast('Library loading...');return;}
    var ws=XLSX.utils.aoa_to_sheet([headers].concat(rows));
    ws['!cols']=headers.map(function(){return {wch:16};});
    var wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Inventory');
    XLSX.writeFile(wb,'klot_inventory_'+today()+'.xlsx');
    showToast('Inventory exported to Excel');
  }
}

// ── IMPORT ORDERS/INVENTORY ──
function importOrders(e) {
  var file=e.target.files[0]; if(!file)return;
  var ext=file.name.split('.').pop().toLowerCase();
  if(ext==='csv'){
    var r=new FileReader(); r.onload=function(ev){parseOrderCSV(ev.target.result);}; r.readAsText(file);
  } else {
    var r2=new FileReader(); r2.onload=function(ev){parseOrderXLSX(ev.target.result);}; r2.readAsArrayBuffer(file);
  }
}
function parseOrderCSV(text) {
  var lines=text.split(/\r?\n/).filter(function(l){return l.trim();}); if(lines.length<2)return;
  var hdrs=lines[0].split(',').map(function(h){return h.replace(/"/g,'').trim().toLowerCase();});
  var imported=0;
  lines.slice(1).forEach(function(line){
    var vals=line.split(',').map(function(v){return v.replace(/"/g,'').trim();});
    var id=vals[hdrs.indexOf('order id')]||vals[hdrs.indexOf('id')]||vals[0];
    var cust=vals[hdrs.indexOf('customer')]||vals[1]||'';
    var total=parseFloat(vals[hdrs.indexOf('total ngn')]||vals[hdrs.indexOf('total')]||vals[3])||0;
    var status=vals[hdrs.indexOf('status')]||vals[4]||'processing';
    var date=vals[hdrs.indexOf('date')]||vals[5]||new Date().toLocaleDateString();
    var items=parseInt(vals[hdrs.indexOf('items')]||vals[2])||1;
    if(!id||!cust)return;
    var ex=orders.find(function(o){return o.id===id;});
    if(ex){Object.assign(ex,{customer:cust,items:items,total:total,status:status.toLowerCase(),date:date});}
    else{orders.push({id:id,customer:cust,items:items,total:total,status:status.toLowerCase(),date:date});}
    imported++;
  });
  populateOrders(); populateAdmin(); showToast('Imported '+imported+' orders');
}
function parseOrderXLSX(buf) {
  if(typeof XLSX==='undefined'){showToast('Library loading...');return;}
  var wb=XLSX.read(buf,{type:'array'}); var ws=wb.Sheets[wb.SheetNames[0]];
  var rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
  var hdrs=rows[0].map(function(h){return String(h).toLowerCase().trim();});
  var imported=0;
  rows.slice(1).forEach(function(row){
    var id=String(row[hdrs.indexOf('order id')]||row[hdrs.indexOf('id')]||row[0]||'').trim();
    var cust=String(row[hdrs.indexOf('customer')]||row[1]||'').trim();
    if(!id||!cust)return;
    var total=parseFloat(String(row[hdrs.indexOf('total ngn')]||row[hdrs.indexOf('total')]||row[3]).replace(/[^\d.]/g,''))||0;
    var status=String(row[hdrs.indexOf('status')]||row[4]||'processing').toLowerCase();
    var date=String(row[hdrs.indexOf('date')]||row[5]||new Date().toLocaleDateString());
    var items=parseInt(row[hdrs.indexOf('items')]||row[2])||1;
    var ex=orders.find(function(o){return o.id===id;});
    if(ex){Object.assign(ex,{customer:cust,items:items,total:total,status:status,date:date});}
    else{orders.push({id:id,customer:cust,items:items,total:total,status:status,date:date});}
    imported++;
  });
  populateOrders(); populateAdmin(); showToast('Imported '+imported+' orders from Excel');
}

function importInventory(e) {
  var file=e.target.files[0]; if(!file)return;
  var ext=file.name.split('.').pop().toLowerCase();
  if(ext==='csv'){var r=new FileReader();r.onload=function(ev){parseInvCSV(ev.target.result);};r.readAsText(file);}
  else{var r2=new FileReader();r2.onload=function(ev){parseInvXLSX(ev.target.result);};r2.readAsArrayBuffer(file);}
}
function parseInvCSV(text) {
  var lines=text.split(/\r?\n/).filter(function(l){return l.trim();}); if(lines.length<2)return;
  var hdrs=lines[0].split(',').map(function(h){return h.replace(/"/g,'').trim().toLowerCase();});
  var updated=0;
  lines.slice(1).forEach(function(line){
    var vals=line.split(',').map(function(v){return v.replace(/"/g,'').trim();});
    var sku=vals[hdrs.indexOf('sku')]||vals[0];
    var total=parseInt(vals[hdrs.indexOf('total')]||vals[hdrs.indexOf('stock')]||vals[8])||null;
    if(!sku)return;
    var p=products.find(function(x){return x.sku&&x.sku.toUpperCase()===sku.toUpperCase();});
    if(p&&total!==null){p.stock=total;updated++;}
  });
  populateInventory();populateAdmin();showToast('Updated '+updated+' stock levels');
}
function parseInvXLSX(buf) {
  if(typeof XLSX==='undefined'){showToast('Library loading...');return;}
  var wb=XLSX.read(buf,{type:'array'}); var ws=wb.Sheets[wb.SheetNames[0]];
  var rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:''});
  var hdrs=rows[0].map(function(h){return String(h).toLowerCase().trim();});
  var updated=0;
  rows.slice(1).forEach(function(row){
    var sku=String(row[hdrs.indexOf('sku')]||row[0]||'').trim();
    var total=parseInt(row[hdrs.indexOf('total')]||row[hdrs.indexOf('stock')]||row[8])||null;
    if(!sku||total===null)return;
    var p=products.find(function(x){return x.sku&&x.sku.toUpperCase()===sku.toUpperCase();});
    if(p){p.stock=total;updated++;}
  });
  populateInventory();populateAdmin();showToast('Updated '+updated+' stock levels from Excel');
}

// ── PRODUCT MANAGEMENT ──
var pmState={filtered:[],selected:new Set(),sortCol:'sku',sortDir:'asc',page:1,perPage:10};

function pmRender() {
  var q    =(document.getElementById('pm-search')||{value:''}).value.toLowerCase();
  var cat  =(document.getElementById('pm-filter-cat')||{value:''}).value;
  var stat =(document.getElementById('pm-filter-status')||{value:''}).value;
  pmState.filtered=products.filter(function(p){
    var mq=!q||(p.sku||'').toLowerCase().includes(q)||(p.name||'').toLowerCase().includes(q)||(p.category||'').toLowerCase().includes(q);
    return mq&&(!cat||p.category===cat)&&(!stat||(p.status||'active')===stat);
  });
  pmState.filtered.sort(function(a,b){
    var av=a[pmState.sortCol], bv=b[pmState.sortCol];
    if(typeof av==='number')return pmState.sortDir==='asc'?av-bv:bv-av;
    av=String(av||'').toLowerCase();bv=String(bv||'').toLowerCase();
    return pmState.sortDir==='asc'?av.localeCompare(bv):bv.localeCompare(av);
  });
  ['sku','name','category','priceNGN','priceUSD','stock'].forEach(function(col){
    var el=document.getElementById('sort-'+col); if(!el)return;
    el.textContent=col===pmState.sortCol?(pmState.sortDir==='asc'?'\u2191':'\u2193'):'\u2195';
    el.className='sort-icon'+(col===pmState.sortCol?' '+pmState.sortDir:'');
  });
  var total=pmState.filtered.length, pages=Math.max(1,Math.ceil(total/pmState.perPage));
  if(pmState.page>pages)pmState.page=pages;
  var start=(pmState.page-1)*pmState.perPage;
  var pageItems=pmState.filtered.slice(start,start+pmState.perPage);
  var tbody=document.getElementById('pm-tbody'); if(!tbody)return;
  tbody.innerHTML=pageItems.map(function(p){
    var ri=products.indexOf(p), sel=pmState.selected.has(ri);
    var st=p.status||'active', stk=p.stock!==undefined?p.stock:'';
    var stkCls=stk===''?'':stk<=5?'pm-stock-critical':stk<=15?'pm-stock-low':'pm-stock-ok';
    var tagHtml=p.tag?'<span class="pm-tag pm-tag-'+p.tag+'">'+p.tag+'</span>':'';
    var imgHtml=p.imageUrl?'<img src="'+p.imageUrl+'" class="pm-img-thumb" onerror="this.style.display=\'none\'">':'<div class="pm-img-none">\uD83D\uDDBC</div>';
    return '<tr class="'+(sel?'pm-sel':'')+'">' +
      '<td><input type="checkbox" class="pm-checkbox" onchange="pmToggleRow('+ri+',this)" '+(sel?'checked':'')+'/></td>' +
      '<td><span class="pm-sku">'+(p.sku||'ID-'+p.id)+'</span></td>' +
      '<td><div style="font-size:13px;color:var(--cream);max-width:180px;overflow:hidden;text-overflow:ellipsis">'+p.name+'</div>'+tagHtml+'</td>' +
      '<td style="text-transform:capitalize">'+p.category+'</td>' +
      '<td style="font-family:\'Cormorant Garamond\',serif;font-size:16px">\u20A6'+p.priceNGN.toLocaleString()+'</td>' +
      '<td style="font-family:\'Cormorant Garamond\',serif;font-size:16px">$'+p.priceUSD+'</td>' +
      '<td class="'+stkCls+'">'+stk+'</td>' +
      '<td><span class="pm-status-'+st+'" onclick="pmQuickStatus('+ri+')" title="Toggle"><span class="pm-dot '+st+'"></span>'+st.toUpperCase()+'</span></td>' +
      '<td>'+imgHtml+'</td>' +
      '<td><button class="pm-act-btn" onclick="pmOpenEdit('+ri+')">\u270E</button><button class="pm-act-btn del" onclick="pmDelete('+ri+')">\uD83D\uDDD1</button></td>' +
    '</tr>';
  }).join('');
  var ce=document.getElementById('pm-count'); if(ce)ce.textContent=total+' products'+(q||cat||stat?' (filtered)':'');
  var bb=document.getElementById('pm-bulk-bar'); if(bb)bb.classList.toggle('visible',pmState.selected.size>0);
  var bc=document.getElementById('pm-bulk-count'); if(bc)bc.textContent=pmState.selected.size+' selected';
  var ca=document.getElementById('pm-check-all');
  if(ca){var pi=pageItems.map(function(p){return products.indexOf(p);}); ca.checked=pi.length>0&&pi.every(function(i){return pmState.selected.has(i);}); ca.indeterminate=!ca.checked&&pi.some(function(i){return pmState.selected.has(i);});}
  pmRenderPagination(total,pages);
}

function pmRenderPagination(total,pages){
  var el=document.getElementById('pm-pagination'); if(!el)return;
  var start=(pmState.page-1)*pmState.perPage+1, end=Math.min(pmState.page*pmState.perPage,total);
  var btns='<button class="pm-page-btn" onclick="pmGoPage('+(pmState.page-1)+')" '+(pmState.page<=1?'disabled':'')+'>&#8592;</button>';
  for(var p=1;p<=pages;p++){btns+='<button class="pm-page-btn'+(p===pmState.page?' active':'')+'" onclick="pmGoPage('+p+')">'+p+'</button>';}
  btns+='<button class="pm-page-btn" onclick="pmGoPage('+(pmState.page+1)+')" '+(pmState.page>=pages?'disabled':'')+'>&#8594;</button>';
  el.innerHTML='<span class="pm-pagination-info">Showing '+(total?start:0)+'-'+end+' of '+total+'</span><div style="display:flex;gap:4px">'+btns+'</div>';
}

function pmSort(col){if(pmState.sortCol===col)pmState.sortDir=pmState.sortDir==='asc'?'desc':'asc';else{pmState.sortCol=col;pmState.sortDir='asc';}pmRender();}
function pmFilter(){pmState.page=1;pmRender();}
function pmGoPage(p){var pages=Math.ceil(pmState.filtered.length/pmState.perPage);if(p<1||p>pages)return;pmState.page=p;pmRender();}
function pmToggleRow(idx,cb){if(cb.checked)pmState.selected.add(idx);else pmState.selected.delete(idx);pmRender();}
function pmToggleAll(cb){var pi=pmState.filtered.slice((pmState.page-1)*pmState.perPage,pmState.page*pmState.perPage);pi.forEach(function(p){var i=products.indexOf(p);if(cb.checked)pmState.selected.add(i);else pmState.selected.delete(i);});pmRender();}
function pmClearSel(){pmState.selected.clear();pmRender();}
function pmQuickStatus(idx){if(!products[idx])return;products[idx].status=(products[idx].status||'active')==='active'?'inactive':'active';renderAllGrids();pmRender();showToast(products[idx].name+' -> '+products[idx].status.toUpperCase());}
function pmBulkStatus(s){pmState.selected.forEach(function(i){if(products[i])products[i].status=s;});renderAllGrids();pmRender();showToast(pmState.selected.size+' products set to '+s.toUpperCase());}
function pmBulkDelete(){var n=pmState.selected.size;if(!n||!confirm('Delete '+n+' products?'))return;Array.from(pmState.selected).sort(function(a,b){return b-a;}).forEach(function(i){products.splice(i,1);});pmState.selected.clear();renderAllGrids();populateAdmin();pmRender();showToast(n+' deleted');}
function pmDelete(idx){var p=products[idx];if(!p||!confirm('Delete "'+p.name+'"?'))return;products.splice(idx,1);pmState.selected.delete(idx);renderAllGrids();populateAdmin();pmRender();showToast('"'+p.name+'" deleted');}

function pmOpenEdit(idx){
  var p=products[idx]; if(!p)return;
  function g(id){return document.getElementById(id);}
  g('pm-modal-title').textContent='Edit Product';
  g('pm-modal-sku').textContent='SKU: '+(p.sku||'-')+' | ID: '+p.id;
  g('edit-index').value=idx; g('edit-sku').value=p.sku||''; g('edit-id').value=p.id;
  g('edit-name').value=p.name||''; g('edit-category').value=p.category||'fashion';
  g('edit-priceNGN').value=p.priceNGN||''; g('edit-priceUSD').value=p.priceUSD||'';
  g('edit-stock').value=p.stock!==undefined?p.stock:'';
  g('edit-tag').value=p.tag||''; g('edit-style').value=p.style||'unisex';
  g('edit-activity').value=p.activity||'training'; g('edit-sizes').value=p.sizes||'XS-XL';
  g('edit-color').value=p.color||'#1a2d42'; g('edit-color-picker').value=p.color||'#1a2d42';
  g('edit-imageUrl').value=p.imageUrl||''; g('edit-description').value=p.description||'';
  g('pm-char-count').textContent=(p.description||'').length+' / 500'; g('pm-val-msg').textContent='';
  var st=p.status||'active'; g('edit-status').value=st; pmSetStatusUI(st);
  pmPreviewImg(p.imageUrl||'');
  g('edit-description').oninput=function(){g('pm-char-count').textContent=this.value.length+' / 500';};
  g('pm-modal-overlay').classList.add('open');
}
function pmSetStatusUI(s){
  var pill=document.getElementById('pm-status-pill'), lbl=document.getElementById('pm-status-lbl');
  if(!pill||!lbl)return; pill.className='pm-pill '+s; lbl.className='pm-status-lbl '+s; lbl.textContent=s.toUpperCase();
}
function pmToggleStatus(){var inp=document.getElementById('edit-status');var ns=inp.value==='active'?'inactive':'active';inp.value=ns;pmSetStatusUI(ns);}
function pmCloseModal(e){if(e&&e.target!==document.getElementById('pm-modal-overlay'))return;document.getElementById('pm-modal-overlay').classList.remove('open');}
function pmPreviewImg(url){
  var wrap=document.getElementById('pm-img-preview'), stat=document.getElementById('pm-img-status');
  if(!wrap)return;
  if(!url){wrap.innerHTML='<span style="font-size:18px;opacity:.3">\uD83D\uDDBC</span>';if(stat)stat.textContent='';return;}
  var img=new Image();
  img.onload=function(){wrap.innerHTML='<img src="'+url+'" style="width:100%;height:100%;object-fit:cover">';if(stat)stat.innerHTML='<span class="pm-img-ok">\u2713 Loaded</span>';};
  img.onerror=function(){wrap.innerHTML='<span style="font-size:18px;color:#f87171;opacity:.6">\uD83D\uDDBC</span>';if(stat)stat.innerHTML='<span class="pm-img-err">\u2717 Cannot load</span>';};
  img.src=url;
}
function pmSyncColor(){var h=document.getElementById('edit-color').value;if(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(h))document.getElementById('edit-color-picker').value=h;}
function pmPickColor(){document.getElementById('edit-color').value=document.getElementById('edit-color-picker').value;}
function pmSave(){
  var idx=parseInt(document.getElementById('edit-index').value), p=products[idx];
  var vm=document.getElementById('pm-val-msg'); if(!p){vm.textContent='Not found';return;}
  var name=document.getElementById('edit-name').value.trim();
  var cat=document.getElementById('edit-category').value;
  var ngn=parseFloat(document.getElementById('edit-priceNGN').value);
  var usd=parseFloat(document.getElementById('edit-priceUSD').value);
  var stk=parseInt(document.getElementById('edit-stock').value);
  var img=document.getElementById('edit-imageUrl').value.trim();
  var col=document.getElementById('edit-color').value.trim();
  if(!name){vm.textContent='Name required';return;}
  if(isNaN(ngn)||ngn<=0){vm.textContent='Invalid NGN price';return;}
  if(isNaN(usd)||usd<=0){vm.textContent='Invalid USD price';return;}
  if(isNaN(stk)||stk<0){vm.textContent='Invalid stock';return;}
  if(img&&!/^(https?:\/\/\S+|assets\/[^\s]+\.(svg|png|jpg|jpeg|webp|gif))$/i.test(img)){vm.textContent='Invalid image URL';return;}
  products[idx]=Object.assign({},p,{name:name,category:cat,priceNGN:Math.round(ngn),priceUSD:parseFloat(usd.toFixed(2)),stock:stk,
    status:document.getElementById('edit-status').value,
    tag:document.getElementById('edit-tag').value,
    style:document.getElementById('edit-style').value,
    activity:document.getElementById('edit-activity').value,
    sizes:document.getElementById('edit-sizes').value.trim()||p.sizes,
    color:col||p.color,imageUrl:img,
    description:document.getElementById('edit-description').value.trim()
  });
  vm.textContent=''; document.getElementById('pm-modal-overlay').classList.remove('open');
  renderAllGrids(); populateAdmin(); pmRender(); showToast('"'+name+'" updated');
}

function pmExportExcel(){
  if(typeof XLSX==='undefined'){showToast('Loading...');return;}
  var data=(pmState.filtered.length?pmState.filtered:products).map(function(p){
    return {'SKU':p.sku||'','ID':p.id,'Name':p.name,'Category':p.category,'Style':p.style||'',
      'Price_NGN':p.priceNGN,'Price_USD':p.priceUSD,'Stock':p.stock!==undefined?p.stock:'',
      'Status':(p.status||'active').toUpperCase(),'Tag':p.tag||'','Sizes':p.sizes||'',
      'Image_URL':p.imageUrl||'','Description':p.description||''};
  });
  var ws=XLSX.utils.json_to_sheet(data);
  ws['!cols']=[{wch:12},{wch:6},{wch:28},{wch:12},{wch:10},{wch:14},{wch:12},{wch:8},{wch:10},{wch:8},{wch:10},{wch:40},{wch:40}];
  var wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Products');
  XLSX.writeFile(wb,'klot_products_'+today()+'.xlsx'); showToast('Products exported');
}
function pmExportCSV(){
  var data=pmState.filtered.length?pmState.filtered:products;
  var hdrs='SKU,ID,Name,Category,Style,Price_NGN,Price_USD,Stock,Status,Tag,Sizes,Image_URL,Description';
  var rows=data.map(function(p){return [p.sku||'',p.id,'"'+(p.name||'').replace(/"/g,'""')+'"',p.category,p.style||'',p.priceNGN,p.priceUSD,p.stock!==undefined?p.stock:'',(p.status||'active').toUpperCase(),p.tag||'',p.sizes||'','"'+(p.imageUrl||'').replace(/"/g,'""')+'"','"'+(p.description||'').replace(/"/g,'""')+'"'].join(',');});
  dlFile([hdrs].concat(rows).join('\n'),'text/csv','klot_products_'+today()+'.csv');
  showToast('Products exported to CSV');
}

// ── IMPORT ENGINE ──
var imp={rawRows:[],headers:[],colMap:{},validated:[],errorLog:[],fileType:'',fileName:''};

function handleDragOver(e){e.preventDefault();document.getElementById('drop-zone').classList.add('drag-over');}
function handleDragLeave(){document.getElementById('drop-zone').classList.remove('drag-over');}
function handleDrop(e){e.preventDefault();document.getElementById('drop-zone').classList.remove('drag-over');if(e.dataTransfer.files[0])processImportFile(e.dataTransfer.files[0]);}
function handleFileSelect(e){if(e.target.files[0])processImportFile(e.target.files[0]);}

function processImportFile(file){
  var ext=file.name.split('.').pop().toLowerCase();
  if(['xlsx','xls','csv'].indexOf(ext)<0){showToast('Use .xlsx or .csv');return;}
  imp.fileName=file.name; imp.fileType=ext;
  document.getElementById('file-selected-name').textContent=file.name;
  document.getElementById('file-selected-size').textContent=(file.size<1048576?(file.size/1024).toFixed(1)+' KB':(file.size/1048576).toFixed(1)+' MB');
  document.getElementById('file-selected').classList.add('show');
  var r=new FileReader();
  if(ext==='csv'){r.onload=function(e){parseImpCSV(e.target.result);};r.readAsText(file);}
  else{r.onload=function(e){parseImpXLSX(e.target.result);};r.readAsArrayBuffer(file);}
}
function parseImpXLSX(buf){try{if(typeof XLSX==='undefined'){showToast('Library not ready');return;}var wb=XLSX.read(buf,{type:'array'});var rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,defval:''});if(rows.length<2){showToast('Empty file');return;}finishImpParse(rows);}catch(err){showToast('Excel error: '+err.message);}}
function parseImpCSV(text){try{var lines=text.split(/\r?\n/).filter(function(l){return l.trim();});if(lines.length<2){showToast('Empty CSV');return;}var rows=lines.map(function(line){var res=[],cur='',inQ=false;for(var i=0;i<line.length;i++){var c=line[i];if(c==='"')inQ=!inQ;else if(c===','&&!inQ){res.push(cur.trim());cur='';}else cur+=c;}res.push(cur.trim());return res;});finishImpParse(rows);}catch(err){showToast('CSV error: '+err.message);}}

var FIELD_ALIASES={sku:['sku','productid','id','code'],name:['name','productname','title'],category:['category','cat','type'],priceNGN:['pricengn','naira','ngn'],priceUSD:['priceusd','usd','dollar'],style:['style','gender'],sizes:['sizes','size'],tag:['tag','badge'],imageUrl:['imageurl','image','img','photo'],description:['description','desc'],color:['color','colour','hex'],activity:['activity','sport'],stock:['stock','qty','quantity','inventory'],status:['status','active']};

function finishImpParse(rows){
  imp.headers=rows[0].map(function(h){return String(h).trim();});
  imp.rawRows=rows.slice(1).filter(function(r){return r.some(function(c){return String(c).trim();});});
  var auto={};
  imp.headers.forEach(function(h,i){
    var n=h.toLowerCase().replace(/[^a-z0-9]/g,'');
    Object.keys(FIELD_ALIASES).forEach(function(field){
      if(FIELD_ALIASES[field].indexOf(n)>-1)auto[field]=i;
    });
  });
  imp.colMap={};
  var defs=[{k:'sku',l:'SKU',r:true},{k:'name',l:'Name',r:true},{k:'category',l:'Category',r:true},{k:'priceNGN',l:'Price NGN',r:true},{k:'priceUSD',l:'Price USD',r:true},{k:'style',l:'Style',r:false},{k:'sizes',l:'Sizes',r:false},{k:'tag',l:'Tag',r:false},{k:'imageUrl',l:'Image URL',r:false},{k:'description',l:'Description',r:false},{k:'color',l:'Colour',r:false},{k:'activity',l:'Activity',r:false},{k:'stock',l:'Stock',r:false},{k:'status',l:'Status',r:false}];
  var grid=document.getElementById('mapping-grid');
  if(!grid)return;
  grid.innerHTML=defs.map(function(f){
    imp.colMap[f.k]=auto[f.k]!==undefined?auto[f.k]:null;
    var opts='<option value="">skip</option>'+imp.headers.map(function(h,i){return '<option value="'+i+'"'+(auto[f.k]===i?' selected':'')+'>'+h+'</option>';}).join('');
    return '<div class="mapping-row"><span class="mapping-label">'+f.l+(f.r?'<span class="mapping-required">*</span>':'')+'</span><select class="mapping-select" data-field="'+f.k+'" onchange="updColMap(this)">'+opts+'</select></div>';
  }).join('');
  document.getElementById('mapping-card').style.display='block';
  document.getElementById('template-guide').style.display='none';
  document.getElementById('validation-panel').classList.remove('show');
  document.getElementById('import-success').classList.remove('show');
  showToast('Loaded '+imp.rawRows.length+' rows');
}
function updColMap(sel){imp.colMap[sel.dataset.field]=sel.value!==''?parseInt(sel.value):null;}
function impCell(row,f){var idx=imp.colMap[f];if(idx===null||idx===undefined)return '';return String(row[idx]!==undefined?row[idx]:'').trim();}

function runValidation(){
  var miss=['sku','name','category','priceNGN','priceUSD'].filter(function(f){return imp.colMap[f]===null||imp.colMap[f]===undefined;});
  if(miss.length){alert('Map required columns: '+miss.join(', '));return;}
  imp.errorLog=[];
  var seenSKU=new Set(), validated=[], stats={total:0,newP:0,upd:0,skip:0,err:0};
  imp.rawRows.forEach(function(row,i){
    var rn=i+2, errs=[], warns=[], parsed={};
    var sku=impCell(row,'sku');
    if(!sku)errs.push({f:'sku',m:'Missing SKU'});
    else if(!/^[A-Za-z0-9\-_]{2,30}$/.test(sku))errs.push({f:'sku',m:'Invalid SKU: '+sku});
    else if(seenSKU.has(sku.toUpperCase()))warns.push({f:'sku',m:'Duplicate SKU in file'});
    else{seenSKU.add(sku.toUpperCase());parsed.sku=sku.toUpperCase();}
    var name=impCell(row,'name');
    if(!name)errs.push({f:'name',m:'Missing name'});else parsed.name=name.slice(0,120);
    var cat=impCell(row,'category').toLowerCase();
    if(!cat)errs.push({f:'category',m:'Missing category'});
    else if(['fashion','sports','kids'].indexOf(cat)<0)errs.push({f:'category',m:'Invalid category: '+cat});
    else parsed.category=cat;
    var rawN=impCell(row,'priceNGN').replace(/[^\d.]/g,''), rawU=impCell(row,'priceUSD').replace(/[^\d.]/g,'');
    var ngn=parseFloat(rawN), usd=parseFloat(rawU);
    if(!rawN||isNaN(ngn)||ngn<=0)errs.push({f:'priceNGN',m:'Invalid NGN price'});else parsed.priceNGN=Math.round(ngn);
    if(!rawU||isNaN(usd)||usd<=0)errs.push({f:'priceUSD',m:'Invalid USD price'});else parsed.priceUSD=parseFloat(usd.toFixed(2));
    parsed.style=impCell(row,'style').toLowerCase()||'unisex';
    parsed.sizes=impCell(row,'sizes')||'XS-XL';
    var tag=impCell(row,'tag').toLowerCase(); parsed.tag=['new','limited','sale'].indexOf(tag)>-1?tag:'';
    parsed.imageUrl=impCell(row,'imageUrl');
    parsed.description=impCell(row,'description').slice(0,500);
    var col=impCell(row,'color'); parsed.color=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(col)?col:'#1a2d42';
    var act=impCell(row,'activity').toLowerCase(); parsed.activity=['running','training','yoga'].indexOf(act)>-1?act:'training';
    var stk=parseInt(impCell(row,'stock')); parsed.stock=!isNaN(stk)&&stk>=0?stk:0;
    var st=impCell(row,'status').toLowerCase(); parsed.status=['active','inactive'].indexOf(st)>-1?st:'active';
    var status;
    if(errs.length){status='error';stats.err++;errs.forEach(function(e){imp.errorLog.push({row:rn,sku:sku||'-',field:e.f,msg:e.m,level:'error'});});}
    else if(!parsed.sku){status='skip';stats.skip++;}
    else{var ei=products.findIndex(function(p){return p.sku&&p.sku.toUpperCase()===parsed.sku;});if(ei>=0){status='update';stats.upd++;parsed._ei=ei;}else{status='new';stats.newP++;parsed.id=products.length+validated.filter(function(r){return r._st==='new';}).length+1;}}
    stats.total++;
    warns.forEach(function(w){imp.errorLog.push({row:rn,sku:sku||'-',field:w.f,msg:w.m,level:'warning'});});
    validated.push(Object.assign({},parsed,{_st:status,_rn:rn,_errs:errs,_warns:warns}));
  });
  imp.validated=validated;
  renderValUI(validated,stats);
}

function renderValUI(rows,st){
  ['stat-total','stat-new','stat-update','stat-skip','stat-error'].forEach(function(id,i){var el=document.getElementById(id);if(el)el.textContent=[st.total,st.newP,st.upd,st.skip,st.err][i];});
  var errRows=rows.filter(function(r){return r._st==='error';}), warnRows=rows.filter(function(r){return r._warns&&r._warns.length&&r._st!=='error';}), okRows=rows.filter(function(r){return r._st==='new'||r._st==='update';});
  var eS=document.getElementById('val-errors-section'), wS=document.getElementById('val-warnings-section'), oS=document.getElementById('val-ok-section');
  if(eS){eS.style.display=errRows.length?'block':'none';var el=document.getElementById('val-errors-list');if(el)el.innerHTML=errRows.slice(0,12).map(function(r){return r._errs.map(function(e){return '<div class="val-item-error">Row '+r._rn+' ['+e.f+'] '+esc(e.m)+'</div>';}).join('');}).join('')+(errRows.length>12?'<div class="val-item-error">...and '+(errRows.length-12)+' more</div>':'');}
  if(wS){wS.style.display=warnRows.length?'block':'none';var el2=document.getElementById('val-warnings-list');if(el2)el2.innerHTML=warnRows.slice(0,10).map(function(r){return r._warns.map(function(w){return '<div class="val-item-warning">Row '+r._rn+' ['+w.f+'] '+esc(w.m)+'</div>';}).join('');}).join('');}
  if(oS){oS.style.display=okRows.length?'block':'none';var el3=document.getElementById('val-ok-list');if(el3)el3.innerHTML='<div class="val-item-ok">'+st.newP+' new + '+st.upd+' updates ready</div>';}
  var BADGE={new:'<span class="badge-new">New</span>',update:'<span class="badge-update">Update</span>',error:'<span class="badge-error">Error</span>',skip:'<span class="badge-skip">Skip</span>'};
  var cols=['_st','sku','name','category','priceNGN','priceUSD','stock','status'];
  var th=document.getElementById('preview-thead'), tb=document.getElementById('preview-tbody');
  if(th)th.innerHTML='<tr>'+cols.map(function(c){return '<th>'+(c==='_st'?'Status':c)+'</th>';}).join('')+'</tr>';
  if(tb)tb.innerHTML=rows.slice(0,50).map(function(r){return '<tr class="row-'+r._st+'">'+cols.map(function(c){return '<td>'+(c==='_st'?(BADGE[r._st]||r._st):(r[c]!==undefined?esc(String(r[c])):'<span style="opacity:.25">-</span>'))+'</td>';}).join('')+'</tr>';}).join('');
  var eb=document.getElementById('btn-export-errors'); if(eb)eb.style.display=imp.errorLog.length?'inline-block':'none';
  var cb=document.getElementById('btn-confirm-import'); if(cb)cb.disabled=(st.newP+st.upd)===0;
  var vp=document.getElementById('validation-panel'); if(vp)vp.classList.add('show');
  document.getElementById('import-success').classList.remove('show');
  showToast('Validation: '+(st.newP+st.upd)+' ready, '+st.err+' errors');
}

function confirmImport(){
  var ready=imp.validated.filter(function(r){return r._st==='new'||r._st==='update';});
  if(!ready.length){showToast('Nothing to import');return;}
  var btn=document.getElementById('btn-confirm-import'); if(btn)btn.disabled=true;
  var pw=document.getElementById('import-progress-wrap'), fill=document.getElementById('progress-fill'), pct=document.getElementById('progress-pct'), lbl=document.getElementById('progress-label-text');
  if(pw)pw.classList.add('show');
  var postErrs=[], total=ready.length, i=0;
  function doNext(){
    if(i>=total){
      if(pw)pw.classList.remove('show');
      if(postErrs.length){var pe=document.getElementById('post-error-section');if(pe)pe.style.display='block';var el=document.getElementById('error-log');if(el)el.innerHTML=postErrs.map(function(e){return '<div class="error-log-item"><span class="error-log-row">Row '+e.row+'</span><div class="error-log-msg">'+esc(e.msg)+'</div></div>';}).join('');}
      renderAllGrids();populateAdmin();
      var nc=ready.filter(function(r){return r._st==='new';}).length, uc=ready.filter(function(r){return r._st==='update';}).length;
      var sm=document.getElementById('import-success-msg'); if(sm)sm.textContent=nc+' created, '+uc+' updated';
      var succ=document.getElementById('import-success'); if(succ)succ.classList.add('show');
      if(btn)btn.disabled=false;
      showToast('Import done: '+(nc+uc)+' synced');
      return;
    }
    var row=ready[i++];
    var p=Math.round((i/total)*100);
    if(fill)fill.style.width=p+'%'; if(pct)pct.textContent=p+'%'; if(lbl)lbl.textContent='Processing '+i+'/'+total+': '+(row.name||row.sku);
    try{
      var pd={id:row._ei!==undefined?products[row._ei].id:products.length+1,sku:row.sku,name:row.name,category:row.category,priceNGN:row.priceNGN,priceUSD:row.priceUSD,style:row.style||'unisex',sizes:row.sizes||'XS-XL',tag:row.tag||'',imageUrl:row.imageUrl||'',description:row.description||'',color:row.color||'#1a2d42',activity:row.activity||'training',stock:row.stock||0,status:row.status||'active'};
      if(row._st==='update'&&row._ei!==undefined)Object.assign(products[row._ei],pd);
      else products.push(pd);
    }catch(err){postErrs.push({row:row._rn,sku:row.sku||'-',msg:err.message});}
    setTimeout(doNext,10);
  }
  doNext();
}

function resetImport(){
  imp={rawRows:[],headers:[],colMap:{},validated:[],errorLog:[],fileType:'',fileName:''};
  var fi=document.getElementById('file-input'); if(fi)fi.value='';
  document.getElementById('file-selected').classList.remove('show');
  document.getElementById('mapping-card').style.display='none';
  document.getElementById('validation-panel').classList.remove('show');
  var pw=document.getElementById('import-progress-wrap'); if(pw)pw.classList.remove('show');
  document.getElementById('import-success').classList.remove('show');
  var pe=document.getElementById('post-error-section'); if(pe)pe.style.display='none';
  document.getElementById('template-guide').style.display='block';
}
function exportErrorLog(){
  if(!imp.errorLog.length)return;
  dlFile(['Row,SKU,Field,Level,Message'].concat(imp.errorLog.map(function(e){return [e.row,e.sku,e.field,e.level,'"'+(e.msg||'').replace(/"/g,'""')+'"'].join(',');})).join('\n'),'text/csv','klot_import_errors.csv');
}
function downloadTemplate(){
  if(typeof XLSX==='undefined'){showToast('Loading...');return;}
  var data=[['sku','name','category','priceNGN','priceUSD','style','sizes','tag','imageUrl','description','color','activity','stock','status'],['MN-021','Example Jacket','fashion',89000,55,'unisex','XS-XL','new','https://example.com/img.jpg','A luxury jacket.','#1a2d42','training',50,'active'],['MN-022','Example Jogger','fashion',65000,40,'unisex','XS-XL','','','','#e8e0d0','training',30,'active']];
  var ws=XLSX.utils.aoa_to_sheet(data); ws['!cols']=data[0].map(function(){return {wch:20};});
  var wb=XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'Products');
  XLSX.writeFile(wb,'klot_template.xlsx'); showToast('Template downloaded');
}

// ── UTILITIES ──
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function today(){return new Date().toISOString().split('T')[0];}
function dlFile(content,type,name){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type:type}));a.download=name;a.click();URL.revokeObjectURL(a.href);}

function showToast(msg){
  var t=document.getElementById('toast'); if(!t)return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},3000);
}




// ── CUSTOMERS DATA ──
// Seeded with demo customers; new customers added on each Paystack payment
var customers = [
  {name:'Amara Okafor',    email:'amara&#64;example.com',   phone:'+234 802 111 2233', orders:8,  total:320000, lastOrder:'Nov 12 2025', location:'Lagos',        status:'vip'},
  {name:'Emeka Nwosu',     email:'emeka&#64;example.com',   phone:'+234 803 222 3344', orders:5,  total:210000, lastOrder:'Nov 12 2025', location:'Abuja',        status:'active'},
  {name:'Fatima Al-Hassan',email:'fatima&#64;example.com',  phone:'+234 805 333 4455', orders:12, total:580000, lastOrder:'Nov 11 2025', location:'Kano',         status:'vip'},
  {name:'Chidera Eze',     email:'chidera&#64;example.com', phone:'+234 806 444 5566', orders:3,  total:145000, lastOrder:'Nov 11 2025', location:'Port Harcourt',status:'active'},
  {name:'Ngozi Williams',  email:'ngozi&#64;example.com',   phone:'+234 807 555 6677', orders:9,  total:410000, lastOrder:'Nov 10 2025', location:'Lagos',        status:'vip'},
  {name:'Ibrahim Musa',    email:'ibrahim&#64;example.com', phone:'+234 809 666 7788', orders:6,  total:265000, lastOrder:'Nov 10 2025', location:'Kaduna',       status:'active'}
];

function populateCustomers() {
  var q = (document.getElementById('cust-search') || {value:''}).value.toLowerCase();
  var filtered = customers.filter(function(c) {
    return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  // Sort: VIP first, then by total desc
  filtered.sort(function(a, b) {
    if (a.status === 'vip' && b.status !== 'vip') return -1;
    if (b.status === 'vip' && a.status !== 'vip') return  1;
    return b.total - a.total;
  });

  var ce = document.getElementById('cust-count');
  if (ce) ce.textContent = customers.length + ' customer' + (customers.length !== 1 ? 's' : '');

  var tbody = document.getElementById('customers-body');
  var empty = document.getElementById('cust-empty');
  if (!tbody) return;

  if (!filtered.length) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  tbody.innerHTML = filtered.map(function(c) {
    var statusHtml = c.status === 'vip'
      ? '<span style="display:inline-flex;align-items:center;gap:4px;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#fbbf24">&#9733; VIP</span>'
      : '<span style="font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(74,222,128,.7)">Active</span>';
    return '<tr>' +
      '<td style="color:var(--cream)">' + c.name + '</td>' +
      '<td style="font-size:12px">' + c.email + '</td>' +
      '<td style="font-size:12px">' + (c.phone || '&mdash;') + '</td>' +
      '<td style="text-align:center">' + c.orders + '</td>' +
      '<td style="font-family:var(--font-serif,serif);font-size:16px">&#8358;' + c.total.toLocaleString() + '</td>' +
      '<td style="font-size:12px">' + (c.lastOrder || '&mdash;') + '</td>' +
      '<td style="font-size:12px">' + (c.location || '&mdash;') + '</td>' +
      '<td>' + statusHtml + '</td>' +
    '</tr>';
  }).join('');
}

function addOrUpdateCustomer(customerData, orderTotal) {
  // customerData = {firstName, lastName, email, phone, city, state}
  var fullName = customerData.firstName + ' ' + customerData.lastName;
  var location = [customerData.city, customerData.state].filter(Boolean).join(', ') || 'Nigeria';
  var today    = new Date().toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'});

  // Check if customer already exists by email
  var existing = customers.find(function(c) {
    return c.email.toLowerCase() === customerData.email.toLowerCase();
  });

  if (existing) {
    existing.orders++;
    existing.total    += orderTotal;
    existing.lastOrder = today;
    if (existing.location === 'Nigeria' && location !== 'Nigeria') existing.location = location;
    if (existing.orders >= 5) existing.status = 'vip';
  } else {
    customers.unshift({
      name:      fullName,
      email:     customerData.email,
      phone:     customerData.phone || '',
      orders:    1,
      total:     orderTotal,
      lastOrder: today,
      location:  location,
      status:    'active'
    });
  }
  populateCustomers();
}

function exportCustomers(fmt) {
  var headers = ['Name','Email','Phone','Orders','Total Spent (NGN)','Last Order','Location','Status'];
  var rows = customers.map(function(c) {
    return [c.name, c.email, c.phone || '', c.orders, c.total, c.lastOrder || '', c.location || '', c.status.toUpperCase()];
  });
  if (fmt === 'csv') {
    var csv = [headers.join(',')].concat(rows.map(function(r) {
      return r.map(function(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(',');
    })).join('\n');
    dlFile(csv, 'text/csv', 'klot_customers_' + today() + '.csv');
    showToast('Customers exported to CSV');
  } else {
    if (typeof XLSX === 'undefined') { showToast('Loading...'); return; }
    var ws = XLSX.utils.aoa_to_sheet([headers].concat(rows));
    ws['!cols'] = headers.map(function() { return {wch:20}; });
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    XLSX.writeFile(wb, 'klot_customers_' + today() + '.xlsx');
    showToast('Customers exported to Excel');
  }
}

// ══════════════════════════════════════════════
//  PAYSTACK CHECKOUT
// ══════════════════════════════════════════════

// Replace with your actual Paystack public key
var PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

function openCheckout() {
  if (!cart.length) { showToast('Your bag is empty'); return; }
  toggleCart(); // close cart sidebar

  // Populate order summary
  var list = document.getElementById('checkout-items-list');
  if (list) {
    list.innerHTML = cart.map(function(item) {
      var imgHtml = item.imageUrl
        ? '<img src="' + item.imageUrl + '" style="width:100%;height:100%;object-fit:cover" onerror="this.onerror=null;this.style.display=\'none\'">' 
        : '<svg viewBox="0 0 60 70" fill="none" style="width:22px;opacity:.3"><rect x="0" y="0" width="17" height="28" fill="#f5f0e8"/><rect x="0" y="32" width="17" height="38" fill="#f5f0e8"/><rect x="21.5" y="10" width="17" height="18" fill="#f5f0e8"/><rect x="21.5" y="32" width="17" height="38" fill="#f5f0e8"/><rect x="43" y="0" width="17" height="28" fill="#f5f0e8"/><rect x="43" y="32" width="17" height="38" fill="#f5f0e8"/></svg>';
      var lineTotal = currentCurrency === 'NGN'
        ? '₦' + (item.priceNGN * item.qty).toLocaleString()
        : '$' + (item.priceUSD * item.qty).toFixed(2);
      return '<div class="co-item">' +
        '<div class="co-item-img">' + imgHtml + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div class="co-item-name">' + item.name + '</div>' +
          '<div class="co-item-meta">Size: ' + item.size + ' &nbsp;&middot;&nbsp; Qty: ' + item.qty + '</div>' +
        '</div>' +
        '<div class="co-item-price">' + lineTotal + '</div>' +
      '</div>';
    }).join('');
  }

  // Grand total
  var totalNGN = cart.reduce(function(s,i) { return s + i.priceNGN * i.qty; }, 0);
  var totalUSD = cart.reduce(function(s,i) { return s + i.priceUSD * i.qty; }, 0);
  var grandEl = document.getElementById('checkout-grand-total');
  if (grandEl) grandEl.textContent = currentCurrency === 'NGN'
    ? '₦' + totalNGN.toLocaleString()
    : '$' + totalUSD.toFixed(2);

  // Currency note — Paystack charges in NGN, show USD equivalent info
  var noteEl = document.getElementById('co-currency-note');
  if (noteEl) {
    if (currentCurrency === 'USD') {
      noteEl.textContent = 'Payment processed in NGN (₦' + totalNGN.toLocaleString() + '). USD displayed for reference only.';
      noteEl.classList.add('show');
    } else {
      noteEl.classList.remove('show');
    }
  }

  // Update pay button label
  updatePayLabel();

  // Clear errors
  var errEl = document.getElementById('checkout-error'); if (errEl) errEl.textContent = '';

  document.getElementById('checkout-overlay').classList.add('open');
  setTimeout(function() { var el=document.getElementById('co-firstname'); if(el)el.focus(); }, 200);
}

function closeCheckout(e) {
  if (e && e.target !== document.getElementById('checkout-overlay')) return;
  closeCheckoutDirect();
}
function closeCheckoutDirect() {
  document.getElementById('checkout-overlay').classList.remove('open');
}

function updatePayLabel() {
  var totalNGN = cart.reduce(function(s,i) { return s + i.priceNGN * i.qty; }, 0);
  var el = document.getElementById('checkout-pay-label');
  if (el) el.textContent = 'Pay ₦' + totalNGN.toLocaleString();
}

function validateCheckoutForm() {
  var errEl = document.getElementById('checkout-error');
  var fn = (document.getElementById('co-firstname').value || '').trim();
  var ln = (document.getElementById('co-lastname').value  || '').trim();
  var em = (document.getElementById('co-email').value     || '').trim();
  var ad = (document.getElementById('co-address').value   || '').trim();

  if (!fn || !ln)  { errEl.textContent = 'Please enter your full name.'; return null; }
  if (!em || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { errEl.textContent = 'Please enter a valid email address.'; return null; }
  if (!ad) { errEl.textContent = 'Please enter your delivery address.'; return null; }
  errEl.textContent = '';

  return {
    firstName: fn,
    lastName:  ln,
    email:     em,
    phone:     (document.getElementById('co-phone').value   || '').trim(),
    address:   ad,
    city:      (document.getElementById('co-city').value    || '').trim(),
    state:     (document.getElementById('co-state').value   || '').trim()
  };
}

function initiatePaystack() {
  var customer = validateCheckoutForm();
  if (!customer) return;

  var totalNGN = cart.reduce(function(s,i) { return s + i.priceNGN * i.qty; }, 0);
  // Paystack amount is in kobo (NGN x 100)
  var amountKobo = totalNGN * 100;

  // Build order reference
  var ref = 'MN-' + Date.now() + '-' + Math.random().toString(36).substr(2,5).toUpperCase();

  // Build items summary for metadata
  var itemsSummary = cart.map(function(i) {
    return i.name + ' (x' + i.qty + ', size ' + i.size + ')';
  }).join('; ');

  var btn = document.getElementById('checkout-pay-btn');
  if (btn) { btn.disabled = true; document.getElementById('checkout-pay-label').textContent = 'Opening payment…'; }

  // Check Paystack is loaded
  if (typeof PaystackPop === 'undefined') {
    var errEl = document.getElementById('checkout-error');
    if (errEl) errEl.textContent = 'Payment gateway not loaded. Please check your internet connection and try again.';
    if (btn) { btn.disabled = false; updatePayLabel(); }
    return;
  }

  var handler = PaystackPop.setup({
    key:       PAYSTACK_PUBLIC_KEY,
    email:     customer.email,
    amount:    amountKobo,
    currency:  'NGN',
    ref:       ref,
    firstname: customer.firstName,
    lastname:  customer.lastName,
    phone:     customer.phone,
    metadata: {
      custom_fields: [
        { display_name: 'Customer Name',     variable_name: 'customer_name',    value: customer.firstName + ' ' + customer.lastName },
        { display_name: 'Delivery Address',  variable_name: 'delivery_address', value: customer.address + ', ' + customer.city + ', ' + customer.state },
        { display_name: 'Items Ordered',     variable_name: 'items_ordered',    value: itemsSummary },
        { display_name: 'Order Reference',   variable_name: 'order_reference',  value: ref }
      ]
    },
    onClose: function() {
      if (btn) { btn.disabled = false; updatePayLabel(); }
      showToast('Payment cancelled');
    },
    callback: function(response) {
      // Payment successful
      closeCheckoutDirect();
      // Add to orders list
      orders.unshift({
        id: ref,
        customer: customer.firstName + ' ' + customer.lastName,
        items: cart.reduce(function(s,i) { return s+i.qty; }, 0),
        total: totalNGN,
        status: 'processing',
        date: new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
      });
      // Add/update customer record
      addOrUpdateCustomer(customer, totalNGN);
      // Clear cart
      cart = [];
      updateCartDisplay();
      populateAdmin();
      // Show success
      var refEl = document.getElementById('order-success-ref');
      if (refEl) refEl.textContent = 'Order Ref: ' + response.reference;
      document.getElementById('order-success-overlay').classList.add('open');
      if (btn) { btn.disabled = false; updatePayLabel(); }
    }
  });

  handler.openIframe();
}

function closeOrderSuccess() {
  document.getElementById('order-success-overlay').classList.remove('open');
  showPage(lastShopPage);
}


// ── EXECUTIVE PHOTO UPDATE ──
function updateExecPhoto(slug, input) {
  if (!input.files || !input.files[0]) return;
  var file  = input.files[0];
  var maxMB = 5;

  if (file.size > maxMB * 1024 * 1024) {
    showToast('Photo must be under ' + maxMB + 'MB');
    return;
  }

  var wrap = document.getElementById('photo-wrap-' + slug);
  if (wrap) wrap.classList.add('team-photo-uploading');

  var reader = new FileReader();
  reader.onload = function(e) {
    var img = document.getElementById('team-photo-' + slug);
    if (!img) return;

    var newImg    = new Image();
    newImg.onload = function() {
      img.src = e.target.result;
      img.style.display = 'block';
      if (wrap) wrap.classList.remove('team-photo-uploading');
      img.classList.add('team-photo-updated');
      setTimeout(function() { img.classList.remove('team-photo-updated'); }, 700);
      showToast('Photo updated successfully');
    };
    newImg.onerror = function() {
      if (wrap) wrap.classList.remove('team-photo-uploading');
      showToast('Could not load image — try a different file');
    };
    newImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
  // Reset input so same file can be re-selected if needed
  input.value = '';
}


// ══════════════════════════════════════════════
//  ADMIN SECURITY ENHANCEMENTS
//  - Obfuscated access trigger
//  - MFA (TOTP-ready, demo mode)
//  - Session auto-expiry + warnings
//  - Audit log
//  - Role-based access
// ══════════════════════════════════════════════

// ── Config ──
var SESSION_TIMEOUT_MS  = 30 * 60 * 1000;   // 30 minutes
var SESSION_WARN_MS     = 5  * 60 * 1000;   // warn at 5 min remaining
var SESSION_CHECK_MS    = 10 * 1000;         // check every 10s
var MFA_DEMO_CODE       = '123456';          // replace with TOTP in production
var ADMIN_ROLE          = 'super_admin';     // roles: super_admin | editor | viewer
var footerClickCount    = 0;
var footerClickTimer    = null;
var sessionExpiry       = null;
var sessionCheckInterval= null;
var mfaPassed           = false;
var pendingLoginUser    = null;

// ── Audit Log ──
var auditLog = [];  // { time, type, message, ip, user }

function logAdminAction(type, message) {
  var entry = {
    id:      Date.now() + '_' + Math.random().toString(36).substr(2,4),
    time:    new Date().toISOString(),
    timeStr: new Date().toLocaleString('en-GB', {day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}),
    type:    type.toUpperCase(),
    message: message,
    user:    'admin',
    ip:      '(client)'
  };
  auditLog.unshift(entry);
  if (auditLog.length > 500) auditLog.pop();  // cap at 500 entries

  // Persist to sessionStorage (cleared when browser closes)
  try { sessionStorage.setItem('mn_audit', JSON.stringify(auditLog.slice(0,100))); } catch(e) {}

  // Update UI if audit tab is visible
  var auditTab = document.getElementById('admin-audit');
  if (auditTab && auditTab.classList.contains('active')) renderAuditLog();

  // Alert on security events
  if (type === 'SECURITY') {
    var warn = document.getElementById('admin-timeout-warning');
    if (warn) {
      warn.style.display = 'block';
      warn.style.background = 'rgba(248,113,113,.2)';
    }
  }
}

function renderAuditLog() {
  var filter = (document.getElementById('audit-filter-type') || {value:''}).value;
  var filtered = auditLog.filter(function(e) { return !filter || e.type === filter; });

  var countEl = document.getElementById('audit-count');
  if (countEl) countEl.textContent = filtered.length + ' entries';

  var list  = document.getElementById('audit-log-list');
  var empty = document.getElementById('audit-empty');
  if (!list) return;

  if (!filtered.length) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  list.innerHTML = filtered.map(function(e) {
    return '<div class="audit-row">' +
      '<span class="audit-time">' + e.timeStr + '</span>' +
      '<span class="audit-badge badge-' + e.type + '">' + e.type + '</span>' +
      '<span class="audit-msg">' + e.message + '</span>' +
      '<span class="audit-ip">' + e.ip + '</span>' +
    '</div>';
  }).join('');
}

function clearAuditLog() {
  if (!confirm('Clear entire audit log? This cannot be undone.')) return;
  logAdminAction('SESSION', 'Audit log cleared by admin');
  auditLog = [];
  renderAuditLog();
  showToast('Audit log cleared');
}

function exportAuditLog() {
  var headers = 'Timestamp,Type,Message,User,IP';
  var rows = auditLog.map(function(e) {
    return [e.timeStr, e.type, '"'+e.message.replace(/"/g,'""')+'"', e.user, e.ip].join(',');
  });
  dlFile([headers].concat(rows).join('\n'), 'text/csv', 'klot_audit_'+today()+'.csv');
  showToast('Audit log exported');
}

// Load any persisted audit entries from sessionStorage
(function loadAuditFromStorage() {
  try {
    var saved = sessionStorage.getItem('mn_audit');
    if (saved) auditLog = JSON.parse(saved);
  } catch(e) {}
})();

// ── Secret Admin Access Triggers ──
// Trigger 1: Ctrl+Shift+A keyboard shortcut
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'A') {
    e.preventDefault();
    openAdminLogin();
  }
});

// Trigger 2: Triple-click footer copyright
function handleFooterClick() {
  footerClickCount++;
  if (footerClickTimer) clearTimeout(footerClickTimer);
  if (footerClickCount >= 3) {
    footerClickCount = 0;
    openAdminLogin();
    return;
  }
  footerClickTimer = setTimeout(function() { footerClickCount = 0; }, 600);
}

// Trigger 3: Invisible bottom-right pixel click
function handleAdminTrigger() {
  openAdminLogin();
}

// ── MFA ──
function verifyMFA() {
  var code = (document.getElementById('admin-mfa-code') || {value:''}).value.trim();
  var err  = document.getElementById('admin-error');

  if (!code || code.length !== 6) {
    if (err) { err.textContent = 'Enter a 6-digit code.'; err.classList.add('show'); }
    return;
  }

  // PRODUCTION: Replace this with TOTP verification against your backend
  // e.g. verify HMAC-based one-time password using a library like otpauth
  if (code !== MFA_DEMO_CODE) {
    if (err) { err.textContent = 'Invalid verification code.'; err.classList.add('show'); }
    logAdminAction('SECURITY', 'Failed MFA attempt');
    var inp = document.getElementById('admin-mfa-code');
    if (inp) { inp.value = ''; inp.focus(); }
    return;
  }

  // MFA passed
  mfaPassed = true;
  var panel = document.getElementById('admin-mfa-panel');
  if (panel) panel.style.display = 'none';
  if (err) err.classList.remove('show');

  // Complete login
  if (pendingLoginUser) {
    adminAuth = true;
    closeAdminLogin();
    openDashboard();
    logAdminAction('AUTH', 'Admin login successful (MFA verified)');
    pendingLoginUser = null;
  }
}

// ── Session Expiry ──
function startSessionExpiry() {
  sessionExpiry = Date.now() + SESSION_TIMEOUT_MS;
  updateExpiryDisplay();
  if (sessionCheckInterval) clearInterval(sessionCheckInterval);
  sessionCheckInterval = setInterval(checkSessionExpiry, SESSION_CHECK_MS);
}

function extendAdminSession() {
  sessionExpiry = Date.now() + SESSION_TIMEOUT_MS;
  var warn = document.getElementById('admin-timeout-warning');
  if (warn) warn.style.display = 'none';
  updateExpiryDisplay();
  logAdminAction('SESSION', 'Admin session extended');
  showToast('Session extended by 30 minutes');
}

function checkSessionExpiry() {
  if (!adminAuth || !sessionExpiry) return;
  var remaining = sessionExpiry - Date.now();

  if (remaining <= 0) {
    // Session expired — force logout
    clearInterval(sessionCheckInterval);
    logAdminAction('SESSION', 'Admin session expired — auto logged out');
    adminAuth = false; sessionExpiry = null; mfaPassed = false;
    document.getElementById('admin-panel').classList.remove('open');
    showToast('Session expired. Please sign in again.');
    setTimeout(function() { openAdminLogin(); }, 800);
    return;
  }

  // Show warning when under 5 minutes
  var warn = document.getElementById('admin-timeout-warning');
  var countdown = document.getElementById('admin-timeout-countdown');
  if (remaining <= SESSION_WARN_MS) {
    var mins = Math.ceil(remaining / 60000);
    if (warn) warn.style.display = 'block';
    if (countdown) countdown.textContent = mins + ' minute' + (mins !== 1 ? 's' : '');
  } else {
    if (warn) warn.style.display = 'none';
  }
}

function updateExpiryDisplay() {
  var el = document.getElementById('admin-session-expiry');
  if (!el || !sessionExpiry) return;
  var exp = new Date(sessionExpiry);
  el.textContent = 'Expires ' + exp.toLocaleTimeString('en-GB', {hour:'2-digit',minute:'2-digit'});
}

// ── Role-Based Access ──
var adminRoles = {
  super_admin: { canEdit:true,  canDelete:true,  canImport:true,  canExport:true,  canViewAudit:true  },
  editor:      { canEdit:true,  canDelete:false, canImport:true,  canExport:true,  canViewAudit:false },
  viewer:      { canEdit:false, canDelete:false, canImport:false, canExport:true,  canViewAudit:false }
};

function hasPermission(action) {
  var role = adminRoles[ADMIN_ROLE];
  return role ? !!role[action] : false;
}

function enforceRBAC() {
  // Hide delete buttons for non-super-admin
  if (!hasPermission('canDelete')) {
    document.querySelectorAll('.pm-act-btn.del, #pm-bulk-bar .abtn-danger').forEach(function(el) {
      el.style.display = 'none';
    });
  }
  // Hide import for viewer
  if (!hasPermission('canImport')) {
    var importNav = document.querySelector('[onclick*="import"]');
    if (importNav) importNav.style.display = 'none';
  }
  // Show role badge
  var badge = document.getElementById('admin-role-badge');
  if (badge) badge.textContent = ADMIN_ROLE.replace('_',' ').toUpperCase();
}

// ── Patch existing admin functions to log actions ──

// Patch pmSave
var _origPmSave = pmSave;
pmSave = function() {
  var idx  = parseInt((document.getElementById('edit-index') || {value:'-1'}).value);
  var name = (document.getElementById('edit-name') || {value:'?'}).value.trim();
  _origPmSave();
  logAdminAction('PRODUCT', 'Edited product #' + (idx+1) + ': "' + name + '"');
};

// Patch pmDelete
var _origPmDelete = pmDelete;
pmDelete = function(idx) {
  var p = products[idx];
  _origPmDelete(idx);
  if (p) logAdminAction('PRODUCT', 'Deleted product "' + p.name + '" (SKU: ' + p.sku + ')');
};

// Patch pmBulkDelete
var _origPmBulkDelete = pmBulkDelete;
pmBulkDelete = function() {
  var n = pmState.selected.size;
  _origPmBulkDelete();
  logAdminAction('PRODUCT', 'Bulk deleted ' + n + ' products');
};

// Patch adjustStock
var _origAdjustStock = adjustStock;
adjustStock = function(pid) {
  var p = products.find(function(x){return x.id===pid;});
  var oldStock = p ? p.stock : '?';
  _origAdjustStock(pid);
  var newStock = p ? p.stock : '?';
  if (p) logAdminAction('INVENTORY', 'Stock adjusted: "' + p.name + '" ' + oldStock + ' -> ' + newStock);
};

// Patch editOrder
var _origEditOrder = editOrder;
editOrder = function(oid) {
  var o = orders.find(function(x){return x.id===oid;});
  var oldStatus = o ? o.status : '?';
  _origEditOrder(oid);
  var newStatus = o ? o.status : '?';
  if (o && oldStatus !== newStatus) logAdminAction('ORDER', 'Order ' + oid + ' status: ' + oldStatus + ' -> ' + newStatus);
};

// Patch confirmImport
var _origConfirmImport = confirmImport;
confirmImport = function() {
  var ready = imp.validated.filter(function(r){return r._st==='new'||r._st==='update';}).length;
  _origConfirmImport();
  logAdminAction('IMPORT', 'Bulk import: ' + ready + ' products from "' + imp.fileName + '"');
};

// Patch pmBulkStatus
var _origPmBulkStatus = pmBulkStatus;
pmBulkStatus = function(s) {
  var n = pmState.selected.size;
  _origPmBulkStatus(s);
  logAdminAction('PRODUCT', 'Bulk status change: ' + n + ' products set to ' + s.toUpperCase());
};


// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
  showPage('home');
  // Pre-render shop grid so it loads instantly on navigation
  renderGrid('shop-grid', products);
});

// ══════════════════════════════════════════════
//  AUTH SYSTEM
//  Email/password + Google + Facebook OAuth
//  localStorage persistence + checkout auto-fill
// ══════════════════════════════════════════════

// ── State ──
var currentUser = null;   // { id, firstName, lastName, email, phone, address, city, state, provider, token }
var authPendingCheckout = false;

// ── Storage helpers (with try/catch for private browsing) ──
function storageGet(key) {
  try { return localStorage.getItem(key); } catch(e) { return null; }
}
function storageSet(key, val) {
  try { localStorage.setItem(key, val); } catch(e) {}
}
function storageRemove(key) {
  try { localStorage.removeItem(key); } catch(e) {}
}

// ── Password hashing (PBKDF2 via SubtleCrypto) ──
function hashPassword(password, salt) {
  var enc = new TextEncoder();
  return crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
    .then(function(key) {
      return crypto.subtle.deriveBits(
        { name:'PBKDF2', salt:enc.encode(salt), iterations:100000, hash:'SHA-256' },
        key, 256
      );
    })
    .then(function(bits) {
      return Array.from(new Uint8Array(bits))
        .map(function(b) { return b.toString(16).padStart(2,'0'); }).join('');
    });
}

function generateSalt() {
  var arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(function(b) { return b.toString(16).padStart(2,'0'); }).join('');
}

// ── User DB (localStorage, demo-safe) ──
function getUserDB() {
  try { return JSON.parse(storageGet('mn_users') || '{}'); } catch(e) { return {}; }
}
function saveUserDB(db) {
  storageSet('mn_users', JSON.stringify(db));
}

// ── Session persistence ──
function loadSession() {
  var saved = storageGet('mn_session');
  if (!saved) return;
  try {
    var sess = JSON.parse(saved);
    if (sess && sess.email) {
      currentUser = sess;
      updateNavForUser(currentUser);
    }
  } catch(e) {}
}

function saveSession(user, remember) {
  if (remember) storageSet('mn_session', JSON.stringify(user));
  else storageRemove('mn_session');
}

// ── Nav UI update ──
function updateNavForUser(user) {
  var loginBtn  = document.getElementById('nav-login-btn');
  var userMenu  = document.getElementById('nav-user-menu');
  var initials  = document.getElementById('nav-avatar-initials');
  var ddName    = document.getElementById('user-dropdown-name');
  var ddEmail   = document.getElementById('user-dropdown-email');

  if (user) {
    if (loginBtn)  loginBtn.style.display  = 'none';
    if (userMenu)  userMenu.style.display  = 'flex';
    if (initials)  initials.textContent    = (user.firstName||'?')[0] + (user.lastName||'')[0];
    if (ddName)    ddName.textContent      = user.firstName + ' ' + user.lastName;
    if (ddEmail)   ddEmail.textContent     = user.email;
  } else {
    if (loginBtn)  loginBtn.style.display  = '';
    if (userMenu)  userMenu.style.display  = 'none';
  }
}

function toggleUserMenu() {
  document.getElementById('user-dropdown').classList.toggle('open');
}

// Close dropdown on outside click
document.addEventListener('click', function(e) {
  var menu = document.getElementById('nav-user-menu');
  if (menu && !menu.contains(e.target)) {
    var dd = document.getElementById('user-dropdown');
    if (dd) dd.classList.remove('open');
  }
});

// ── Modal open/close ──
function openAuthModal(panel) {
  panel = panel || 'login';
  var overlay = document.getElementById('auth-overlay');
  if (!overlay) return;

  // Hide tabs for profile/orders/forgot panels
  var tabs = document.getElementById('auth-tabs');
  var logo = document.querySelector('.auth-logo');
  if (panel === 'profile' || panel === 'orders' || panel === 'forgot') {
    if (tabs) tabs.style.display = 'none';
  } else {
    if (tabs) tabs.style.display = 'flex';
  }

  // Show correct panel
  ['login','register','profile','forgot','orders'].forEach(function(p) {
    var el = document.getElementById('panel-' + p);
    if (el) el.style.display = p === panel ? 'block' : 'none';
  });

  // Update active tab highlight
  ['login','register'].forEach(function(t) {
    var btn = document.getElementById('tab-' + t);
    if (btn) btn.classList.toggle('active', t === panel);
  });

  // Populate profile if opening that panel
  if (panel === 'profile' && currentUser) populateProfilePanel();
  if (panel === 'orders')                 populateMyOrders();

  overlay.classList.add('open');
  // Focus first input
  setTimeout(function() {
    var inp = overlay.querySelector('#panel-' + panel + ' .auth-input');
    if (inp) inp.focus();
  }, 150);
}

function closeAuthModal(e) {
  if (e && e.target !== document.getElementById('auth-overlay')) return;
  closeAuthModalDirect();
}
function closeAuthModalDirect() {
  var overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.classList.remove('open');
  clearAuthErrors();
}
function clearAuthErrors() {
  ['login-error','reg-error','profile-error','forgot-error'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

function switchAuthTab(tab) {
  openAuthModal(tab);
}

// ── Password visibility toggle ──
function togglePwd(inputId, btn) {
  var inp = document.getElementById(inputId);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '\uD83D\uDC41' : '\uD83D\uDE48';
}

// ── Password strength meter ──
function updatePwdStrength(pwd) {
  var fill  = document.getElementById('pwd-strength-fill');
  var label = document.getElementById('pwd-strength-label');
  if (!fill || !label) return;
  var score = 0;
  if (pwd.length >= 8)                score++;
  if (pwd.length >= 12)               score++;
  if (/[A-Z]/.test(pwd))             score++;
  if (/[0-9]/.test(pwd))             score++;
  if (/[^A-Za-z0-9]/.test(pwd))     score++;
  var colours = ['#e05555','#f97316','#eab308','#22c55e','#16a34a'];
  var labels  = ['Very weak','Weak','Fair','Strong','Very strong'];
  var pct     = [20,40,60,85,100];
  var idx     = Math.max(0, score - 1);
  fill.style.width      = (pwd ? pct[idx] : 0) + '%';
  fill.style.background = pwd ? colours[idx] : '';
  label.textContent     = pwd ? labels[idx] : '';
  label.style.color     = pwd ? colours[idx] : '';
}

// ── Email/Password register ──
function submitRegister() {
  var fn  = (document.getElementById('reg-firstname').value || '').trim();
  var ln  = (document.getElementById('reg-lastname').value  || '').trim();
  var em  = (document.getElementById('reg-email').value     || '').trim().toLowerCase();
  var ph  = (document.getElementById('reg-phone').value     || '').trim();
  var pwd = (document.getElementById('reg-password').value  || '');
  var cfm = (document.getElementById('reg-confirm').value   || '');
  var tms = document.getElementById('reg-terms');
  var err = document.getElementById('reg-error');

  if (!fn || !ln)        { err.textContent = 'Please enter your full name.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { err.textContent = 'Please enter a valid email.'; return; }
  if (pwd.length < 8)    { err.textContent = 'Password must be at least 8 characters.'; return; }
  if (pwd !== cfm)       { err.textContent = 'Passwords do not match.'; return; }
  if (tms && !tms.checked) { err.textContent = 'Please accept the Terms & Privacy Policy.'; return; }

  var db = getUserDB();
  if (db[em]) { err.textContent = 'An account with this email already exists.'; return; }

  var btn = document.querySelector('#panel-register .auth-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Creating account\u2026'; }
  err.textContent = '';

  var salt = generateSalt();
  hashPassword(pwd, salt).then(function(hash) {
    db[em] = { firstName:fn, lastName:ln, email:em, phone:ph,
               hash:hash, salt:salt, provider:'email',
               address:'', city:'', state:'',
               createdAt: new Date().toISOString() };
    saveUserDB(db);

    var user = Object.assign({}, db[em]);
    delete user.hash; delete user.salt;
    user.id = 'user_' + em.replace(/[^a-z0-9]/g,'_');
    currentUser = user;
    saveSession(user, true);
    updateNavForUser(user);
    addOrUpdateCustomer({ firstName:fn, lastName:ln, email:em, phone:ph, city:'', state:'' }, 0);

    closeAuthModalDirect();
    if (btn) { btn.disabled = false; btn.textContent = 'Create Account'; }
    showToast('Welcome to KLOT, ' + fn + '!');

    if (authPendingCheckout) { authPendingCheckout = false; openCheckout(); }
  }).catch(function() {
    if (btn) { btn.disabled = false; btn.textContent = 'Create Account'; }
    err.textContent = 'Registration failed. Please try again.';
  });
}

// ── Email/Password login ──
function submitLogin() {
  var em  = (document.getElementById('login-email').value    || '').trim().toLowerCase();
  var pwd = (document.getElementById('login-password').value || '');
  var rem = document.getElementById('login-remember');
  var err = document.getElementById('login-error');

  if (!em || !pwd) { err.textContent = 'Please enter your email and password.'; return; }

  var db  = getUserDB();
  var rec = db[em];

  if (!rec || rec.provider !== 'email') {
    err.textContent = 'No account found. Please register first.'; return;
  }

  var btn = document.querySelector('#panel-login .auth-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Signing in\u2026'; }
  err.textContent = '';

  hashPassword(pwd, rec.salt).then(function(hash) {
    if (hash !== rec.hash) {
      err.textContent = 'Incorrect password.';
      if (btn) { btn.disabled = false; btn.textContent = 'Sign In'; }
      return;
    }
    var user = Object.assign({}, rec);
    delete user.hash; delete user.salt;
    user.id = 'user_' + em.replace(/[^a-z0-9]/g,'_');
    currentUser = user;
    saveSession(user, rem && rem.checked);
    updateNavForUser(user);

    closeAuthModalDirect();
    if (btn) { btn.disabled = false; btn.textContent = 'Sign In'; }
    showToast('Welcome back, ' + user.firstName + '!');

    if (authPendingCheckout) { authPendingCheckout = false; openCheckout(); }
  });
}

// ── Social login (Google / Facebook OAuth) ──
function socialLogin(provider) {
  // PRODUCTION: Replace these URLs with your real OAuth endpoints
  // Google:   https://accounts.google.com/o/oauth2/v2/auth?...
  // Facebook: https://www.facebook.com/v18.0/dialog/oauth?...
  //
  // For now: simulate a successful OAuth return with a demo user
  // Remove this demo block and uncomment the real OAuth redirect below.

  var demo = {
    google:   { firstName:'Demo', lastName:'Google User',   email:'demo.google&#64;gmail.com',    provider:'google',   avatar:'G' },
    facebook: { firstName:'Demo', lastName:'Facebook User', email:'demo.fb&#64;facebook.com',     provider:'facebook', avatar:'F' }
  };
  var d = demo[provider];
  if (!d) return;

  // --- REAL OAUTH REDIRECT (uncomment and configure for production) ---
  // var CLIENT_IDS = {
  //   google:   'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  //   facebook: 'YOUR_FACEBOOK_APP_ID'
  // };
  // var REDIRECT_URI = encodeURIComponent(window.location.origin + '/auth/callback');
  // if (provider === 'google') {
  //   var url = 'https://accounts.google.com/o/oauth2/v2/auth' +
  //     '?client_id='    + CLIENT_IDS.google +
  //     '&redirect_uri=' + REDIRECT_URI +
  //     '&response_type=code' +
  //     '&scope=openid%20email%20profile' +
  //     '&state=manoshia_google';
  //   window.location.href = url;
  // } else if (provider === 'facebook') {
  //   var url = 'https://www.facebook.com/v18.0/dialog/oauth' +
  //     '?client_id='    + CLIENT_IDS.facebook +
  //     '&redirect_uri=' + REDIRECT_URI +
  //     '&scope=email,public_profile' +
  //     '&state=manoshia_fb';
  //   window.location.href = url;
  // }
  // --- END REAL OAUTH ---

  // Demo flow
  var user = {
    id:        'social_' + provider + '_demo',
    firstName: d.firstName, lastName: d.lastName,
    email:     d.email, phone:'',
    address:'', city:'', state:'',
    provider:  provider, token: 'demo_token_' + provider
  };
  currentUser = user;
  saveSession(user, true);
  updateNavForUser(user);
  addOrUpdateCustomer({ firstName:user.firstName, lastName:user.lastName,
    email:user.email, phone:'', city:'', state:'' }, 0);

  closeAuthModalDirect();
  showToast('Signed in with ' + (provider === 'google' ? 'Google' : 'Facebook') + '!');
  if (authPendingCheckout) { authPendingCheckout = false; openCheckout(); }
}

// ── Sign out ──
function signOut() {
  currentUser = null;
  storageRemove('mn_session');
  updateNavForUser(null);
  var dd = document.getElementById('user-dropdown');
  if (dd) dd.classList.remove('open');
  showToast('Signed out');
}

// ── Forgot password ──
function showForgotPwd() {
  openAuthModal('forgot');
}
function submitForgot() {
  var em  = (document.getElementById('forgot-email').value || '').trim().toLowerCase();
  var err = document.getElementById('forgot-error');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { err.textContent = 'Enter a valid email.'; return; }
  // In production: POST to your backend to send reset email
  err.textContent = '';
  showToast('Reset link sent to ' + em + ' (demo)');
  setTimeout(function() { switchAuthTab('login'); }, 1500);
}

// ── Profile panel ──
function populateProfilePanel() {
  if (!currentUser) return;
  var fields = ['firstname','lastname','phone','address','city','state'];
  var keys   = ['firstName','lastName','phone','address','city','state'];
  fields.forEach(function(f, i) {
    var el = document.getElementById('profile-' + f);
    if (el) el.value = currentUser[keys[i]] || '';
  });
  var av   = document.getElementById('profile-avatar-display');
  var fn   = document.getElementById('profile-fullname');
  var pem  = document.getElementById('profile-email-display');
  var pbdg = document.getElementById('profile-provider-badge');
  if (av)   av.textContent   = (currentUser.firstName||'?')[0] + (currentUser.lastName||'')[0];
  if (fn)   fn.textContent   = currentUser.firstName + ' ' + currentUser.lastName;
  if (pem)  pem.textContent  = currentUser.email;
  if (pbdg) pbdg.textContent = currentUser.provider === 'google'   ? 'Google Account' :
                                currentUser.provider === 'facebook' ? 'Facebook Account' : 'Email Account';
}

function saveProfile() {
  if (!currentUser) return;
  var err = document.getElementById('profile-error');
  currentUser.firstName = (document.getElementById('profile-firstname').value || '').trim();
  currentUser.lastName  = (document.getElementById('profile-lastname').value  || '').trim();
  currentUser.phone     = (document.getElementById('profile-phone').value     || '').trim();
  currentUser.address   = (document.getElementById('profile-address').value   || '').trim();
  currentUser.city      = (document.getElementById('profile-city').value      || '').trim();
  currentUser.state     = (document.getElementById('profile-state').value     || '').trim();

  if (!currentUser.firstName) { err.textContent = 'First name is required.'; return; }

  // Update localStorage user DB
  if (currentUser.provider === 'email') {
    var db  = getUserDB();
    var rec = db[currentUser.email];
    if (rec) {
      Object.assign(rec, { firstName:currentUser.firstName, lastName:currentUser.lastName,
        phone:currentUser.phone, address:currentUser.address,
        city:currentUser.city, state:currentUser.state });
      saveUserDB(db);
    }
  }
  saveSession(currentUser, true);
  updateNavForUser(currentUser);
  err.textContent = '';
  closeAuthModalDirect();
  showToast('Profile saved');
}

// ── My Orders panel ──
function showMyOrders() {
  var dd = document.getElementById('user-dropdown');
  if (dd) dd.classList.remove('open');
  openAuthModal('orders');
}
function populateMyOrders() {
  if (!currentUser) return;
  var sub  = document.getElementById('orders-panel-sub');
  var list = document.getElementById('my-orders-list');
  // Filter orders belonging to this user
  var name = (currentUser.firstName + ' ' + currentUser.lastName).toLowerCase();
  var myOrders = orders.filter(function(o) {
    return o.customer.toLowerCase() === name ||
           (o.email && o.email.toLowerCase() === currentUser.email.toLowerCase());
  });
  if (sub) sub.textContent = myOrders.length + ' order' + (myOrders.length !== 1 ? 's' : '') + ' placed';
  if (!list) return;
  if (!myOrders.length) {
    list.innerHTML = '<p style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:17px;color:var(--muted);font-style:italic;padding:20px 0">No orders yet. Start shopping!</p>';
    return;
  }
  list.innerHTML = myOrders.map(function(o) {
    return '<div class="my-order-row">' +
      '<div><div class="my-order-id">' + o.id + '</div>' +
           '<div class="my-order-date">' + o.date + ' &middot; ' + o.items + ' item' + (o.items!==1?'s':'') + '</div></div>' +
      '<div style="text-align:right">' +
        '<div class="my-order-total">&#8358;' + o.total.toLocaleString() + '</div>' +
        statusBadge(o.status) +
      '</div>' +
    '</div>';
  }).join('');
}

// ── Checkout auto-fill from user profile ──
var _origOpenCheckout = openCheckout;
openCheckout = function() {
  // If not logged in, prompt login first then resume checkout
  if (!currentUser) {
    authPendingCheckout = true;
    openAuthModal('login');
    showToast('Sign in to continue to checkout');
    return;
  }
  authPendingCheckout = false;
  _origOpenCheckout();
  // Auto-fill customer fields from saved profile
  setTimeout(function() {
    var map = {
      'co-firstname': currentUser.firstName || '',
      'co-lastname':  currentUser.lastName  || '',
      'co-email':     currentUser.email     || '',
      'co-phone':     currentUser.phone     || '',
      'co-address':   currentUser.address   || '',
      'co-city':      currentUser.city      || '',
    };
    Object.keys(map).forEach(function(id) {
      var el = document.getElementById(id);
      if (el && map[id]) el.value = map[id];
    });
    var stateEl = document.getElementById('co-state');
    if (stateEl && currentUser.state) {
      for (var i=0; i < stateEl.options.length; i++) {
        if (stateEl.options[i].text === currentUser.state) {
          stateEl.selectedIndex = i; break;
        }
      }
    }
    updatePayLabel();
  }, 100);
};

// ── Init: restore session on load ──
document.addEventListener('DOMContentLoaded', function() {
  loadSession();
});
