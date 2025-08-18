// JavaScript для главной страницы (index.html)

class HomePage {
  constructor() {
    this.sample = [
      {id: 1, stake: 1, map: 'Dust2', weapon: 'AK-47', player: 'Player1', avatar: 'assets/player.png'},
      {id: 2, stake: 2, map: 'Inferno', weapon: 'M4A4', player: 'Player2', avatar: 'assets/player.png'},
      {id: 3, stake: 1, map: 'Nuke', weapon: 'AWP', player: 'Player3', avatar: 'assets/player.png'},
      {id: 4, stake: 5, map: 'Dust2', weapon: 'AK-47', player: 'Player4', avatar: 'assets/player.png'},
      {id: 5, stake: 1, map: 'Mirage', weapon: 'Desert Eagle', player: 'Player5', avatar: 'assets/player.png'},
      {id: 6, stake: 1, map: 'Dust2', weapon: 'AK-47', player: 'Player6', avatar: 'assets/player.png'},
      {id: 7, stake: 7, map: 'Overpass', weapon: 'AK-47', player: 'Player7', avatar: 'assets/player.png'},
      {id: 8, stake: 3, map: 'Dust2', weapon: 'M4A1', player: 'Player8', avatar: 'assets/player.png'},
    ];

    this.statsData = [
      { match: 1, result: 'win', amount: 10, weapon: 'AK-47', map: 'Dust2', balance: 10 },
      { match: 2, result: 'win', amount: 15, weapon: 'AWP', map: 'Mirage', balance: 25 },
      { match: 3, result: 'loss', amount: -8, weapon: 'M4A4', map: 'Inferno', balance: 17 },
      { match: 4, result: 'win', amount: 12, weapon: 'AK-47', map: 'Dust2', balance: 29 },
      { match: 5, result: 'loss', amount: -15, weapon: 'Desert Eagle', map: 'Nuke', balance: 14 },
      { match: 6, result: 'win', amount: 20, weapon: 'AWP', map: 'Mirage', balance: 34 },
      { match: 7, result: 'loss', amount: -12, weapon: 'M4A1-S', map: 'Cache', balance: 22 },
      { match: 8, result: 'win', amount: 18, weapon: 'AK-47', map: 'Dust2', balance: 40 },
      { match: 9, result: 'win', amount: 25, weapon: 'AWP', map: 'Overpass', balance: 65 },
      { match: 10, result: 'loss', amount: -10, weapon: 'P90', map: 'Mirage', balance: 55 }
    ];

    this.notifications = [
      { type: 'match', id: 'friend1', avatar: 'assets/player.png', name: 'Friend1', map: 'Dust2', weapon: 'AK-47', stake: 1 },
      { type: 'match', id: 'friend2', avatar: 'assets/player.png', name: 'Friend2', map: 'Inferno', weapon: 'M4A4', stake: 2 },
      { 
        type: 'message', 
        avatar: 'assets/dev.png', 
        name: 'Frag Arena Team', 
        message: 'Приветствуем тебя в Frag Arena! Готов к захватывающим 1 на 1 сражениям и настоящему драйву? Вноси депозит, получай уникальный код для подключения к матчу в CS2 и докажи, кто тут настоящий чемпион! Удачи и побед! 💥🎮',
        shortMessage: 'Приветствуем тебя в Frag Arena! Готов к сражениям?...' 
      }
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
    this.renderNotifications();
    this.updateNotificationCount();
  }

  bindEvents() {
    // Create match button
    const createBtn = document.getElementById('createBtn');
    if (createBtn) {
      createBtn.addEventListener('click', () => this.showCreateModal());
    }

    // Code input
    const codeInput = document.getElementById('codeInput');
    if (codeInput) {
      codeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          alert('Code entered: ' + e.target.value);
        }
      });
    }

    // Profile button
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => this.showProfileModal());
    }

    // Bell button
    const bellBtn = document.getElementById('bellBtn');
    if (bellBtn) {
      bellBtn.addEventListener('click', () => this.showNotificationModal());
    }

    // Accept buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.accept')) {
        this.handleAcceptClick(e.target);
      }
    });
  }

  render() {
    const list = document.getElementById('matchesList');
    if (!list) return;

    list.innerHTML = '';
    this.sample.forEach(s => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="player-meta">
          <img src="${s.avatar}" class="player-avatar" alt="Player avatar">
          <div style="font-size:12px;color:var(--muted)">${s.player}</div>
        </div>
        <div class="crypto">
          <img src="assets/ton.png" style="width:14px;height:14px;border-radius:50%" alt="TON logo">
          <div>${s.stake}</div>
        </div>
        <div class="map">${s.map}</div>
        <div class="weapon">${s.weapon}</div>
        <div class="accept-wrap">
          <button class="accept" data-id="${s.id}" data-avatar="${s.avatar}" data-player="${s.player}" data-map="${s.map}" data-weapon="${s.weapon}" data-stake="${s.stake}">ACCEPT</button>
        </div>
      `;
      list.appendChild(card);
    });
  }

  renderNotifications() {
    const notificationList = document.getElementById('notificationList');
    if (!notificationList) return;

    notificationList.innerHTML = '';
    this.notifications.forEach(notif => {
      const item = document.createElement('div');
      item.className = 'notification-item';
      if (notif.type === 'match') {
        item.className += ' match';
        item.innerHTML = `
          <div class="player-meta">
            <img src="${notif.avatar}" class="avatar" alt="${notif.name}">
            <div class="name">${notif.name}</div>
          </div>
          <div class="crypto">
            <img src="assets/ton.png" style="width:14px;height:14px;border-radius:50%" alt="TON logo">
            <div>${notif.stake}</div>
          </div>
          <div class="map">${notif.map}</div>
          <div class="weapon">${notif.weapon}</div>
          <div class="accept-wrap">
            <button class="accept" data-id="${notif.id}" data-avatar="${notif.avatar}" data-player="${notif.name}" data-map="${notif.map}" data-weapon="${notif.weapon}" data-stake="${notif.stake}">Accept</button>
          </div>
        `;
      } else {
        item.innerHTML = `
          <img src="${notif.avatar}" class="avatar" alt="${notif.name}">
          <div>
            <div>${notif.name}</div>
            <div class="message" data-full="${notif.message}">${notif.shortMessage}</div>
          </div>
          <div></div>
        `;
      }
      notificationList.appendChild(item);
    });

    // Bind message click events
    const messageElements = notificationList.querySelectorAll('.message');
    messageElements.forEach(message => {
      message.addEventListener('click', () => this.showFullMessage(message.getAttribute('data-full')));
    });
  }

  updateNotificationCount() {
    const notif = document.getElementById('notif');
    if (notif) {
      notif.textContent = this.notifications.filter(n => n.type === 'match').length;
    }
  }

  showCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.style.display = 'block';
      this.initCreateModal();
    }
  }

  showProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.style.display = 'block';
      this.drawChart();
      this.renderStatsList();
    }
  }

  showNotificationModal() {
    const modal = document.getElementById('notificationModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  showFullMessage(message) {
    const notificationModal = document.getElementById('notificationModal');
    const fullMessageModal = document.getElementById('fullMessageModal');
    const fullMessageContent = document.getElementById('fullMessageContent');
    
    if (notificationModal && fullMessageModal && fullMessageContent) {
      notificationModal.style.display = 'none';
      fullMessageContent.innerHTML = `<div>${message}</div>`;
      fullMessageModal.style.display = 'block';
    }
  }

  handleAcceptClick(button) {
    const id = button.getAttribute('data-id');
    const avatar = button.getAttribute('data-avatar');
    const player = button.getAttribute('data-player');
    const map = button.getAttribute('data-map');
    const weapon = button.getAttribute('data-weapon');
    const stake = button.getAttribute('data-stake');

    this.showAcceptModal({ id, avatar, player, map, weapon, stake });
  }

  showAcceptModal(data) {
    const acceptModal = document.getElementById('acceptModal');
    if (!acceptModal) return;

    acceptModal.style.display = 'block';

    // Update modal content
    const acceptAvatar = document.getElementById('acceptAvatar');
    const acceptName = document.getElementById('acceptName');
    const acceptMap = document.getElementById('acceptMap');
    const acceptWeapon = document.getElementById('acceptWeapon');
    const acceptStakeSpan = document.getElementById('acceptStake')?.querySelector('span');

    if (acceptAvatar) acceptAvatar.src = data.avatar || 'assets/player.png';
    if (acceptName) acceptName.textContent = data.player || 'Unknown';
    if (acceptMap) acceptMap.textContent = data.map || '';
    if (acceptWeapon) acceptWeapon.textContent = data.weapon || '';
    if (acceptStakeSpan) acceptStakeSpan.textContent = data.stake || '0';

    // Reset modal state
    const connectCode = document.getElementById('connectCode');
    const timer = document.getElementById('timer');
    const confirmAcceptBtn = document.getElementById('confirmAcceptBtn');

    if (connectCode) connectCode.style.display = 'none';
    if (timer) timer.style.display = 'none';
    if (confirmAcceptBtn) {
      confirmAcceptBtn.textContent = 'ACCEPT';
      confirmAcceptBtn.disabled = false;
      confirmAcceptBtn.style.background = 'var(--accent-green)';
      confirmAcceptBtn.style.color = '#000';
      confirmAcceptBtn.style.cursor = 'pointer';
      confirmAcceptBtn.dataset.id = data.id;
    }

    // Bind confirm button
    if (confirmAcceptBtn) {
      confirmAcceptBtn.onclick = () => this.handleConfirmAccept(data.id);
    }
  }

  handleConfirmAccept(id) {
    const connectCode = document.getElementById('connectCode');
    const timer = document.getElementById('timer');
    const confirmAcceptBtn = document.getElementById('confirmAcceptBtn');

    if (!connectCode || !timer || !confirmAcceptBtn) return;

    // Show connection code and timer
    connectCode.style.display = 'block';
    connectCode.textContent = `connect server.cs2arena.com:${Math.floor(10000 + Math.random() * 90000)}`;
    timer.style.display = 'block';

    // Play sound
    const audio = new Audio('assets/accept.mp3');
    audio.play().catch(err => console.error('Audio play error:', err));

    // Start timer
    let timeLeft = 60;
    timer.textContent = `Connect within: ${timeLeft}s`;
    confirmAcceptBtn.textContent = '✓ ACCEPTED';
    confirmAcceptBtn.disabled = true;
    confirmAcceptBtn.style.background = '#666';
    confirmAcceptBtn.style.color = '#fff';
    confirmAcceptBtn.style.cursor = 'default';

    const timerInterval = setInterval(() => {
      timeLeft--;
      timer.textContent = `Connect within: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        const acceptModal = document.getElementById('acceptModal');
        if (acceptModal) acceptModal.style.display = 'none';
      }
    }, 1000);

    // Remove match from list
    const matchIndex = this.sample.findIndex(s => s.id.toString() === id);
    if (matchIndex !== -1) {
      this.sample.splice(matchIndex, 1);
      this.render();
    }

    // Remove notification
    const notifIndex = this.notifications.findIndex(n => n.id === id && n.type === 'match');
    if (notifIndex !== -1) {
      this.notifications.splice(notifIndex, 1);
      this.updateNotificationCount();
      this.renderNotifications();
    }
  }

  initCreateModal() {
    // Initialize custom selects
    CommonUtils.initCustomSelects();

    // Initialize keyboard input
    const amountDisplay = document.getElementById('amountValue');
    if (amountDisplay) {
      CommonUtils.initKeyboardInput(amountDisplay);
    }

    // Bind create match button
    const createMatchBtn = document.getElementById('createMatchBtn');
    if (createMatchBtn) {
      createMatchBtn.addEventListener('click', () => this.createMatch());
    }

    // Bind close button
    const closeCreateModalBtn = document.getElementById('closeCreateModal');
    if (closeCreateModalBtn) {
      closeCreateModalBtn.addEventListener('click', () => this.hideCreateModal());
    }

    // Close on outside click
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hideCreateModal();
        }
      });
    }
  }

  hideCreateModal() {
    const modal = document.getElementById('createModal');
    if (modal) {
      modal.style.display = 'none';
      const amountDisplay = document.getElementById('amountValue');
      if (amountDisplay) amountDisplay.textContent = '0';
    }
  }

  createMatch() {
    const mapSelect = document.getElementById('mapSelect');
    const weaponSelect = document.getElementById('weaponSelect');
    const amountDisplay = document.getElementById('amountValue');

    if (!mapSelect || !weaponSelect || !amountDisplay) return;

    const map = mapSelect.querySelector('.selected').textContent.trim().split(' ')[0];
    const weapon = weaponSelect.querySelector('.selected').textContent.trim().split(' ')[0];
    const stake = parseFloat(amountDisplay.textContent) || 0;

    this.sample.unshift({
      id: Date.now(),
      stake: stake,
      map: map,
      weapon: weapon,
      player: `Player${this.sample.length + 1}`,
      avatar: 'assets/player.png'
    });

    this.render();
    this.hideCreateModal();
  }

  drawChart() {
    const statsChart = document.getElementById('statsChart');
    if (!statsChart) return;

    const chartWidth = 350;
    const chartHeight = 150;
    const padding = 20;
    const dataWidth = chartWidth - padding * 2;
    const dataHeight = chartHeight - padding * 2;
    
    const maxBalance = Math.max(...this.statsData.map(d => d.balance));
    const minBalance = Math.min(...this.statsData.map(d => d.balance));
    const balanceRange = maxBalance - minBalance;
    
    let pathData = '';
    const points = [];
    
    this.statsData.forEach((data, index) => {
      const x = padding + (index / (this.statsData.length - 1)) * dataWidth;
      const y = padding + ((maxBalance - data.balance) / balanceRange) * dataHeight;
      
      points.push({ x, y, data });
      
      if (index === 0) {
        pathData += `M ${x} ${y}`;
      } else {
        pathData += ` L ${x} ${y}`;
      }
    });
    
    statsChart.innerHTML = '';
    
    // Create chart elements
    this.createChartElements(statsChart, pathData, points, chartWidth, chartHeight, padding);
    
    // Bind chart events
    this.bindChartEvents(statsChart, points, chartWidth, chartHeight);
  }

  createChartElements(chart, pathData, points, chartWidth, chartHeight, padding) {
    // Create definitions
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'chartGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:rgba(0,255,102,0.3);stop-opacity:1');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', 'stop-color:rgba(0,255,102,0);stop-opacity:0');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    chart.appendChild(defs);
    
    // Create area path
    const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const areaData = pathData + ` L ${points[points.length - 1].x} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`;
    areaPath.setAttribute('d', areaData);
    areaPath.setAttribute('fill', 'url(#chartGradient)');
    chart.appendChild(areaPath);
    
    // Create line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('d', pathData);
    line.setAttribute('class', 'chart-line');
    chart.appendChild(line);
    
    // Create points
    points.forEach((point, index) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', point.x);
      circle.setAttribute('cy', point.y);
      circle.setAttribute('r', 5);
      circle.setAttribute('class', 'chart-point');
      circle.setAttribute('data-index', index);
      chart.appendChild(circle);
    });
  }

  bindChartEvents(chart, points, chartWidth, chartHeight) {
    const chartCursor = document.getElementById('chartCursor');
    const chartTooltip = document.getElementById('chartTooltip');
    
    if (!chartCursor || !chartTooltip) return;

    let activePointIndex = -1;
    
    const showDataAtPoint = (index) => {
      if (index < 0 || index >= points.length) return;
      
      const point = points[index];
      const data = point.data;
      
      activePointIndex = index;
      
      chartCursor.style.left = `${(point.x / chartWidth) * 100}%`;
      chartCursor.style.opacity = '1';
      
      chartTooltip.innerHTML = `
        <div>${data.result === 'win' ? 'Победа' : 'Поражение'}</div>
        <div>${data.amount > 0 ? '+' : ''}${data.amount} TON</div>
        <div>Баланс: ${data.balance} TON</div>
      `;
      
      const tooltipX = Math.min(Math.max((point.x / chartWidth) * 100, 10), 90);
      chartTooltip.style.left = `${tooltipX}%`;
      chartTooltip.style.top = `${Math.max((point.y / chartHeight) * 100 - 15, 5)}%`;
      chartTooltip.style.opacity = '1';
      
      const allPoints = chart.querySelectorAll('.chart-point');
      allPoints.forEach((p, i) => {
        if (i === index) {
          p.setAttribute('r', '7');
          p.setAttribute('fill', '#fff');
        } else {
          p.setAttribute('r', '5');
          p.setAttribute('fill', 'var(--accent-green)');
        }
      });
    };
    
    const hideData = () => {
      activePointIndex = -1;
      chartCursor.style.opacity = '0';
      chartTooltip.style.opacity = '0';
      
      const allPoints = chart.querySelectorAll('.chart-point');
      allPoints.forEach(p => {
        p.setAttribute('r', '5');
        p.setAttribute('fill', 'var(--accent-green)');
      });
    };
    
    const findNearestPointIndex = (mouseX) => {
      let nearestIndex = 0;
      let minDistance = Math.abs(points[0].x - mouseX);
      
      for (let i = 1; i < points.length; i++) {
        const distance = Math.abs(points[i].x - mouseX);
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = i;
        }
      }
      
      return nearestIndex;
    };
    
    // Mouse events
    chart.addEventListener('mousemove', (e) => {
      const rect = chart.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * chartWidth;
      
      const nearestIndex = findNearestPointIndex(mouseX);
      
      if (nearestIndex !== activePointIndex) {
        showDataAtPoint(nearestIndex);
      }
    });
    
    chart.addEventListener('mouseleave', hideData);
    
    // Touch events
    chart.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = chart.getBoundingClientRect();
      const touchX = ((touch.clientX - rect.left) / rect.width) * chartWidth;
      
      const nearestIndex = findNearestPointIndex(touchX);
      showDataAtPoint(nearestIndex);
    });
    
    chart.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = chart.getBoundingClientRect();
      const touchX = ((touch.clientX - rect.left) / rect.width) * chartWidth;
      
      const nearestIndex = findNearestPointIndex(touchX);
      
      if (nearestIndex !== activePointIndex) {
        showDataAtPoint(nearestIndex);
      }
    });
    
    chart.addEventListener('touchend', (e) => {
      e.preventDefault();
      setTimeout(hideData, 3000);
    });
    
    // Click events
    chart.addEventListener('click', (e) => {
      const rect = chart.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * chartWidth;
      
      const nearestIndex = findNearestPointIndex(clickX);
      showDataAtPoint(nearestIndex);
    });
  }

  renderStatsList() {
    const statsList = document.getElementById('statsList');
    if (!statsList) return;

    statsList.innerHTML = '';
    [...this.statsData].reverse().forEach(stat => {
      const item = document.createElement('div');
      item.className = `stats-item ${stat.result}`;
      
      item.innerHTML = `
        <div class="stats-left">
          <div class="stats-result ${stat.result}">
            ${stat.result === 'win' ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ'}
          </div>
          <div class="stats-details">
            ${stat.weapon} • ${stat.map}
          </div>
        </div>
        <div class="stats-amount ${stat.result}">
          ${stat.amount > 0 ? '+' : ''}${stat.amount} TON
        </div>
      `;
      
      statsList.appendChild(item);
    });
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new HomePage();
});
