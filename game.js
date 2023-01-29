const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is 2 + 2?",
    choice1: "2",
    choice2: "4",
    choice3: "21",
    choice4: "17",
    answer: 4,
  },
  {
    question: "What is Your Name?",
    choice1: '2',
    choice2: '4',
    choice3: '5',
    choice4: "Goldie",
    answer: "Goldie",
  },
  {
    question: "What is your favorite color?",
    choice1: '2',
    choice2: "red",
    choice3: '7',
    choice4: '3',
    answer: "red",
  },
  {
    question: "What is 5 + 2?",
    choice1: '2',
    choice2: '5',
    choice3: '21',
    choice4: '7',
    answer: 7,
  },
  {
    question: "What is 2 + 0?",
    choice1: '2',
    choice2: '4',
    choice3: '6',
    choice4: '23',
    answer: 2,
  },
];

const scorePoints = 10;
const maxQuestions = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostRecentScore", score);

    return (window.location.href = "end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    // const selectedAnswer = selectedChoice.dataset["number"];
    const selectedAnswer = selectedChoice.textContent

    // let classToApply = "correct";
    // if (selectedAnswer == currentQuestion.answer) {
    //   classToApply = "incorrect";
    // }
    console.log(selectedAnswer);
    console.log(currentQuestion.answer);
    let classToApply =
      (selectedAnswer == currentQuestion.answer) ? "correct" : "incorrect";
   

    console.log(classToApply);

    console.log(selectedAnswer == currentQuestion.answer);

    if (classToApply === "correct") {
      incrementScore(scorePoints);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
