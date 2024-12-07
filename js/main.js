/* Анимация чисел */
document.addEventListener("DOMContentLoaded", function () {
    const aboutItems = document.querySelectorAll('.about-list-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers(entry.target);
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    aboutItems.forEach(item => {
        observer.observe(item);
    });

    function animateNumbers(item) {
        // Извлечение текста и удаление пробелов, чтобы получить корректное число
        const textValue = item.querySelector('.about-item-title').textContent.trim();
        const number = parseInt(textValue.replace(/\s/g, '')); // Удаление пробелов из текста
        const display = item.querySelector('.about-item-title');
    
        let start = 0;
        const duration = 2000; // продолжительность анимации
        const incrementTime = Math.ceil(duration / number); // расчёт времени на каждое увеличение
    
        const increment = () => {
            if (start < number) {
                start++;
                // Обновление текста с учетом пробелов
                display.textContent = start.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Форматирование с пробелами
                setTimeout(increment, incrementTime);
            } else {
                display.textContent = textValue; // Обеспечивает отображение конечного значения
            }
        };
    
        increment();
    }
    
});


// Открытие попапа
document.querySelector('.join-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки
    document.getElementById('popup').style.display = 'flex';
});

// Закрытие попапа по нажатию на крестик
document.getElementById('close').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

// Закрытие попапа по клику на фон
document.getElementById('popup').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

// Маска для ввода номера телефона (например, +7 (___) ___-__-__)
document.getElementById('phone').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9() +]/g, '');
});



