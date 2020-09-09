
// -------- Создаем рабочие табы ---------

window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'), // каждый заголовок табов
        info = document.querySelector('.info-header'), // нужен родитель для всех заголовков табов
        tabContent = document.querySelectorAll('.info-tabcontent'); // нужен родитель для всех контейнеров табов 
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

}); // Выполнение скрипта начнется только тогда, когда прогрузятся основные элементы дерева DOM

