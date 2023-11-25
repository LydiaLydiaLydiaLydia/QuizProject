//function to start the countdown
function startTimer(){
    setTimeout(goToQuiz, 5000);
    console.log("heya x");
}
//function that happens after the countdown
let goToQuiz = function(){
    console.log("helllo");
    window.open(quizLink, "_self");
}
//getting the link to use it in my functions
let quizLink = document.getElementById("quizLink").href;
document.onload = startTimer();