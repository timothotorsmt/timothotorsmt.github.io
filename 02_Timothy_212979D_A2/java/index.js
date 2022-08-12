
// Animation in frame
// causes page automatic animation in scroll
const scrollOffset = 0;
const scrollList = document.getElementsByClassName("scroll__elem");

function elementInView (el) {
    const elementTop = el.getBoundingClientRect().top;
  
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) - 350
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

// Um
// molecule selected for causes.html
function causes__molecules(moleculeSelected) {
    let moleculeList = document.getElementsByClassName("Types__Intro");
    for (let i = 0; i < moleculeList.length; i++) {
        moleculeList[i].style.display = "none";
    }

    let QuitIcon = document.getElementsByClassName("Causes__icon");
    QuitIcon[0].style.display = "flex";

    let descList = document.getElementsByClassName("Types__Indepth");
    descList[moleculeSelected - 1].style.display = "grid";
    descList[moleculeSelected - 1].style.gridColumn = "1 / 5";
}

function causes__molecules__reverse() {
    console.log("This works");
    let descList = document.getElementsByClassName("Types__Indepth");
    for (let i = 0; i < descList.length; i++) {
        descList[i].style.display = "none";
    }

    let QuitIcon = document.getElementsByClassName("Causes__icon");
    QuitIcon[0].style.display = "none";

    let moleculeList = document.getElementsByClassName("Types__Intro");
    for (let i = 0; i < moleculeList.length; i++) {
        moleculeList[i].style.display = "grid";
        moleculeList[i].style.justifyItems = "center";
    }
}

// Quiz Section
let QuestionNumber = 0;
let itemSelected = 0;
let maxPoints = 9;
localStorage.setItem("CFP", "0");

const questionList = [
    {
        question: "What is your preferred method of transport?",
        answers: {
            1: "'I like to Walk / Cycle!'",
            2: "'I take Public Transport.'",
            3: "'I Carpool with other people most of the time.'",
            4: "'I have a personal vehicle / take the taxi often.'"
        }
    },
    {
        question: "Where do you mainly eat?",
        answers: {
            1: "'I cook at home!'",
            2: "'I prefer to eat out more :D'",
            3: "-",
            4: "-"
        }
    },
    {
        question: "In a typical meal, what do you eat the most?",
        answers: {
            1: "'Vegetables! Gotta get them greens <3'",
            2: "'Bread. I love bread.'",
            3: "'I really like meat!'",
            4: "-"
        }
    },
]

// edit buttons
function setButtons() {
    if (QuestionNumber == questionList.length - 1) {
        document.getElementsByClassName("Questions--Next")[0].style.display = "none";
    } else {
        document.getElementsByClassName("Questions--Next")[0].style.display = "block";
    }

    if (QuestionNumber == questionList.length - 1) {
        document.getElementsByClassName("Questions--Submit")[0].style.display = "block";
    } else {
        document.getElementsByClassName("Questions--Submit")[0].style.display = "none";
    }
}

function setCFP(newValue) {
    localStorage.setItem("CFP", newValue.toString());
}

function choiceOnClick(chosen, valueSelected) {
    itemSelected = valueSelected + 1;
    console.log("this aint working queen");
    var alrSelected = document.getElementsByClassName("Answer__Selected");
    for (let index = 0; index < alrSelected.length; index++) {
        const element = alrSelected[index];
        element.classList.remove("Answer__Selected");
    }
    chosen.classList.add("Answer__Selected");
}

function buildList() {
    // display question
    let questionTag = document.getElementsByClassName("Questions__Text")[0];
    questionTag.innerHTML = questionList[QuestionNumber].question;
    let num = QuestionNumber + 1;
    document.getElementsByClassName("Questions__Number")[0].innerHTML = "Q" + (num) + ".";
    const mainCont = document.getElementsByClassName("Questions__Choices")[0];
    for (let i = 0; i < 4; i++) {
        // figure out later
        if (questionList[QuestionNumber].answers[i + 1] == "-") {
            continue;
        }
        const container = document.createElement("div");
        container.classList.add("Question__Answer");
        const h3 = document.createElement("h3");
        const text = document.createTextNode(questionList[QuestionNumber].answers[i + 1]);
        h3.appendChild(text);
        container.appendChild(h3);
        container.addEventListener('click', function() { choiceOnClick(container, i) });
        mainCont.appendChild(container);
    }
    setButtons();
}

function clearList() { 
    const mainCont = document.getElementsByClassName("Questions__Choices")[0];
    mainCont.innerHTML = "";
}

function SubmitList() { 
    if (itemSelected != 0) {
        setCFP(parseInt(localStorage.getItem("CFP")) + itemSelected);
        itemSelected = 0;
        document.getElementsByClassName("You__Questions")[0].style.display = "none";
        document.getElementsByClassName("You__Results")[0].style.display = "block";
        let mainHead = document.getElementsByClassName("Results__Main")[0];
        let caption = document.getElementsByClassName("Results__Elab")[0];
        if (maxPoints - parseFloat(localStorage.getItem("CFP")) > (maxPoints - questionList.length) / 3 * 2) {
            mainHead.innerHTML = "Nice! Your carbon footprint is below average!"
            caption.innerHTML = "You actively try to consider environmentally friendly alternatives in your daily life, and this is a really good step in helping slow the effects of climate change! You get the gold from me <3"
        } else if (maxPoints - parseFloat(localStorage.getItem("CFP")) > (maxPoints - questionList.length) / 3) {
            mainHead.innerHTML = "Your Carbon Footprint is average :|"
            caption.innerHTML = "Great job! You make some environmentally friendly decisions in your daily routines, but there's still room for improvement! Try to consider more ways to improve your carbon emissions."
        } else {
            mainHead.innerHTML = "Woah! Your Carbon Footprint is really high!"
            caption.innerHTML = "This means that you contribute a lot to the emission of greenhouse gases in the atmosphere! You should reconsider your routines and make more environmentally friendly decisions."
        }
    }
}


function addQuestion() {
    if (QuestionNumber != questionList.length - 1 && itemSelected != 0) {
        QuestionNumber += 1;
        clearList();
        buildList();
        setCFP(parseInt(localStorage.getItem("CFP")) + itemSelected);
        itemSelected = 0;
    }
}

function ResetQuiz() {
    QuestionNumber = 0;
    itemSelected = 0;
    maxPoints = 9;
    localStorage.setItem("CFP", "0");
    document.getElementsByClassName("You__Questions")[0].style.display = "flex";
    document.getElementsByClassName("You__Results")[0].style.display = "none";
    clearList();
    buildList();
}

buildList();

// solutions page selector
var point = 0;
function TipSelector(selectedPoint) {
    let pointList = document.getElementsByClassName("Solution__tips");
    if (selectedPoint == point) {
        // already open, close;
        pointList[selectedPoint - 1].style.display = "none";
        pointList[selectedPoint - 1].classList.remove("rightToLeft");
        point = 0;
        return;
    }
    console.log(selectedPoint);
    for (let i = 0; i < pointList.length; i++) {
        pointList[i].style.display = "none";
        pointList[selectedPoint - 1].classList.remove("rightToLeft");
    }

    point = selectedPoint;
    pointList[selectedPoint - 1].style.display = "block";
    pointList[selectedPoint - 1].classList.add("rightToLeft");
}

