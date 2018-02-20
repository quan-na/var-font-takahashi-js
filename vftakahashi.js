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
function ratio(tagName) {
    switch (tagName.toLowerCase()) {
    case 'w0':
        return 2.0*Math.sqrt(2.0);
    case 'w1':
        return 2.0;
    case 'w2':
        return Math.sqrt(2.0);
    case 'w3':
        return 1.0;
    }
    return 0.0;
}

function calibrate() {
    // get screen width and height
    var body = document.getElementsByTagName('body')[0];
    // get the slides width and height (set with css)
    var slides = document.getElementsByTagName('slide');
    // center the slides
    for (var i=0; i<slides.length; i++) {
        slides[i].style.left = ((body.clientWidth - slides[i].clientWidth)   / 2)+'px';
        slides[i].style.top  = ((body.clientHeight - slides[i].clientHeight) / 2)+'px';
        var words = slides[i].children;
        // calculate the scale from smallest wording(w3) to total
        var scale = 0.0;
        for (var j=0; j<words.length; j++)
            scale += ratio(words[j].tagName);
        // now scale and put the wording in place
        var unit = slides[i].clientHeight / scale;
        var curPos = 0.0;
        for (var j=0; j<words.length; j++) {
            words[j].style.top = curPos;
            words[j].style.transform = "scale("+
                (slides[i].clientWidth*1.0/words[j].clientWidth).toFixed(5)+
                ","+
                (unit*ratio(words[j].tagName)/words[j].clientHeight).toFixed(5)+
                ")";
            curPos += unit*ratio(words[j].tagName);
        }
    }
}

document.addEventListener("DOMContentLoaded", function(ev) {
    calibrate();
    // TODO: hide/show/animate slides
    // css opacity
    var slides = document.getElementsByTagName('slide');
    var curSlide = 0;
    slides[curSlide].style. visibility = 'visible';
    var noteShowing = false;
    var noteTag;
    function showNote() {
        var tags = slides[curSlide].children;
        for (var j=0; j<tags.length; j++)
            if (tags[j].tagName.toLowerCase() == 'note') {
                tags[j].style.visibility = 'visible';
                noteTag = tags[j];
                noteShowing = true;
                return;
            }
    }
    function hideNote() {
        noteTag.style.visibility = 'hidden';
        noteShowing = false;
    }
    function nextSlide() {
        if (curSlide < slides.length-1) {
            slides[curSlide].style.visibility = 'hidden';
            curSlide++;
            slides[curSlide].style.visibility = 'visible';
        }
    }
    function previousSlide() {
        if (curSlide > 0) {
            slides[curSlide].style.visibility = 'hidden';
            curSlide--;
            slides[curSlide].style.visibility = 'visible';
        }
    }
    document.addEventListener("click", function(ev) {
        var body = document.getElementsByTagName('body')[0];
        if (noteShowing)
            hideNote();
        else if (ev.clientY > body.clientHeight*4/5)
            showNote();
        else if (ev.clientX < body.clientWidth/2)
            previousSlide();
        else
            nextSlide();
    });
});
window.addEventListener('resize', (ev) => {
    calibrate();
});
window.addEventListener('orientationChange', (ev) => {
    calibrate();
});
