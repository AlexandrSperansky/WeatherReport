$(document).ready(function() {
    $('.burger').click(function() {
        menuToggle()
        
    });
    $('.nav-item, .nav-item-mob').click(function(){
        menuToggle()
    });
});

const menuToggle = () => {
    $('nav').toggleClass('open-menu');
    $('.burger').toggleClass('open-menu');
    $('.overlay').toggleClass('openOverlay');
}
