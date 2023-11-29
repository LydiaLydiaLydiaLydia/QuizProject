let arrayQuestions = [
    {   question: "What is it?",
        possibleAnswers: ["An egg", "A childe", "The Man", "The System"],
        answer: 3},
    {   question: "Have you ever seen the eiffel tower?",
        possibleAnswers: ["Yes", "No", "Twice", "Thrice"],
        answer: 3},
    {   question: "Who?",
        possibleAnswers: ["yer mum", "the band Metallica", "Jason Statham", "Lydia Sheehan"],
        answer: 0},
    {   question: "What is the meaning of this?",
        possibleAnswers: ["it's a pronoun", "it's a word", "it means nothing!!!", "nothing means anything"],
       answer: 2},
    {   question: "Can I borrow a feeling?",
        possibleAnswers: ["Millhouse's dad", "Handbag", "Can of Monster", "Monster Mash"],
        answer: 0},
    {   question: "Where would I like to be buried?",
        possibleAnswers: ["Arlington", "At Sea", "Makeout Creek", "Kilgarvan"],
        answer: 2},
    {   question: "How do you respond to an insult?",
        possibleAnswers: ["A slap", "Thank you", "A hug", "A moider"],
        answer: 1},
    {   question: "Where?",
        possibleAnswers: ["Frankfurt-Hahn", "Witch-Land", "Killorglin", "Lara's Hosue"],
        answer: 1},
    {   question: "Bologna?",
        possibleAnswers: ["yes please", "spam", "baloney", "meat-product"],
        answer: 2},
    {   question: "How many?",
        possibleAnswers: ["A handfull (of dust)", "Valentine Browne", "Il diavolo", "7"],
        answer: 1}
];

//Array to hold the randomly chosen questions
let chosenQuestions = [];
//Array to keep track of what questions have already been chosen
let alreadyPickedQuestions = [];
for(let i = 0; i < arrayQuestions.length; i++){
    alreadyPickedQuestions.push(false);
}
//Array to keep track of answers chosen by user
let userAnswers = [];
let currentAnswer;
//question counter
let counter = 0;
let progressDivs = document.getElementsByClassName("progressBar");


//the funciton that randomly chooses the questions
let chooseQuestions = function() {
    let randomNumber;
    for(let j = 0; j < 5; j++){
        randomNumber = Math.round(Math.random() * (arrayQuestions.length - 1));
        while(alreadyPickedQuestions[randomNumber]){
            randomNumber = Math.round(Math.random() * (arrayQuestions.length - 1));
        }
        alreadyPickedQuestions[randomNumber] = true;
        chosenQuestions[j] = arrayQuestions[randomNumber];
    }
}

//function that happens when next button is clicked
let nextQuestion = function (){
    //adding the selected answer to the userAnswers array
    userAnswers.push(currentAnswer);
    questions[counter] = chosenQuestions[counter].question;
    correctAns[counter] = chosenQuestions[counter].possibleAnswers[chosenQuestions[counter].answer];
    //counter increases
    counter ++;
    //changing to button to Submit on the last question
    if(counter === 4){
        nextButton.innerHTML = "Submit";
    }
    if(counter <= 4){
        //loading new question and answers
        questionH2.innerHTML = chosenQuestions[counter].question;

        for(let n = 0; n < answerPTags.length; n++){
            answerPTags[n].innerHTML = chosenQuestions[counter].possibleAnswers[n];
            //setting the background colour back to normal, might as well now i'm looping through the p tags
            answerPTags[n].style.backgroundColor = "#ebe3cf";
            answerPTags[n].style.color = "#1b2337";
        }

        //change progress bar
        progressDivs[0].getElementsByTagName("p")[0].innerHTML = `${counter + 1}/5`;
        progressDivs[counter].style.backgroundColor = "#1b2337";


        //deselect current answer (in variable)
        currentAnswer = null;

        //changing the event listener for the button
        if(counter === 4){
            nextButton.removeEventListener("click", nextQuestion, false);
            nextButton.addEventListener("click", finishQuiz, false);
        }
    }
}

//function to go to summary page
let finishQuiz = function(){
    userAnswers.push(currentAnswer);
    questions[counter] = chosenQuestions[counter].question;
    correctAns[counter] = chosenQuestions[counter].possibleAnswers[chosenQuestions[counter].answer];
    nextButton.removeEventListener("click", finishQuiz, false);
    console.log(questions);
    console.log(userAnswers);
    console.log(correctAns);
    //storing to local storage
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("correctAns", JSON.stringify(correctAns));

    window.open("summary.html", "", `top = ${summaryPosVert}, left = ${summaryPosHoriz}, width = ${summaryWidth}, height = ${summaryHeight}`);
}
let getHelp = function(){
    helpBox.style.visibility = "visible";
}
let getHelpOff = function(){
    helpBox.style.visibility = "hidden";
}


//Calling the function that randomly chooses the questions when the document loads
document.onload = chooseQuestions();



//For the first question:
//making the div where the mulitple choice answers will live a variable
let questionArea = document.getElementById("possibleAnsDiv");
//putting the question in the h2
let questionH2 = document.getElementById("questionH2");
questionH2.innerHTML = chosenQuestions[0].question;
//putting the multiple choice answers into paragraphs and putting them in the div
for(let k = 0; k < chosenQuestions[0].possibleAnswers.length; k ++){
    let answerPara = document.createElement("p");
    answerPara.innerHTML = chosenQuestions[0].possibleAnswers[k];
    questionArea.appendChild(answerPara);
}

//adding event listener to the Next button
let nextButton = document.getElementsByTagName("button")[0];
nextButton.addEventListener("click", nextQuestion, false);


let changeColour = function(e) {
    for(let m = 0; m < answerPTags.length; m++){
        if(answerPTags[m] === e.target){
            e.target.style.backgroundColor = "#3c6036";
            e.target.style.color = "#ebe3cf";
            currentAnswer = e.target.innerHTML;
        }
        else{
            answerPTags[m].style.color = "#1b2337";
            answerPTags[m].style.backgroundColor = "#ebe3cf";
        }

    }
}

//getting the selected p-tag and making it change colour after selection
let answerPTags = questionArea.getElementsByTagName("p");
for(let l = 0; l < answerPTags.length; l ++){
    answerPTags[l].addEventListener("click", changeColour, false);
}

//get the asterisk and p for help
let helpMark = document.getElementsByTagName("span")[0];
let helpBox = document.getElementById("qHelp");
helpMark.addEventListener("mouseover", getHelp, false);
helpMark.addEventListener("mouseout", getHelpOff, false);

//getting the width and height of the page to make the pop-up page smaller than that
let summaryWidth = window.innerWidth / 2;
let summaryHeight = window.innerHeight /2;
// to get it to look centered, i need to get the size of the popup and half it (summaryWidth/2) and
//minus it from the halved screen width... so the centre of the popup is at the halfway point
let summaryPosHoriz = (screen.width/2) - (summaryWidth/2);
let summaryPosVert = (screen.height/2) - (summaryHeight/2);

//Streamlining my arrays to put into local storage
let questions = [];
let correctAns = [];



