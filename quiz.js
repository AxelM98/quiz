const data = [
  {
    id: 1,
    question: "Who was the first emperor of Rome?",
    answers: [
      { answer: "Julius Caesar", isCorrect: false },
      { answer: "Augustus", isCorrect: true },
      { answer: "Nero", isCorrect: false },
      { answer: "Caligula", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "What was the primary language spoken in Ancient Rome?",
    answers: [
      { answer: "Latin", isCorrect: true },
      { answer: "Greek", isCorrect: false },
      { answer: "Italian", isCorrect: false },
      { answer: "French", isCorrect: false },
    ],
  },
  {
    id: 3,
    question:
      "What was the name of the Roman Republic's highest legislative body?",
    answers: [
      { answer: "Senate", isCorrect: true },
      { answer: "Assembly", isCorrect: false },
      { answer: "Council", isCorrect: false },
      { answer: "Parliament", isCorrect: false },
    ],
  },
  {
    id: 4,
    question: "What was the main source of entertainment in Ancient Rome?",
    answers: [
      { answer: "Theatre", isCorrect: false },
      { answer: "Gladiator games", isCorrect: false },
      { answer: "Chariot races", isCorrect: false },
      { answer: "All of the above", isCorrect: true },
    ],
  },
  {
    id: 5,
    question: "What was the main religion of Ancient Rome?",
    answers: [
      { answer: "Christianity", isCorrect: false },
      { answer: "Hinduism", isCorrect: false },
      { answer: "Paganism", isCorrect: true },
      { answer: "Buddhism", isCorrect: false },
    ],
  },
  {
    id: 6,
    question: "Who built the Colosseum in Rome?",
    answers: [
      { answer: "Julius Caesar", isCorrect: false },
      { answer: "Augustus", isCorrect: false },
      { answer: "Nero", isCorrect: false },
      { answer: "Vespasian", isCorrect: true },
    ],
  },
  {
    id: 7,
    question: "What was the name of the ancient Roman system of roads?",
    answers: [
      { answer: "Appian Way", isCorrect: true },
      { answer: "Via Aurelia", isCorrect: false },
      { answer: "Strada Romana", isCorrect: false },
      { answer: "Roman Highways", isCorrect: false },
    ],
  },
  {
    id: 8,
    question: "Who wrote the Aeneid, an epic poem about the founding of Rome?",
    answers: [
      { answer: "Virgil", isCorrect: true },
      { answer: "Homer", isCorrect: false },
      { answer: "Ovid", isCorrect: false },
      { answer: "Sophocles", isCorrect: false },
    ],
  },
  {
    id: 9,
    question: "Who assassinated Julius Caesar in 44 BC?",
    answers: [
      { answer: "Brutus", isCorrect: true },
      { answer: "Cassius", isCorrect: false },
      { answer: "Marc Antony", isCorrect: false },
      { answer: "Octavian", isCorrect: false },
    ],
  },
  {
    id: 10,
    question:
      "What was the primary cause of the fall of the Western Roman Empire?",
    answers: [
      { answer: "Invasions by Barbarian tribes", isCorrect: false },
      { answer: "Economic decline", isCorrect: false },
      { answer: "Political instability", isCorrect: false },
      { answer: "All of the above", isCorrect: true },
    ],
  },
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let qIndex = 0;
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let total = 0;
let selectedAnswer;

// ProgressBar
let totalQuestions = 10;
let answeredQuestions = qIndex;
let progress = (answeredQuestions / totalQuestions) * 100;
let currentQuestion = -1;

const progressBar = document.querySelector(".progressBar");

function updateProgressBar() {
  const percentage = (currentQuestion / data.length) * 100;
  progressBar.style.width = `${percentage}%`;
  progressBar.innerHTML = `${percentage}%`;
  if (percentage === 0) {
    progressBar.innerHTML = null;
  }
}

const playAgain = () => {
  qIndex = 0;
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
  total = 0;
  currentQuestion = -1;
  showQuestion(qIndex);
};

play.addEventListener("click", () => {
  resultScreen.style.display = "none";
  gameScreen.style.display = "block";
  playAgain();
});

const showResult = () => {
  resultScreen.style.display = "block";
  gameScreen.style.display = "none";

  resultScreen.querySelector(
    ".correct"
  ).textContent = `Correct Answers: ${correctAnswersCount}`;
  resultScreen.querySelector(
    ".wrong"
  ).textContent = `Wrong Answers: ${wrongAnswersCount}`;
  resultScreen.querySelector(".score").textContent = `Score: ${
    (correctAnswersCount - wrongAnswersCount) * 10
  }`;
};

const showQuestion = (qNumber) => {
  currentQuestion++;
  updateProgressBar();
  if (qIndex === data.length) return showResult();
  selectedAnswer = null;
  question.textContent = data[qNumber].question;
  answersContainer.innerHTML = data[qNumber].answers
    .map(
      (item, i) =>
        `
    <div class="answer">
        <input type="radio" name="answer" id=${i} value=${item.isCorrect}>
        <label for=${i}>${item.answer}</label>
    </div>
    `
    )
    .join("");

  selectAnswer();
};

const selectAnswer = () => {
  answersContainer.querySelectorAll("input").forEach((element) => {
    element.addEventListener("click", (e) => {
      selectedAnswer = e.target.value;
    });
  });
};

const submitAnswer = () => {
  submit.addEventListener("click", () => {
    if (selectedAnswer !== null) {
      selectedAnswer === "true" ? correctAnswersCount++ : wrongAnswersCount++;
      qIndex++;
      showQuestion(qIndex);
    } else alert("Select an answer");
  });
};

showQuestion(qIndex);
submitAnswer();
