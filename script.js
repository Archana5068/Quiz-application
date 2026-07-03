const questions = [

    {
        question: "A train travels 120 km in 2 hours. What is its speed?",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        answer: "60 km/h"
    },

    {
        question: "What is 25% of 240?",
        options: ["50", "60", "70", "80"],
        answer: "60"
    },

    {
        question: "If 5x = 45, then x = ?",
        options: ["5", "7", "8", "9"],
        answer: "9"
    },

    {
        question: "Find the next number: 2,4,8,16,?",
        options: ["18", "24", "30", "32"],
        answer: "32"
    },

    {
        question: "A shop gives 10% discount on ₹500. Final price?",
        options: ["₹400", "₹450", "₹480", "₹490"],
        answer: "₹450"
    },

    {
        question: "Which number is divisible by both 3 and 5?",
        options: ["20", "25", "30", "35"],
        answer: "30"
    },

    {
        question: "If the ratio of boys to girls is 3:2 and total students are 50, girls are?",
        options: ["20", "25", "30", "35"],
        answer: "20"
    },

    {
        question: "What is the square root of 169?",
        options: ["11", "12", "13", "14"],
        answer: "13"
    },

    {
        question: "Complete the series: 5,10,20,40,?",
        options: ["50", "60", "70", "80"],
        answer: "80"
    },

    {
        question: "If today is Monday, what day will it be after 10 days?",
        options: ["Wednesday", "Thursday", "Friday", "Saturday"],
        answer: "Thursday"
    }

];

let shuffledQuestions = [];
let currentQuestion = 0;
let userAnswers = [];

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const questionNumber = document.getElementById("question-number");

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

// Shuffle Questions
function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    return array;
}

// Start Quiz
function startQuiz() {

    shuffledQuestions = shuffleArray([...questions]);

    currentQuestion = 0;

    userAnswers = new Array(shuffledQuestions.length).fill(null);

    quiz.classList.remove("hide");

    result.classList.add("hide");

    showQuestion();

}

// Show Question
function showQuestion() {

    let q = shuffledQuestions[currentQuestion];

    questionNumber.innerHTML =
        `Question ${currentQuestion + 1} of ${shuffledQuestions.length}`;

    question.innerHTML = q.question;

    options.innerHTML = "";

    q.options.forEach(option => {

        let btn = document.createElement("button");

        btn.innerHTML = option;

        btn.classList.add("option");

        // Show previously selected answer
        if (userAnswers[currentQuestion] === option) {
            btn.classList.add("selected");
        }

        btn.onclick = () => {

            document.querySelectorAll(".option").forEach(button => {
                button.classList.remove("selected");
            });

            btn.classList.add("selected");

            userAnswers[currentQuestion] = option;

        };

        options.appendChild(btn);

    });

    // Disable Back button on first question
    backBtn.disabled = currentQuestion === 0;

    // Change Next button text on last question
    if (currentQuestion === shuffledQuestions.length - 1) {
        nextBtn.innerHTML = "Finish";
    } else {
        nextBtn.innerHTML = "Next";
    }

}

// Next Button
nextBtn.addEventListener("click", () => {

    if (userAnswers[currentQuestion] == null) {

        alert("Please select an option.");

        return;

    }

    if (currentQuestion < shuffledQuestions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        showScore();

    }

});

// Back Button
backBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});

// Show Score
function showScore() {

    let score = 0;

    for (let i = 0; i < shuffledQuestions.length; i++) {

        if (userAnswers[i] === shuffledQuestions[i].answer) {

            score++;

        }

    }

    quiz.classList.add("hide");

    result.classList.remove("hide");

    scoreText.innerHTML = `You scored ${score} out of ${shuffledQuestions.length}`;

}

// Restart Quiz
restartBtn.addEventListener("click", () => {

    startQuiz();

});

// Start the Quiz
startQuiz();