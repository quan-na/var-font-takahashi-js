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

/* Completely rewrite with some animation */
(function() {
    /* The ratio for each tag */
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
    /* Body and slides */
    var body = document.getElementsByTagName('body')[0];
    var slides = document.getElementsByTagName('slide');
    var curSlide = 0;
    /* Put the slide left, right, or middle*/
    function putSlide(slideNo, pos) {
        slides[slideNo].style.left = ((body.clientWidth - slides[slideNo].clientWidth)   / 2 + pos*70) +'px';
        slides[slideNo].style.top  = ((body.clientHeight - slides[slideNo].clientHeight) / 2)          +'px';
        if (pos == 0) slides[slideNo].style.opacity = 1.0;
        else slides[slideNo].style.opacity = 0.0;
    }
    function putWords(slideNo) {
        var words = slides[slideNo].children;
        // calculate the scale from smallest wording(w3) to total
        var scale = 0.0;
        for (var j=0; j<words.length; j++)
            scale += ratio(words[j].tagName);
        // now scale and put the wording in place
        var unit = slides[slideNo].clientHeight / scale;
        var curPos = 0.0;
        for (var j=0; j<words.length; j++) {
            if (0 == ratio(words[j].tagName)) {
                continue;
            }
            words[j].style.top = curPos;
            words[j].style.transform = "scale("+
                (slides[slideNo].clientWidth*1.0/words[j].clientWidth).toFixed(5)+
                ","+
                (unit*ratio(words[j].tagName)/words[j].clientHeight).toFixed(5)+
                ")";
            curPos += unit*ratio(words[j].tagName);
        }
    }
    function calibrate() {
        // get screen width and height
        // get the slides width and height (set with css)
        // center the slides
        for (var i=0; i<slides.length; i++) {
            if (i<curSlide) putSlide(i, -1);
            else if (i>curSlide) putSlide(i, 1);
            else putSlide(i, 0);
            putWords(i);
        }
    }
    calibrate(); // page load calibrate
    var noteShowing = false;
    var noteTag;
    function showNote() {
        var tags = slides[curSlide].children;
        for (var j=0; j<tags.length; j++)
            if (tags[j].tagName.toLowerCase() == 'note') {
                tags[j].style.opacity = 1.0;
                noteTag = tags[j];
                noteShowing = true;
                return;
            }
    }
    function hideNote() {
        noteTag.style.opacity = 0.0;
        noteShowing = false;
    }
    function nextSlide() {
        if (curSlide < slides.length-1) {
            putSlide(curSlide, -1);
            curSlide++;
            putSlide(curSlide, 0);
        }
    }
    function previousSlide() {
        if (curSlide > 0) {
            putSlide(curSlide, 1);
            curSlide--;
            putSlide(curSlide, 0);
        }
    }
    document.addEventListener("click", function(ev) {
        var body = document.getElementsByTagName('body')[0];
        if (noteShowing)
            hideNote();
        else if (ev.clientY > body.clientHeight*4/5)
            showNote();
        else if (ev.clientX < body.clientWidth/3)
            previousSlide();
        else if (ev.clientX > body.clientWidth*2/3)
            nextSlide();
    });
    document.addEventListener('keydown', function(ev) {
        switch (ev.keyCode) {
        case 37: // left
            if (!noteShowing)
                previousSlide();
            break;
        case 38: // up
            if (!noteShowing)
                showNote();
            break;
        case 39: // right
            if (!noteShowing)
                nextSlide();
            break;
        case 40: // down
            if (noteShowing)
                hideNote();
            break;
        }
    });
    window.addEventListener('resize', (ev) => {
        calibrate();
    });
    window.addEventListener('orientationChange', (ev) => {
        calibrate();
    });
    document.fonts.ready.then(function () {
        for (var i=0; i<slides.length; i++)
            putWords(i);
    });
})();
