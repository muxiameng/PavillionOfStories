const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('closed');
});

// SPのとき、サイドバーリンク押下でメニューを閉じる
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.add('closed');
    }
  });
});

// リサイズ時にハンバーガーメニュー表示切り替え
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove('closed'); // PCは常に開く
  }
});
