const target = document.getElementById("site-title");

// ===== COMPONENTS FETCH =====
document.addEventListener("DOMContentLoaded", () => {

    const sidebarContainer = document.getElementById("sidebar");
    const menuToggle = document.getElementById('menuToggle');
    const footer = document.getElementById("footer");

    /* 今いるページのファイル名を取得 */
    const path = location.pathname;

    // トップページ判定（完全一致）
    const isIndex =
        path === "/PavillionOfStories/" ||
        path === "/PavillionOfStories/index.html";


    /* ▼ サイドバー読み込み ▼ */
    if (sidebarContainer) {
        fetch("/PavillionOfStories/components/sidebar.html")
            .then(res => res.text())
            .then(html => {
                sidebarContainer.innerHTML = html;

                const sidebar = sidebarContainer.querySelector(".sidebar");
                const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');

                /* ★ index 以外は初回から閉じておく（SPのみ） */
                if (window.innerWidth <= 768 && !isIndex) {
                    sidebar.classList.add("closed");
                }

                // SP：リンク押したら閉じる
                sidebarLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth <= 768) {
                            sidebar.classList.add('closed');
                        }
                    });
                });

                // ハンバーガーメニュー開閉
                menuToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('closed');
                });

                // リサイズ時の挙動
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 768) {
                        sidebar.classList.remove('closed'); // PC は常に開く
                    }
                });
            });
    }

    /* ▼ フッター読み込み ▼ */
    if (footer) {
        fetch("/PavillionOfStories/components/footer.html")
            .then(res => res.text())
            .then(html => {
                footer.innerHTML = html;
            });
    }
});

// ===== UTIL =====
/**
 * 遅延
 * @param {*} ms 
 * @returns 
 */
function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

/**
 * ランダム待機時間
 */
const randomWait = (min = 600, max = 1000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 残像演出
 */
const afterImage = () => {
    const ghost = target.cloneNode(true); // タイトルのコピー
    ghost.classList.add("afterimage"); // CSSで赤い残像になる
    ghost.style.position = "absolute";
    ghost.style.left = "0";
    ghost.style.top = "0";
    ghost.style.pointerEvents = "none";

    target.appendChild(ghost);

    setTimeout(() => ghost.remove(), 300); // 0.3秒で消える
};

/**
 * グリッチ演出
 */
const glitch = () => {
    target.setAttribute("data-text", target.textContent);
    target.classList.add("glitch");
    setTimeout(() => target.classList.remove("glitch"), 300); // 0.3秒だけ
};

/**
 * ランダム発生ループ（ずっと繰り返す）
 */
const startTitleEffects = () => {
    const loop = () => {
        // どの演出を出すかランダムで決める
        const random = Math.random();

        if (random < 0.4) {
            // 40%の確率で残像
            afterImage();
        } else if (random < 0.8) {
            // 次の40%はグリッチ
            glitch();
        } else {
            // 20%は両方
            afterImage();
            glitch();
        }

        // ランダム間隔で次を実行
        setTimeout(loop, randomWait());
    };

    loop();
};

/**
 * ランダムでグリッチを発生させる
 */
function randomGlitch() {
    const randomTime = Math.floor(Math.random() * 5000) + 3000;
    // → 1.5〜4.5秒に一度 glitch が発生

    setTimeout(() => {
        glitch();
        randomGlitch(); // 再帰でループ
    }, randomTime);
}