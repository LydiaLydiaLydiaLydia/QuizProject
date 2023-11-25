let arrayQuestions = [
    {   question: "What is it?",
        possibleAnswers: ["An egg", "A childe", "The Man", "The System"],
        answer: 4},
    {   question: "Have you ever seen the eiffel tower?",
        possibleAnswers: ["Yes", "No", "Twice", "Thrice"],
        answer: 4},
    {   question: "Who?",
        possibleAnswers: ["yer mum", "the band Metallica", "Jason Statham", "Lydia Sheehan"],
        answer: 1},
    {   question: "What is the meaning of this?",
        possibleAnswers: ["it's a pronoun", "it's a word", "it means nothing!!!", "nothing means anything"],
       answer: 3},
    {   question: "Can I borrow a feeling?",
        possibleAnswers: ["Millhouse's dad", "Handbag", "Can of Monster", "Monster Mash"],
        answer: 1},
    {   question: "Where would I like to be buried?",
        possibleAnswers: ["Arlington", "At Sea", "Makeout Creek", "Kilgarvan"],
        answer: 3},
    {   question: "How do you respond to an insult?",
        possibleAnswers: ["A slap", "Thank you", "A hug", "A moider"],
        answer: 2},
    {   question: "Where?",
        possibleAnswers: ["Frankfurt-Hahn", "Witch-Land", "Killorglin", "Lara's Hosue"],
        answer: 2},
    {   question: "Bologna?",
        possibleAnswers: ["yes please", "spam", "baloney", "meat-product"],
        answer: 3},
    {   question: "How many?",
        possibleAnswers: ["A handfull (of dust)", "Valentine Browne", "Il diavolo", "7"],
        answer: 2}
];

//Array to hold the randomly chosen questions
let chosenQuestions = [];
//Array to keep track of what questions have already been chosen
let alreadyPickedQuestions = [];
for(let i = 0; i < arrayQuestions.length; i++){
    alreadyPickedQuestions.push(false);
}

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


//Calling the function that randomly chooses the questions when the document loads
document.onload = chooseQuestions();

//For the first question:
//making the div where the mulitple choice answers will live a variable
let questionArea = document.getElementById("possibleAnsDiv");
//putting the question in the h2
document.getElementById("questionH2").innerHTML = chosenQuestions[0].question;
//putting the multiple choice answers into paragraphs and putting them in the div
for(let k = 0; k < chosenQuestions[0].possibleAnswers.length; k ++){
    let answerPara = document.createElement("p");
    answerPara.innerHTML = chosenQuestions[0].possibleAnswers[k];
    questionArea.appendChild(answerPara);
}

let changeColour = function(e) {
    for(let m = 0; m < answerPTags.length; m++){
        if(answerPTags[m] === e.target){
            e.target.style.backgroundColor = "#3c6036";
        }
        else{
            console.log("heya");
            answerPTags[m].style.backgroundColor = "#ebe3cf";
        }

    }
}

//making the answer you're hovering over stand out
let answerPTags = questionArea.getElementsByTagName("p");
for(let l = 0; l < answerPTags.length; l ++){
    answerPTags[l].addEventListener("click", changeColour, false);
}


