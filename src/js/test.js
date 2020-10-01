describe('Таймер', function() {
    it('Возвращает ли функция объект?', function() {
        assert.typeOf(getTimeRemaining(), 'object') // ошибка потому что не видно модуль timer
    })
    it('Устанавливаем таймер обратного отсчета', function() {
        assert.typeOf(setClock('timer', 'deadline'), 'string');
    })
    describe('Общая сумма', function(){
        it('Изначально равен 0', function() {
            assert.equal(total, 0)
        })
    });
    
});
// проверяем переменную 
