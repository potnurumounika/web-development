const questions = [
    {
           question: "what does HTML standards for?",
           answers: [
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Hyper Transfer Markup Line", correct: false},
            { text: "Hyper Text Marking Language", correct:  false},
          
        ]
    },
    {
        question: "Choose the Correct HTML element for the largest heading?",
           answers: [
            { text: "h1", correct: true},
            { text: "h2", correct: false},
            { text: "h3", correct:  false},
           ]
    },
    {
        question: "Which of this is not a markup language?",
           answers: [
            { text: "HTML", correct: false},
            { text: "YAML", correct: true},
            { text: "Java", correct:  false},
           ]
    },
    {
        question: "what does css standards for?",
           answers: [
            { text: "Cascading Style Shine", correct: false},
            { text: "Cascading Style Sheets ", correct: true},
            { text: "Card Style Sheets", correct:  false},
           ]
    },
    {
        question: "Who invented first version HTML was?",
           answers: [
            { text: "Willis Carrier", correct: false},
            { text: "Tim Berners-Lee", correct: true},
            { text: "Benjamin Franklin", correct:  false},
           ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // in seconds
let timer;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    startTimer();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState () {
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        
    }
  
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    score++;
  } else {
    endQuiz();
  }

  function endQuiz() {
    clearInterval(timer);
    alert=('Quiz complete!\nYour score is ${score}');
    
  }

function startTimer() {
    updateTimerDisplay();
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
  
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    const Minutes = minutes < 10 ? '0${minutes}' : minutes;
    const Seconds = seconds < 10 ? '0${seconds}' : seconds;
  
    timerElement.textContent('Time Left: ${Minutes}:${Seconds}');
  }
  
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      score++;
      showQuestion();
    } else {
      endQuiz();
    }
  });

startQuiz();
