let questions = [{
    question: "Wer hat HTML erfunden?",
    allAnswers: ["Ich", "Du", "Son-Goku", "Tim Berners-Lee"],
    rightAnswer: 3
},
{
    question: "Ist das hier eine Frage?",
    allAnswers: ["Nein", "JA!!", "Nein", "Nein"],
    rightAnswer: 1
},
{
    question: "Wie ist die Antwort?",
    allAnswers: ["Nein", "42", "Nein", "Nein"],
    rightAnswer: 1
},
{
    question: "Wer ist der Gott of Schlager?",
    allAnswers: ["Christian Steiffen", "Dieter Pete", "Anna Bolika", "Ali Mente"],
    rightAnswer: 0
},
{
    question: "Das hier ist ein....?",
    allAnswers: ["Quiz", "Auto", "Handy", "Nachbar"],
    rightAnswer: 0
},

{
    question: "Fallen mir noch bessere Fragen ein als diese?",
    allAnswers: ["JA!", "JA!", "Nein, deshalb steht sie hier!", "JA!"],
    rightAnswer: 2
}]

let currentQuestion = 0;
let currentQuestionText = document.getElementById("currentQuestionText");
let questionLengthText = document.getElementById("questionLengthText");

let questionField1 = document.getElementById("questionField1");
let questionField2 = document.getElementById("questionField2");
let questionField3 = document.getElementById("questionField3");
let questionField4 = document.getElementById("questionField4");
let questionFields = [questionField1, questionField2, questionField3, questionField4];


let nextQuestionButton = document.getElementById("nextQuestionButton");
let points = 0;
let wrongAnswerClicked = false;

let AUDIO_WRONG = new Audio("audio/wrong.mp3");
let AUDIO_RIGHT = new Audio("audio/right.mp3");
let AUDIO_WIN = new Audio("audio/win.mp3");
let AUDIO_LOSE = new Audio("audio/lose.mp3");

function init() {
    nextQuestionButton.innerHTML = "nächste Frage"
    currentQuestion = 0;
    points = 0;
    questionLengthText.innerHTML = questions.length;
    showQuestionIndex();
    showQuestion(0);
    resetPoints();
    resetButtons();
    setProgressBar();
    showEndScreen(false);
}

function showQuestion() {
    document.getElementById("questionText").innerHTML = questions[currentQuestion].question;
    for (let i = 0; i < 4; i++) {
        let field = questionFields[i];
        field.innerHTML = questions[currentQuestion].allAnswers[i];
    }
}

function showQuestionIndex() {
    currentQuestionText.innerHTML = currentQuestion + 1;
}

function logAnswer(index) {
    if (wrongAnswerClicked) return;

    if (index == questions[currentQuestion].rightAnswer)
        rightAnswer(index);
    else wrongAnswer(index);
}

function rightAnswer(index) {
    AUDIO_RIGHT.play();
    let field = questionFields[index];
    field.parentNode.classList.add("bg-success");

    points++;
    console.log(points);
    toggleNextButton(true);
}

function wrongAnswer(index) {
    StopAudio(AUDIO_WRONG);
    AUDIO_WRONG.play();
    let field = questionFields[index];
    field.parentNode.classList.add("bg-danger");

    let rightField = questionFields[questions[currentQuestion].rightAnswer];
    rightField.parentNode.classList.add("bg-success");

    wrongAnswerClicked = true;
    toggleNextButton(true);
}

function nextQuestion() {
    currentQuestion++;
    wrongAnswerClicked = false;
    if (currentQuestion >= questions.length - 1) {
        nextQuestionButton.innerHTML = "Ergebnis";
    }

    if (isLastQuestion()) {
        showEndScreen(true);
    }
    else {
        resetButtons();
        toggleNextButton(false);
        showQuestionIndex();
    }

    setProgressBar();
}

function isLastQuestion() {
    return currentQuestion >= questions.length;
}

function resetButtons() {
    for (let i = 0; i < 4; i++) {
        let field = questionFields[i];
        field.parentNode.classList = "card mb-2 card-answer"
    }
    showQuestion();
}

function toggleNextButton(bool) {
    nextQuestionButton.disabled = !bool;
}

function showPoints() {
    let achievedPointText = document.getElementById("achievedPointText");
    let totalPointsToGetText = document.getElementById("totalPointsToGetText");

    achievedPointText.innerHTML = points;
    totalPointsToGetText.innerHTML = questions.length;
}

function resetPoints() {
    let achievedPointText = document.getElementById("achievedPointText");
    achievedPointText.innerHTML = 0;
}

function replay() {
    init();
}

function showEndScreen(bool) {
    if (!bool)
        document.getElementById("endScreen").classList.add("hidden");
    else {
        setEndImg();
        toggleNextButton(false);
        showPoints();
        document.getElementById("endScreen").classList.remove("hidden");
    }
}

function setProgressBar() {
    let percentage = currentQuestion / questions.length;
    percentage *= 100;
    let bar = document.getElementById("progressBar");

    bar.innerHTML = `${Math.round(percentage)}%`
    bar.style = `width:${percentage}%`
}

function setEndImg() {
    let img = document.getElementById("endImg");
    let text = document.getElementById("endText");

    if (points < 5) {
        img.src = "img/lose.jpg"
        text.innerHTML = "TRY AGAIN...";
        AUDIO_LOSE.play();
    }
    else {
        img.src = "img/win.jpg"
        text.innerHTML = "YOU GOT IT!"
            ;
        AUDIO_WIN.play();
    }
}

function StopAudio(audio) {
    audio.pause;
    audio.currentTime = 0;
}