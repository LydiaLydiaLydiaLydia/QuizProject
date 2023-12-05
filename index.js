//function to start the countdown
function startTimer(){
    setTimeout(goToQuiz, 5000);
    setInterval(changeTime, 1000);
}
//function that happens after the countdown
let goToQuiz = function(){
    window.open(quizLink, "_self");
}
let changeTime = function(){
    countdownP.innerHTML = `${counter--}`
}
//getting the link to use it in my functions
let quizLink = document.getElementById("quizLink").href;
let countdownP = document.getElementById("timer");
let counter = 4;
document.onload = startTimer();