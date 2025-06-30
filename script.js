$(document).ready(function() {

    // Бургер-меню
    $('#mobile-menu').click(function() {
        $(this).toggleClass('active');
        $('#main-menu').toggleClass('active');
    });

    // Закрытие меню при клике на пункт
    $('#main-menu a').click(function() {
        $('#mobile-menu').removeClass('active');
        $('#main-menu').removeClass('active');
    });
    
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop();
        var documentHeight = $(document).height() - $(window).height();
        var scrollPercentage = scrollPos / documentHeight;

        // Определите начальный и конечный цвета в формате RGB
        var color1 = { r: 255, g: 193, b: 7 }; // Желтый цвет (#ffc107)
        var color2 = { r: 245, g: 245, b: 220 }; // Светло-бежевый цвет (#f5f5dc)

        // Интерполируйте цвета
        var newR = Math.round(color1.r + (color2.r - color1.r) * scrollPercentage);
        var newG = Math.round(color1.g + (color2.g - color1.g) * scrollPercentage);
        var newB = Math.round(color1.b + (color2.b - color1.b) * scrollPercentage);

        // Создайте новый RGB цвет
        var newColor = "rgb(" + newR + "," + newG + "," + newB + ")";

        // Примените цвет к фону body
        $('body').css('backgroundColor', newColor);
    });

    // Заполнение текста при наведении
    $('.hexagon-product').each(function() {
        var title = $(this).data('title');
        var description = $(this).data('description');
        var hoverText = '<h3 class="hover-title">' + title + '</h3><p class="hover-description">' + description + '</p>';
        $(this).find('.hexagon-hover-text').html(hoverText);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let isTransitioning = false;
    
    // Инициализация слайдера
    function initSlider() {
        // Установка правильной ширины для каждого слайда
        slides.forEach(slide => {
            slide.style.width = '100%';
            slide.style.flexShrink = '0';
        });
        
        // Показываем первый слайд
        updateSlider();
    }
    
    // Функция обновления слайдера
    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Плавный переход
        sliderTrack.style.transition = 'transform 0.5s ease';
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Обновление точек навигации
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Сброс флага после завершения анимации
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    // Переключение на следующий слайд
    function nextSlide() {
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }
    
    // Переключение на предыдущий слайд
    function prevSlide() {
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Обработчики кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Обработчики точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning || index === currentIndex) return;
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Обработчики свайпов
    let touchStartX = 0;
    let touchEndX = 0;
    const slider = document.querySelector('.slider');
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (isTransitioning) return;
        
        const threshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (difference > threshold) {
            nextSlide(); // Свайп влево
        } else if (difference < -threshold) {
            prevSlide(); // Свайп вправо
        }
    }
    
    // Инициализация слайдера
    initSlider();
    
    // Автопереключение слайдов (опционально)
    // setInterval(nextSlide, 5000);
});