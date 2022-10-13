$(".darkLightToggle").click(function(){
    var element = document.body;

    // figure out how to make this into a fade
    element.classList.toggle("body--dark");
    element.classList.toggle("body--light");

    if ($(this).children("img").attr("src") == "media/images/sun_hover.png") {
        $(this).children("img").attr("src", "media/images/moon_hover.png");
    } else {
        $(this).children("img").attr("src", "media/images/sun_hover.png");
    }
});

$(".darkLightToggle").hover(function(){
    if ($(this).children("img").attr("src") == "media/images/sun.png") {
        $(this).children("img").attr("src", "media/images/sun_hover.png");
    } else {
        $(this).children("img").attr("src", "media/images/moon_hover.png");
    }
}, function(){
    if ($(this).children("img").attr("src") == "media/images/sun_hover.png") {
        $(this).children("img").attr("src", "media/images/sun.png");
    } else {
        $(this).children("img").attr("src", "media/images/moon.png");
    }
});

// add page set / page remember the color / language settings

const languages = ["en", "cn", "jp"];
var counter = 0;
$('[lang="cn"]').hide();
$('[lang="jp"]').hide();

$(".LanguageSelect").click(function(){
    counter++;
    console.log(counter);
    if (counter == 3) {
        counter = 0;
    }

    // figure out how to make this into a fade
    switch (counter) {
        case 0: {
            $(".LanguageSelect h3").text("en");
            $('[lang="en"]').show();
            $('[lang="cn"]').hide();
            $('[lang="jp"]').hide();
            break;
        }
        case 1: {
            $(".LanguageSelect h3").text("cn");
            $('[lang="en"]').hide();
            $('[lang="cn"]').show();
            $('[lang="jp"]').hide();
            break;
        }
        case 2: {
            $(".LanguageSelect h3").text("jp");
            $('[lang="en"]').hide();
            $('[lang="cn"]').hide();
            $('[lang="jp"]').show();
            break;
        }
    }
});

// Animation in frame
// causes page automatic animation in scroll
const scrollOffset = 150;
const scrollList = document.getElementsByClassName("scroll__elem");

function elementInView (el) {
    const elementTop = el.getBoundingClientRect().top;
  
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) - scrollOffset
    );
};

function displayScrollElement(Element) {
    Element.classList.add('inScreen');
}
 
function hideScrollElement(Element) {
    Element.classList.remove('inScreen');
}

function handleScrollAnimation() {
    for (let i = 0; i < scrollList.length; i++) {
        if (elementInView(scrollList[i])) {
            displayScrollElement(scrollList[i]);
        } else {
            hideScrollElement(scrollList[i]);
        }
    }
}
 
window.addEventListener('scroll', () => {
  handleScrollAnimation();
})
