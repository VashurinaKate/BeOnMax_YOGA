
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

    let form = document.querySelector('.main-form')[0],
        formBottom = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
// *метод без promise*
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault(); // отмена стандартного поведения браузера - в данном случае при отравке формы сраница не перезагружается
    //     form.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8'); // настройки заголовков http запросов

    //     let formData = new FormData(form);

    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });// превращаем в json формат
    //     let json = JSON.stringify(obj);

    //     request.send(json);

    //     request.addEventListener('readystatechange', function() {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading; // если грузится, сюда можно поместить значок загрузки
    //         } else if (request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //     }// очищаем инпуты
    // });
// *метод с promise*
    function sendForm(elem) {
        elem.addEventListener('submit', function(e){
            e.preventDefault();
                elem.appendChild(statusMessage);
                let formData = new FormData(elem);

                function postData(data) {
                    return new Promise(function(resolve, reject){
                        let request = new XMLHttpRequest();

                        request.open('POST', 'server.php');

                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                        request.onreadystatechange = function() {
                            if (request.readyState < 4) {
                                resolve()
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.status < 300) {
                                    resolve()
                                }
                                else {
                                    reject()
                                }
                            }
                        }
                        request.send(data);
                    })
                } // End postData
            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(()=> statusMessage.innerHTML = message.loading)
                .then(()=> {
                    thanksModal.style.display = 'block';
                    mainModal.style.display = 'none';
                    statusMessage.innerHTML = '';
                })
                .catch(()=> statusMessage.innerHTML = message.failure)
                .then(clearInput)
        });
    }
    sendForm(form);
    sendForm(formBottom)

    // ------SLIDER------

    let slideIndex = 1, //параметр текущего слайда
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i =0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    // --------CALC-------

    let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;

    totalValue.innerHTML = 0; //Вписываем изначальную сумму

    persons.addEventListener('input', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0; //проверка на ввод, если оба поля пустые
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('input', function() {
        
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0; //проверка на ввод, если оба поля пустые
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total; // промежуточная переменная
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    })
}); // Выполнение скрипта начнется только тогда, когда прогрузятся основные элементы дерева DOM

