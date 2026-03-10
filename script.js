// Обработка формы
const form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const status = document.createElement('p');
        status.style.marginTop = "20px";
        status.style.fontWeight = "700";

        const data = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.textContent = "Спасибо! Сообщение успешно отправлено.";
                status.style.color = "green";
                form.reset();
            } else {
                status.textContent = "Упс! Возникла проблема при отправке.";
                status.style.color = "red";
            }
        } catch (error) {
            status.textContent = "Ошибка сети. Попробуйте позже.";
            status.style.color = "red";
        }

        form.appendChild(status);

        setTimeout(() => status.remove(), 5000);
    });
}

// Мобильное меню
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    if (hamburger) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}));

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Подсветка активного раздела
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Анимация при загрузке
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Загружаем сохраненные настройки
    loadSettings();
});

// Темы и цвета

// Элементы
const darkModeToggle = document.getElementById('darkModeToggle');
const colorOptions = document.querySelectorAll('.color-option');

// Загрузка сохраненных настроек
function loadSettings() {
    const savedTheme = localStorage.getItem('full-theme');
    const savedColor = localStorage.getItem('theme-color');
    
    // Убираем все классы тем
    document.body.classList.remove('dark-theme', 'theme-beige', 'theme-pink', 'theme-blue', 'theme-green', 'theme-purple');
    
    // Применяем сохраненную тему или бежевую по умолчанию
    if (savedColor && savedColor !== 'beige') {
        document.body.classList.add(`theme-${savedColor}`);
    } else {
        document.body.classList.add('theme-beige');
    }
    
    // Применяем сохраненную темную тему или светлую по умолчанию
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Устанавливаем подсветку кнопок
    updateActiveButton(savedColor);
}

// Обновление подсветки активной кнопки
function updateActiveButton(color) {
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (color && color !== 'beige' && option.dataset.color === color) {
            option.classList.add('active');
        }
    });
}

// Переключение темной/светлой темы
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        // Переключаем класс dark-theme
        document.body.classList.toggle('dark-theme');
        
        // Меняем иконку
        const isDark = document.body.classList.contains('dark-theme');
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Сохраняем настройку
        localStorage.setItem('full-theme', isDark ? 'dark' : 'light');
    });
}

// Функция применения цветовой темы
function applyColorTheme(color) {
    // Удаляем все цветовые классы
    document.body.classList.remove('theme-beige', 'theme-pink', 'theme-blue', 'theme-green', 'theme-purple');
    
    if (color === 'beige') {
        // Бежевая тема
        document.body.classList.add('theme-beige');
        localStorage.removeItem('theme-color');
        updateActiveButton(null);
    } else {
        // Цветная тема
        document.body.classList.add(`theme-${color}`);
        localStorage.setItem('theme-color', color);
        updateActiveButton(color);
    }
}

// Обработчики для цветных кнопок
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const color = option.dataset.color;
        const isActive = option.classList.contains('active');
        
        if (isActive) {
            // Если кнопка уже активна - возвращаем бежевую тему
            applyColorTheme('beige');
        } else {
            // Если кнопка не активна - применяем выбранный цвет
            applyColorTheme(color);
        }
    });
});