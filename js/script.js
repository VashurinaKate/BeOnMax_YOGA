
window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // -------- Создаем рабочие табы --------
   
    let tab = document.querySelectorAll('.info-header-tab'), // каждый заголовок табов
        info = document.querySelector('.info-header'), // нужен родитель для всех заголовков табов
        tabContent = document.querySelectorAll('.info-tabcontent');
     // нужен родитель для всех контейнеров табов 
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show'); // удаляем класс show (see in css: .content .info .show)
            tabContent[i].classList.add('hide'); // добавляем класс hide (see in css: .content .info .hide) // (display: none);
        } // Скрываем все tab content 
    }

    hideTabContent(1); // скрываем все, кроме первого

    function showTabContent(b) { // именно тот content, который нам нужен
        if (tabContent[b].classList.contains('hide')) { // проверяем, действительно ли этот элемент скрыт
            tabContent[b].classList.remove('hide');// убираем скрытие
            tabContent[b].classList.add('show'); // добывляем show (показываем)
        }
    } // Показываем элементы tab-content

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) { //защ от дурака: клик только на info-header-tab
            for (let i = 0; i < tab.length; i++) {//проходимся по всем табам
                if (target == tab[i]) { // если кликаем на определенный таб, то открывается только он, остальные скрыты 
                    hideTabContent(0); // скрываем ВСЕ табы
                    showTabContent(i); // показываем только тот элемент, который нам нужен
                    break;
                }
            }
        }
    });

    // TIMER

    let deadline = '2019-09-10';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock (id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                if (num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0 ) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);



    // --------View More---------- modal

    let more = document.querySelector('.more'),
        descrBtn = document.querySelectorAll('.description-btn'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
       // -------Первый способ задания клика всем кнопкам "подробнее"-----
        function handler() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
        };
        for (let i = 0; i < descrBtn.length; i++) {
            descrBtn[i].onclick = handler;
        }
        more.onclick = handler;

        function closing () {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
        };
        close.onclick = closing;

        // -------Второй способ (более длинный) --------
    //     for (let i = 0; i < descrBtn.length; i++) {
    //         descrBtn[i].addEventListener('click', function() {
    //             overlay.style.display = 'block';
    //             this.classList.add('more-splash');
    //         });
    //     };
    
    //     more.addEventListener('click', function (event) {
    //         let target = event.target;
    //         if (target && target.classList.contains('more')) {
    //         overlay.style.display = 'block';
    //         this.classList.add('more-splash');

    //         // document.body.style.overflow = 'hidden'; // запрет прокрутки страница при открытом модальном окне (если требуется)
    //         };
    //     });

    // close.addEventListener('click', function() {
    //     overlay.style.display = 'none';
    //     more.classList.remove('more-splash');

    //     // document.body.style.overflow = ''; // отмена запрета прокрутки
    // });


    //-----SLIDER-------
    let sliderItem = document.querySelectorAll('.slider-item fade'),
        sliderDots = document.querySelectorAll('.slider-dots'),
        wrap = document.querySelector('.wrap');
    
    function slide(c) {
        for (let i = c; i < sliderItem.length; i++) {
            sliderItem[i].classList.remove('next');
            sliderItem[i].classList.add('prev');
        }
    }
    slide(1);


    // --------FORM----------

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // отмена стандартного поведения браузера - в данном случае при отравке формы сраница не перезагружается
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8'); // настройки заголовков http запросов

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });// превращаем в json формат
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading; // если грузится, сюда можно поместить значок загрузки
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }// очищаем инпуты
    });
}); // Выполнение скрипта начнется только тогда, когда прогрузятся основные элементы дерева DOM

