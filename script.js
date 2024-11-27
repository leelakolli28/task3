// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach(slide => slide.style.display = 'none');
  slides[index].style.display = 'block';
}

document.getElementById('next-btn').addEventListener('click', function() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
});

document.getElementById('prev-btn').addEventListener('click', function() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
});

// Load the first slide
showSlide(currentSlide);

// Quiz functionality
const questions = [
  {
    question: "What is the main ingredient in a croissant?",
    options: ["Butter", "Eggs", "Flour", "Sugar"],
    correct: 0  // The correct option is "Butter"
  },
  {
    question: "Which of these is a type of French pastry?",
    options: ["Baklava", "Churros", "Eclair", "Doughnut"],
    correct: 2  // The correct option is "Eclair"
  },
  {
    question: "Which of these pastries is made from puff pastry?",
    options: ["Tart", "Strudel", "Brownie", "Cupcake"],
    correct: 1  // The correct option is "Strudel"
  }
];

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
  const question = questions[currentQuestion];
  document.getElementById('question').textContent = question.question;

  const answersContainer = document.getElementById('answers');
  answersContainer.innerHTML = ''; // Clear previous answers
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('button');
    optionElement.textContent = option;
    optionElement.onclick = () => selectAnswer(index);
    answersContainer.appendChild(optionElement);
  });
}

function selectAnswer(index) {
  userAnswers[currentQuestion] = index;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    alert("Quiz completed!");
  }
}

function submitQuiz() {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.correct) {
      score++;
    }
  });
  alert("You scored " + score + " out of " + questions.length);
}

loadQuestion();

// Joke functionality
async function getJoke() {
  const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
  const data = await response.json();
  document.getElementById('joke-text').textContent = data.setup + " " + data.punchline;
}

getJoke(); // Load the first joke