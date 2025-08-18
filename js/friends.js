// JavaScript для страницы друзей (friends.html)

class FriendsPage {
  constructor() {
    this.friends = [
      { name: 'PlayerX7', kd: '1.45', avatar: 'assets/player.png' },
      { name: 'ShadowKiller', kd: '0.89', avatar: 'assets/player.png' },
      { name: 'AceOfSpades', kd: '2.10', avatar: 'assets/player.png' },
      { name: 'SilentSniper', kd: '1.75', avatar: 'assets/player.png' },
      { name: 'BlazeMaster', kd: '1.20', avatar: 'assets/player.png' },
      { name: 'DarkKnight', kd: '1.30', avatar: 'assets/player.png' },
      { name: 'GhostRider', kd: '0.95', avatar: 'assets/player.png' },
      { name: 'IronWolf', kd: '1.85', avatar: 'assets/player.png' },
      { name: 'StormChaser', kd: '1.60', avatar: 'assets/player.png' },
      { name: 'NightHawk', kd: '1.25', avatar: 'assets/player.png' }
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderFriends();
    this.initWelcomeModal();
    this.initCreateModal();
  }

  bindEvents() {
    // Code input
    const codeInput = document.getElementById('codeInput');
    if (codeInput) {
      codeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          alert('Code entered: ' + e.target.value);
        }
      });
    }

    // Copy code button
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => this.copyCode(copyCodeBtn));
    }

    // Duel buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('duel-btn')) {
        const friendName = e.target.getAttribute('data-friend');
        this.showCreateDuelModal(friendName);
      }
    });
  }

  renderFriends() {
    const friendsList = document.getElementById('friendsList');
    if (!friendsList) return;

    friendsList.innerHTML = '';
    this.friends.forEach(friend => {
      const item = document.createElement('div');
      item.className = 'friend-item';
      item.innerHTML = `
        <img src="${friend.avatar}" class="friend-avatar" alt="${friend.name}">
        <div class="friend-info">
          <div class="friend-name">${friend.name}</div>
          <div class="friend-kd">K/D: ${friend.kd}</div>
        </div>
        <button class="duel-btn" data-friend="${friend.name}">Duel</button>
      `;
      friendsList.appendChild(item);
    });
  }

  copyCode(button) {
    const userCode = 'FRIEND123_CODE';
    CommonUtils.copyToClipboard(userCode, button);
  }

  initWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    if (!welcomeModal) return;

    // Показываем модальное окно при загрузке
    welcomeModal.style.display = 'flex';

    // Закрытие по клику на крестик
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
      });
    }

    // Закрытие по клику вне модального окна
    welcomeModal.addEventListener('click', (e) => {
      if (e.target === welcomeModal) {
        welcomeModal.style.display = 'none';
      }
    });

    // Инициализация карусели
    this.initModalCarousel();
  }

  initModalCarousel() {
    const modalTrack = document.querySelector('.modal-track');
    const modalLogos = document.querySelectorAll('.modal-logo');
    
    if (!modalTrack || !modalLogos.length) return;

    const logosArray = Array.from(modalLogos);
    const minClones = 3;
    const currentLogoCount = logosArray.length;
    const originalLogoCount = currentLogoCount / 2;

    // Дублируем элементы для бесшовной прокрутки
    for (let i = 0; i < minClones * originalLogoCount; i++) {
      const clone = logosArray[i % originalLogoCount].cloneNode(true);
      modalTrack.appendChild(clone);
    }

    // Пауза при наведении
    modalTrack.addEventListener('mouseenter', () => {
      modalTrack.style.animationPlayState = 'paused';
    });

    modalTrack.addEventListener('mouseleave', () => {
      modalTrack.style.animationPlayState = 'running';
    });
  }

  initCreateModal() {
    const createModal = document.getElementById('createModal');
    if (!createModal) return;

    // Bind close button
    const closeCreateModalBtn = document.getElementById('closeCreateModal');
    if (closeCreateModalBtn) {
      closeCreateModalBtn.addEventListener('click', () => this.hideCreateModal());
    }

    // Close on outside click
    createModal.addEventListener('click', (e) => {
      if (e.target === createModal) {
        this.hideCreateModal();
      }
    });

    // Initialize form elements
    this.initCreateForm();
  }

  initCreateForm() {
    // Initialize custom selects
    CommonUtils.initCustomSelects();

    // Initialize keyboard input
    const amountDisplay = document.getElementById('amountValue');
    if (amountDisplay) {
      CommonUtils.initKeyboardInput(amountDisplay);
    }

    // Bind create button
    const createMatchBtn = document.getElementById('createMatchBtn');
    if (createMatchBtn) {
      createMatchBtn.addEventListener('click', () => this.createDuel());
    }
  }

  showCreateDuelModal(friendName) {
    const createModal = document.getElementById('createModal');
    if (!createModal) return;

    createModal.setAttribute('data-friend', friendName);
    createModal.style.display = 'block';

    // Reset form values
    const amountDisplay = document.getElementById('amountValue');
    const mapSelect = document.getElementById('mapSelect');
    const weaponSelect = document.getElementById('weaponSelect');
    const modeSelect = document.getElementById('modeSelect');
    const lobbySelect = document.getElementById('lobbySelect');

    if (amountDisplay) amountDisplay.textContent = '0';
    if (mapSelect) mapSelect.querySelector('.selected').textContent = 'Dust2 ▼';
    if (weaponSelect) weaponSelect.querySelector('.selected').textContent = 'AK-47 ▼';
    if (modeSelect) modeSelect.querySelector('.selected').textContent = '1v1 ▼';
    if (lobbySelect) lobbySelect.querySelector('.selected').textContent = 'Public ▼';
  }

  hideCreateModal() {
    const createModal = document.getElementById('createModal');
    if (createModal) {
      createModal.style.display = 'none';
      const amountDisplay = document.getElementById('amountValue');
      if (amountDisplay) amountDisplay.textContent = '0';
    }
  }

  createDuel() {
    const createModal = document.getElementById('createModal');
    const friendName = createModal.getAttribute('data-friend');
    
    const mapSelect = document.getElementById('mapSelect');
    const weaponSelect = document.getElementById('weaponSelect');
    const modeSelect = document.getElementById('modeSelect');
    const lobbySelect = document.getElementById('lobbySelect');
    const amountDisplay = document.getElementById('amountValue');

    if (!mapSelect || !weaponSelect || !modeSelect || !lobbySelect || !amountDisplay) return;

    const map = mapSelect.querySelector('.selected').textContent.trim().split(' ')[0];
    const weapon = weaponSelect.querySelector('.selected').textContent.trim().split(' ')[0];
    const mode = modeSelect.querySelector('.selected').textContent.trim().split(' ')[0];
    const lobby = lobbySelect.querySelector('.selected').textContent.trim().split(' ')[0];
    const stake = parseFloat(amountDisplay.textContent) || 0;

    // Валидация
    const validation = CommonUtils.validateForm({ map, weapon, stake });
    if (!validation.isValid) {
      CommonUtils.showNotification(validation.errors.join(', '), 'error');
      return;
    }

    // Показываем уведомление об успешном создании
    CommonUtils.showNotification(`Duel created with ${friendName}!`, 'success');
    
    // Закрываем модальное окно
    this.hideCreateModal();
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new FriendsPage();
});
