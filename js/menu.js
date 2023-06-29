$(document).ready(function() {
    $('.burger').click(function() {
        $('.burger').toggleClass('open-menu');
        $('nav').toggleClass('open-menu');
        
    });
});

$(document).ready(function() {
    $('.nav-item, .nav-item-mob').click(function(){
        $('nav').toggleClass('open-menu');
        $('.burger').toggleClass('open-menu');
    });
});