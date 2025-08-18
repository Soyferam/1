// Общие функции для всех страниц

// Функция для копирования кода в буфер обмена
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.textContent;
    const originalBackground = buttonElement.style.background;
    const originalColor = buttonElement.style.color;
    
    buttonElement.textContent = 'Copied!';
    buttonElement.style.background = '#00ff66';
    buttonElement.style.color = '#000';
    
    setTimeout(() => {
      buttonElement.textContent = originalText;
      buttonElement.style.background = originalBackground;
      buttonElement.style.color = originalColor;
    }, 2000);
  }).catch(() => {
    alert('Code: ' + text);
  });
}

// Функция для работы с custom select элементами
function initCustomSelects() {
  const customSelects = document.querySelectorAll('.custom-select');
  
  customSelects.forEach(select => {
    select.addEventListener('click', (e) => {
      e.stopPropagation();
      customSelects.forEach(s => s.classList.remove('open'));
      select.classList.toggle('open');
    });

    const options = select.querySelectorAll('.options div');
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selected = select.querySelector('.selected');
        selected.textContent = option.textContent + ' ▼';
        select.classList.remove('open');
      });
    });
  });

  // Закрытие при клике вне select
  document.addEventListener('click', e => {
    customSelects.forEach(select => {
      if (!select.contains(e.target) && e.target !== select) {
        select.classList.remove('open');
      }
    });
  });
}

// Функция для работы с клавиатурой ввода суммы
function initKeyboardInput(amountDisplay) {
  const keys = document.querySelectorAll('.key');
  
  keys.forEach(key => {
    key.addEventListener('click', () => {
      const value = key.getAttribute('data-value');
      let currentValue = amountDisplay.textContent;

      if (value === 'delete') {
        currentValue = currentValue.slice(0, -1) || '0';
      } else if (value === '.' && currentValue.includes('.')) {
        return; // Предотвращаем добавление второй точки
      } else if (currentValue === '0' && value !== '.') {
        currentValue = value;
      } else {
        currentValue += value;
      }

      // Удаляем ведущие нули, если число не дробное
      if (!currentValue.includes('.')) {
        currentValue = parseInt(currentValue, 10).toString();
      }
      amountDisplay.textContent = currentValue === '' ? '0' : currentValue;
    });
  });
}

// Функция для создания модального окна
function createModal(id, content, options = {}) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = id;
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.innerHTML = content;
  
  if (options.closeButton !== false) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modalContent.appendChild(closeBtn);
  }
  
  modal.appendChild(modalContent);
  
  // Закрытие по клику вне модального окна
  if (options.closeOnOutsideClick !== false) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
  
  document.body.appendChild(modal);
  return modal;
}

// Функция для показа/скрытия модального окна
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'block';
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'none';
}

// Функция для валидации формы
function validateForm(formData) {
  const errors = [];
  
  if (!formData.map) errors.push('Map is required');
  if (!formData.weapon) errors.push('Weapon is required');
  if (!formData.stake || formData.stake <= 0) errors.push('Valid stake amount is required');
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// Функция для показа уведомлений
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card);
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    border: 2px solid var(--accent-green);
    z-index: 10000;
    font-weight: 600;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Анимация появления
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Автоматическое скрытие
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, duration);
}

// Функция для форматирования чисел
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Функция для debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Функция для throttle
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Экспорт функций для использования в других модулях
window.CommonUtils = {
  copyToClipboard,
  initCustomSelects,
  initKeyboardInput,
  createModal,
  showModal,
  hideModal,
  validateForm,
  showNotification,
  formatNumber,
  debounce,
  throttle
};
