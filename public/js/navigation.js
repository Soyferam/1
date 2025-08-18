// Общая навигация для всех страниц
class Navigation {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('friends.html')) return 'friends';
    if (path.includes('withdraw.html')) return 'withdraw';
    return 'home';
  }

  init() {
    this.setActiveNavItem();
    this.bindEvents();
  }

  setActiveNavItem() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      item.classList.add('inactive');
    });

    const activeItem = document.querySelector(`.nav-item[data-page="${this.currentPage}"]`);
    if (activeItem) {
      activeItem.classList.remove('inactive');
      activeItem.classList.add('active');
    }
  }

  bindEvents() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        this.navigateTo(page);
      });
    });
  }

  navigateTo(page) {
    if (page === this.currentPage) return;

    let targetUrl;
    switch (page) {
      case 'home':
        targetUrl = 'index.html';
        break;
      case 'friends':
        targetUrl = 'friends.html';
        break;
      case 'withdraw':
        targetUrl = 'withdraw.html';
        break;
      default:
        return;
    }

    window.location.href = targetUrl;
  }
}

// Инициализация навигации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
