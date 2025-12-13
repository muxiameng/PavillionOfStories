// ===== CONFIG =====
const eng = "illustrations";

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

    startTitleEffects();

}

// /* illust.js - ページ固有の動作 */
// function initIllustModule() {
//     // 設定: カテゴリ数と1カテゴリあたりの最大探索数
//     const CATEGORY_COUNT = 5; // 必要に応じて増やして下さい
//     const MAX_PER_CATEGORY = 50;


//     // 画像格納ルール: /illusts/images/category{n}/img{m}.jpg
//     const imagePath = (c, i) => `../illusts/images/category${c}/img${i}.jpg`;


//     // メタデータ読み込みを試みる (optional)
//     async function fetchMeta(category) {
//         try {
//             const res = await fetch(`../illusts/data/meta_category${category}.json`);
//             if (!res.ok) return null;
//             return await res.json();
//         } catch (e) { return null }
//     }

//     // 画像存在チェックを追加
//     async function imageExists(url) {
//         try {
//             const res = await fetch(url, { method: "HEAD" });
//             return res.ok;
//         } catch (e) { return false }
//     }

//     // 画像を固定数だけ fetch していた処理を、
//     // 存在チェックに変更して404を出さないようにした
//     async function loadCategory(category) {
//         const meta = await fetchMeta(category) || {};
//         const list = [];

//         for (let i = 1; i <= MAX_PER_CATEGORY; i++) {
//             const url = imagePath(category, i);
//             const exists = await imageExists(url);
//             if (!exists) continue; // ← 404 の画像はスキップ

//             const key = `img${i}`;
//             list.push({
//                 category,
//                 index: i,
//                 url,
//                 title: meta[key] ? .title || `イラスト${i}`,
//                 desc: meta[key] ? .desc || "",
//                 tags: meta[key] ? .tags || [],
//                 date: meta[key] ? .date || ""
//             });
//         }
//         return list;
//     }


//     // // 指定カテゴリの画像を検出して配列を返す
//     // async function detectImages(category) {
//     //     const meta = await fetchMeta(category) || {};
//     //     const items = [];


//     //     for (let i = 1; i <= MAX_PER_CATEGORY; i++) {
//     //         const url = imagePath(category, i);
//     //         const exists = await imageExists(url);
//     //         if(!exists) continue;
//     //         // 画像が存在するかどうかをHEADで確かめる（GitHub PagesはHEADを受け付けないことがあるため、Imageで試す）
//     //         // ここではImageオブジェクトでonload/onerrorを使って判定する
//     //         const ok = await new Promise(resolve => {
//     //             const img = new Image();
//     //             img.onload = () => resolve(true);
//     //             img.onerror = () => resolve(false);
//     //             img.src = url + `?v=${Date.now()}`; // キャッシュ回避
//     //         });
//     //         if (!ok) break; // 1つ見つからなければそのカテゴリの終わりとみなす


//     //         const m = meta[`img${i}`] || {};
//     //         items.push({
//     //             src: url,
//     //             title: m.title || `作品${category} - ${i}`,
//     //             desc: m.desc || '',
//     //             tags: m.tags || [],
//     //             date: m.date || ''
//     //         });
//     //     }
//     //     return items;
//     // }


//     // 全カテゴリ読み込み
//     async function buildGallery() {
//         const worksList = document.getElementById('works-list');


//         for (let c = 1; c <= CATEGORY_COUNT; c++) {
//             const imgs = await loadCategory(c);
//             if (imgs.length === 0) continue;


//             // 作品ブロック
//             const li = document.createElement('li');
//             li.className = 'work-item';


//             const titleH1 = document.createElement('h1');
//             titleH1.className = 'work-title';
//             titleH1.textContent = `作品 ${c}`;

//             function attachThumbHandlers() {
//                 flattenGallery();
//                 document.querySelectorAll('.thumb').forEach(btn => {
//                     btn.addEventListener('click', openOverlayFromThumb);
//                 });


//                 document.getElementById('illust-search').addEventListener('input', onSearch);


//                 // モーダル要素
//                 const overlay = document.getElementById('overlay');
//                 const closeBtn = document.getElementById('close-overlay');
//                 const prevBtn = document.getElementById('prev-btn');
//                 const nextBtn = document.getElementById('next-btn');


//                 closeBtn.addEventListener('click', () => closeOverlay());
//                 overlay.addEventListener('click', (e) => { if (e.target === overlay) closeOverlay(); });
//                 prevBtn.addEventListener('click', () => navigateOverlay(-1));
//                 nextBtn.addEventListener('click', () => navigateOverlay(1));
//                 document.addEventListener('keydown', (e) => {
//                     if (document.getElementById('overlay').classList.contains('hidden')) return;
//                     if (e.key === 'ArrowLeft') navigateOverlay(-1);
//                     if (e.key === 'ArrowRight') navigateOverlay(1);
//                     if (e.key === 'Escape') closeOverlay();
//                 });
//             }


//             let currentIndex = 0;

//             function openOverlayFromThumb(e) {
//                 const btn = e.currentTarget;
//                 const flatIndex = gallery.findIndex(g => g.el === btn);
//                 if (flatIndex < 0) return;
//                 openOverlay(flatIndex);
//             }


//             function openOverlay(idx) {
//                 currentIndex = idx;
//                 const item = gallery[currentIndex];
//                 const overlay = document.getElementById('overlay');
//                 document.getElementById('cheki-img').src = item.src;
//                 document.getElementById('cheki-desc').textContent = item.title || '';
//                 document.getElementById('cheki-date').textContent = '';
//                 document.getElementById('cheki-tags').innerHTML = '';
//                 overlay.classList.remove('hidden');
//                 overlay.setAttribute('aria-hidden', 'false');
//             }


//             function closeOverlay() {
//                 const overlay = document.getElementById('overlay');
//                 overlay.classList.add('hidden');
//                 overlay.setAttribute('aria-hidden', 'true');
//             }


//             function navigateOverlay(dir) {
//                 currentIndex = (currentIndex + dir + gallery.length) % gallery.length;
//                 openOverlay(currentIndex);
//             }


//             // ハッシュタグ検索（メタデータがある場合のみ精度が上がる）
//             function onSearch(e) {
//                 const q = e.target.value.trim().replace(/^#/, '').toLowerCase();
//                 if (!q) {
//                     document.querySelectorAll('.work-item').forEach(it => it.style.display = 'block');
//                     return;
//                 }
//                 // 簡易検索: サムネイルのalt属性と周辺テキストにqが含まれるかでフィルタ
//                 document.querySelectorAll('.work-item').forEach(work => {
//                     const text = work.textContent.toLowerCase();
//                     const thumbs = Array.from(work.querySelectorAll('img')).map(i => i.alt.toLowerCase()).join(' ');
//                     if (text.includes(q) || thumbs.includes(q)) work.style.display = 'block';
//                     else work.style.display = 'none';
//                 });
//             }
//         }
//     }
//     // 初期化
//     buildGallery();
// }

// window.initIllustModule = initIllustModule;


document.addEventListener("DOMContentLoaded", async() => {
    await typeText(); // タイトル演出が終わってから shop 処理へ
    // initIllustModule(); // 商品データ読み込み開始
});