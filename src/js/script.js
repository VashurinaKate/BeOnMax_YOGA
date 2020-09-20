
window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let calc = require('./parts/calc'),
        form = require('./parts/form.js'),
        slider = require('./parts/slider.js'),
        tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js'),
        modal = require('./parts/modal.js');

    calc();
    form();
    slider();
    tabs();
    timer();
    modal();
   
}); // Выполнение скрипта начнется только тогда, когда прогрузятся основные элементы дерева DOM
