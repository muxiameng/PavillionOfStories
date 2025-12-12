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

document.addEventListener("DOMContentLoaded", typeText);

// shop.js
function buildCategories(items){
  const set = new Set();
  items.forEach(p=>p.category.forEach(c=>set.add(c)));
  return Array.from(set).sort();
}


function renderCategoryBar(){
  const cats = buildCategories(PRODUCTS);
  const bar = document.getElementById('categoryBar');
  const all = document.createElement('div');

  all.className='cat';
  all.textContent='全て';
  all.onclick = ()=>{ applyFilters({category:null}); };

  bar.innerHTML='';
  bar.appendChild(all);

  cats.forEach(cat=>{
    const el = document.createElement('div');
    el.className='cat';
    el.textContent = cat;

    const submenu = document.createElement('div');
    submenu.className='submenu';

    // subcategories: gather within products that include cat
    const subs = new Set();
    PRODUCTS.forEach(
      p=>{ 
        if(p.category.includes(cat)) p.category.forEach(s=>subs.add(s)); 
      });
    Array.from(subs).forEach(
      s=>{ 
        const b = document.createElement('button');
        b.textContent = s;
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
      
      try {
        addToCart(p.id);
      }catch(e){ 
        console.error(e);
        showToast('エラーが発生しました');
      } 

    });
    grid.appendChild(node);
  });

  document.getElementById('seeMoreBtn').style.display = filtered.length>visibleCount ? 'inline-block' : 'none';
  observeCards();
}


function observeCards(){
  const cards = document.querySelectorAll('.card');

  const io = new IntersectionObserver((entries,obs) => {
    entries.forEach(en=>{ 

      if(en.isIntersecting){ 
        en.target.classList.add('visible');
        obs.unobserve(en.target); 
      }

    });
  }, {threshold:0.12});
  cards.forEach(c=>io.observe(c));
}


// filters/sort/search
function applyFilters({category=null,search=null,sort=null}={}){
  const s = search != null ? search : document.getElementById('searchInput').value.trim().toLowerCase();
  const sortVal = sort || document.getElementById('sortSelect').value;

  filtered = PRODUCTS.filter(p => {
    let ok = true;
    if(category) ok = p.category.includes(category);
    if(ok && s) ok = p.title.toLowerCase().includes(s) || (p.desc||'').toLowerCase().includes(s);
    return ok;
  });

  if(sortVal==='priceAsc') filtered.sort((a,b)=>a.price-b.price);
  else if(sortVal==='priceDesc') filtered.sort((a,b)=>b.price-a.price);
  else filtered.sort((a,b)=> (b.new?1:0) - (a.new?1:0) || b.id - a.id );
  visibleCount = 9;
  renderGrid();
}
