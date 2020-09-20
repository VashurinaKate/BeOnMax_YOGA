function modal() {
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
}

module.exports = modal;