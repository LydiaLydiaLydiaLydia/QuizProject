//function to start the countdown
let startTimer = function(){
    setTimeout(goToQuiz, 5000);
    console.log("heya x");
}
//function that happens after the countdown
let goToQuiz = function(){
    console.log("helllo");
    //window.open(quizLink);
}
//getting the link to use it in my functions
let quizLink = document.getElementById("quizLink").href;
let theBody = document.getElementsByTagName("body")[0];

theBody.addEventListener("load", startTimer, false);