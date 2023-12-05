let arrayQuestions = [
    {   question: "In the ancient Humourous practice of medicine, the four Humours that control the human body are Black Bile, Phlegm, Yellow Bile, and what other?",
        possibleAnswers: ["Mucous", "Resin", "Soul", "Blood"],
        answer: 3,
        hint: "This one actually exists in the human body"},
    {   question: "In what country was the Illuminati established during the Enlightenment?",
        possibleAnswers: ["England", "France", "The American Colonies", "Germany"],
        answer: 3,
        hint: "The Illuminati was originally established to limit religion's influence on pubic policy"},
    {   question: "Defenestration has been a form political protest popular in Prague throughout history. What does it mean?",
        possibleAnswers: ["Throwing someone out of a window", "Debating in the town square", "Hunger strike", "To take up arms"],
        answer: 0,
        hint: "Fenetre is the French word for window"},
    {   question: "In what decade of the 1900s was the American Federal Bureau of Investigation (FBI) formed?",
        possibleAnswers: ["1910s", "1950s", "1920s", "1930s"],
        answer: 2,
        hint: "It was established to combat bootlegging during Prohibition"},
    {   question: "What was the first book ever printed on a printing press?",
        possibleAnswers: ["The Bible", "Shakespeare's Folio", "Plato's Dialogues", "The German Constitution"],
        answer: 0,
        hint: "The Gutenberg press was invented in 1440"},
    {   question: "First produced in 1487, what was the subject of the Malleus Maleficarum?",
        possibleAnswers: ["Demonology", "Witchcraft", "Witch Hunting", "The Antichrist"],
        answer: 2,
        hint: "This book was essential reading in the Salem Witch Trials"},
    {   question: "How did Cleopatra die?",
        possibleAnswers: ["Beheading", "Poisonous snake bite", "Drowning", "Fell off a chariot"],
        answer: 1,
        hint: "Cleopatra died of suicide"},
    {   question: "In Ancient Greece, what was a vomitorium?",
        possibleAnswers: ["A room where you would go to vomit", "An exit", "Their word for the toilet", "An art gallery"],
        answer: 1,
        hint: "To vomit means to expel"},
    {   question: "Upon exhuming their tombs, what did the British do with ancient Egyptian mummies?",
        possibleAnswers: ["Ate the preserved remains for theorised health benefits", "Ground them up and used them as fertiliser", "All of these things", "Put them in the British Museum"],
        answer: 2,
        hint: "The British are strange"},
    {   question: "Where was the Statue of Liberty built?",
        possibleAnswers: ["Ohio", "France", "The Grand Canyon", "England"],
        answer: 1,
        hint: "There were two statues of liberty built, and one is in Paris"}
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
    //checking if they've selected an answer
    if(currentAnswer == null){
        window.alert("Please select an answer to continue.");
        return;
    }
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
        //loading new question and answers and hint
        questionH2.innerHTML = `${chosenQuestions[counter].question}`;
        hintP.innerHTML = chosenQuestions[counter].hint;

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
    if(currentAnswer === null){
        window.alert("Please select an answer to continue.");
        return;
    }
    userAnswers.push(currentAnswer);
    questions[counter] = chosenQuestions[counter].question;
    correctAns[counter] = chosenQuestions[counter].possibleAnswers[chosenQuestions[counter].answer];
    nextButton.removeEventListener("click", finishQuiz, false);

    //storing to local storage
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("correctAns", JSON.stringify(correctAns));

    window.open("summary.html", "", `top = ${summaryPosVert}, left = ${summaryPosHoriz}, width = ${summaryWidth}, height = ${summaryHeight}`);
}

//help event listener functions
let getHelp = function(){
    helpBox.style.visibility = "visible";
}
let getHelpOff = function(){
    helpBox.style.visibility = "hidden";
}
//hint event listeners
let getHint = function(){
    hintP.style.visibility = "visible";
}
let getHintOff = function(){
    hintP.style.visibility = "hidden";
}


//Calling the function that randomly chooses the questions when the document loads
document.onload = chooseQuestions();



//For the first question:
//making the div where the mulitple choice answers will live a variable
let questionArea = document.getElementById("possibleAnsDiv");
//putting the question in the h2
let questionH2 = document.getElementById("questionH2");
questionH2.innerHTML = chosenQuestions[0].question;
//putting the hint in the hint box
let hintP = document.getElementById("hint");
hintP.innerHTML = chosenQuestions[0].hint;
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
//make a mouseout and mouseover evetns for the hint for the question
questionH2.addEventListener("mouseover", getHint, false);
questionH2.addEventListener("mouseout", getHintOff, false);

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



