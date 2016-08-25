$(document).ready(function() {

    var container = $('.container');
    var money = null;
    var minDistance = 20;

    addMoney();

    function addMoney() {
        var travel = 0;
        money = $('<img>').attr('src', 'static/img/dollarbillrotate.png');
        money.attr('id', 'money');
        money.attr('height', 1200);
        container.append(money);
        console.log(money);
        money.draggable({
            containment: 'parent',
            revert: true,
            revertDuration: 0,
            drag: function() {
        
                if ($(this).css('top') === 0) {
                    // send 
                }
            }
        });
    }
});