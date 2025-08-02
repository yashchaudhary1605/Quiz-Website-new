const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");

const resultContainer = document.querySelector(".result-container");
const quizContainer = document.querySelector(".quiz-container");
const resultMessage = document.querySelector(".result-message");

let quizCategory = "programming";
let currentQuestion = null;
let numberofquestions = 10;
let correctAnswers = 0;
const questionsIndexHistory = [];

const getRandomQuestion = () => {
    const category = questions.find(cat => cat.category.toLowerCase() === quizCategory.toLowerCase());
    const categoryQuestions = category?.questions || [];

    if (questionsIndexHistory.length >= Math.min(categoryQuestions.length, numberofquestions)) {
        showResult();
        return null;
    }

    const availableQuestions = categoryQuestions.filter((_, index) => !questionsIndexHistory.includes(index));
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    questionsIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
    return randomQuestion;
};

const highlightCorrectAnswer = () => {
    const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    correctOption.classList.add("correct");
    const iconHTML = `<span class="material-symbol-rounded">check_circle</span>`;
    correctOption.insertAdjacentHTML("beforeend", iconHTML);
};

const handleAnswer = (option, answerIndex) => {
    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    if (isCorrect) correctAnswers++;

    option.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) highlightCorrectAnswer();

    const iconHTML = `<span class="material-symbol-rounded">${isCorrect ? 'check_circle' : 'cancel'}</span>`;
    option.insertAdjacentHTML("beforeend", iconHTML);

    answerOptions.querySelectorAll(".answer-option").forEach(opt => opt.style.pointerEvents = "none");
    nextQuestionBtn.style.visibility = "visible";
};

const renderQuestion = () => {
    currentQuestion = getRandomQuestion();
    if (!currentQuestion) return;

    document.querySelector(".question-text").textContent = currentQuestion.question;
    answerOptions.innerHTML = "";
    nextQuestionBtn.style.visibility = "hidden";
    questionStatus.innerHTML = `<b>${questionsIndexHistory.length}</b> of <b>${numberofquestions}</b> Questions`;

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        li.addEventListener("click", () => handleAnswer(li, index));
        answerOptions.appendChild(li);
    });
};

const showResult = () => {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultMessage.innerHTML = `You answered <b>${correctAnswers}</b> out of <b>${numberofquestions}</b> questions correctly. Great effort!`;
};

// Start quiz
renderQuestion();
nextQuestionBtn.addEventListener("click", renderQuestion);
