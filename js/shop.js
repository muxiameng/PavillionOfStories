// ===== CONFIG =====
const eng = "shop";

// ===== MAIN =====
async function typeText() {

  // 1. 英字タイピング
  for (let char of eng.split('')) {
    target.textContent += char;
    await delay(randomWait());
  }
  await delay(300);

  // 震え
  target.classList.add("shake");
  await delay(250);
  target.classList.remove("shake");

  afterImage();
  glitch();

  startRandomGlitch();

}

// shop.js
function initShopModule() {
  const DATA_URL = '../shop/data/products.json';
  let PRODUCTS = [];
  let filtered = [];
  let visibleCount = 9;


  // DOM
  const grid = document.getElementById('productGrid');
  const tpl = document.getElementById('cardTpl');
  const seeMoreBtn = document.getElementById('seeMoreBtn');
  const toastEl = document.getElementById('toast');


  // cookie helpers (1 day)
  function setCartCookie(cart){
    const d = new Date(); d.setDate(d.getDate()+1);
    document.cookie = 'shop_cart='+encodeURIComponent(JSON.stringify(cart))+'; expires='+d.toUTCString()+'; path=/';
  }

  function getCartCookie(){
    const m = document.cookie.match('(^|;)\\s*shop_cart=([^;]+)');
    if(!m) return [];
    try{
      return JSON.parse(decodeURIComponent(m[2]));
    }catch(e){
      return []; 
    }
  }


  function showToast(msg, timeout=3000){
    const div = document.createElement('div');
    div.className='msg';
    div.textContent = msg;
    div.style.pointerEvents='auto';

    toastEl.appendChild(div);

    setTimeout(()=>{ div.style.opacity='0'; setTimeout(()=>div.remove(),400); }, timeout);
  }


  // fetch products
  async function loadProducts(){
    try{
      const res = await fetch(DATA_URL);

      console.log(res);

      if(!res.ok) throw new Error('products.json を取得できませんでした');

      PRODUCTS = await res.json();
      filtered = [...PRODUCTS];
      renderCategoryBar();
      applyFilters();
    }catch(e){
      console.error(e); 
      showToast('エラーが発生しました: 商品データが読み込めません',4000); 
    }
  }


  // build categories
  function buildCategories(items){
    const set = new Set();
    items.forEach(p=>p.category.forEach(c=>set.add(c)));
    return Array.from(set).sort();
  }


  function renderCategoryBar(){
    const cats = buildCategories(PRODUCTS);
    const bar = document.getElementById('categoryBar');
    const all = document.createElement('div');

    bar.innerHTML='';
    all.className='cat';
    all.textContent='全て';
    all.onclick = ()=>{ applyFilters({category:null}); };
    bar.appendChild(all);

    cats.forEach(cat=>{
      console.log(cat);
      const el = document.createElement('div');
      const submenu = document.createElement('div');

      el.className='cat';
      el.textContent = cat;
      submenu.className='submenu';

      // subcategories: gather within products that include cat
      const subs = new Set();
      PRODUCTS.forEach(p=>{ 
        if(p.category.includes(cat)) p.category.forEach(s=>subs.add(s)); 
      });

      Array.from(subs).forEach(s=>{ 
        const b=document.createElement('button');
        b.textContent=s;
        b.onclick = (ev)=>{ 
          ev.stopPropagation();
          applyFilters({category:s});
        }; 
        submenu.appendChild(b);
      });

      el.appendChild(submenu);
      bar.appendChild(el);
    });
  }


  // render grid
  function renderGrid(){
    grid.innerHTML='';
    const slice = filtered.slice(0,visibleCount);

    slice.forEach(p => {
      const node = tpl.content.cloneNode(true);
      const card = node.querySelector('.card'); 
      const img = node.querySelector('img'); 
      const title = node.querySelector('.title'); 
      const price = node.querySelector('.price'); 
      const link = node.querySelector('.title-link'); 

      card.dataset.id = p.id;
      img.src = p.img; 
      img.alt = p.title;
      title.textContent = p.title;
      price.textContent = '¥'+p.price.toLocaleString();
      link.href = '#/detail/'+p.id;

      if(p.new){ 
        const b=document.createElement('span');
        b.className='new-badge';
        b.textContent='NEW';
        title.appendChild(b); 
      }

      const addBtn = node.querySelector('.add-btn');

      addBtn.addEventListener('click', (ev)=>{ 
        ev.stopPropagation(); 
        try{
          addToCart(p.id);
        }catch(e){ 
          console.error(e);
          showToast('エラーが発生しました');
        } });

      grid.appendChild(node);
    });

    document.getElementById('seeMoreBtn').style.display = filtered.length>visibleCount ? 'inline-block' : 'none';
    observeCards();
  }
}
window.initShopModule = initShopModule;

document.addEventListener("DOMContentLoaded", async () => {
  await typeText();  // タイトル演出が終わってから shop 処理へ
  initShopModule();        // 商品データ読み込み開始
});

