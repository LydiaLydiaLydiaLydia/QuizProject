let questionsLS = JSON.parse(localStorage.getItem("questions"));
let userAnswersLS = JSON.parse(localStorage.getItem("userAnswers"));
let correctAnsLS = JSON.parse(localStorage.getItem("correctAns"));
let mainDiv = document.getElementsByTagName("div")[0];
let heading = document.getElementsByTagName("h1")[0];
let correctCount = 0;


for(let i = 0; i < questionsLS.length; i++){
    //the question
    let q = document.createElement("h2");
    q.innerHTML = `Question ${i + 1}: ${questionsLS[i]}`;
    mainDiv.appendChild(q);


    //did they get it correct?
    let correct = document.createElement("p");
    correct.innerHTML = `You answered: ${userAnswersLS[i]}.<br>`;
    if(correctAnsLS[i] === userAnswersLS[i]){
        correctCount ++;
        correct.innerHTML += "You got it right!";
    }
    else{
        correct.innerHTML += "You got it wrong!";
        correct.innerHTML += `<br>The correct answer is ${correctAnsLS[i]}.`;
    }
    mainDiv.appendChild(correct);
}
let grade = percentageGrade(questionsLS.length, correctCount);
heading.innerHTML += `: ${correctCount} out of ${questionsLS.length}<br>${grade}%`;
function percentageGrade(numQuestions, numCorrect){
    return (numCorrect/numQuestions) * 100;
}
