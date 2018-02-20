/**
                  l e n g t h        2d  array         slide
    c s s 2 d     using   div        s l i d e         notes
    transform
                  java-script        center      s-ca-le  i-s
                  f a d i n g        d i v       only numbers
                  ani-ma-tion
                                  ca-li-brate
          h=hightlight            screen size
          w   =   word

  **/
/*
var test = document.getElementById("Test");
test.style.fontSize = fontSize;
var height = (test.clientHeight + 1) + "px";
var width = (test.clientWidth + 1) + "px";
*/
function calibrate() {
    // get screen width and height
    var body = document.getElementsByTagName('body')[0];
    // get the slides width and height (set with css)
    var slides = document.getElementsByTagName('slide');
    // TODO center the slides
    slides.forEach(function(elem) {
    });
    // TODO foreach slide, calculate the text height
    // TODO scale the texts
}

window.addEventListener('resize', (ev) => {
    calibrate();
});
window.addEventListener('orientationChange', (ev) => {
    calibrate();
});

// TODO: hide/show/animate slides
