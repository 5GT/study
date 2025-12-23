const state = {
  questions: [],
  order: [],
  index: 0,
  score: 0,
  correct: 0,
  streak: 0,
  totalAnswered: 0,
  totalTime: 0,
  locked: false,
  timerId: null,
  timeLeft: 20,
};

const el = (id) => document.getElementById(id);

async function loadQuestions() {
  const response = await fetch("questions.json");
  const data = await response.json();
  state.questions = data;
  state.order = shuffle(Array.from({ length: data.length }, (_, idx) => idx));
  el("question-total").textContent = data.length;
  startQuiz();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  state.index = 0;
  state.score = 0;
  state.correct = 0;
  state.streak = 0;
  state.totalAnswered = 0;
  state.totalTime = 0;
  el("history-list").innerHTML = "";
  el("summary").textContent = "문제를 풀면 기록이 여기에 채워집니다.";
  el("restart").hidden = true;
  el("skip").disabled = false;
  renderQuestion();
  updateScoreboard();
}

function renderQuestion() {
  clearInterval(state.timerId);
  state.locked = false;
  state.timeLeft = 20;
  const question = currentQuestion();
  if (!question) {
    showCompletion();
    return;
  }

  el("question-step").textContent = state.index + 1;
  el("question-title").textContent = question.title;
  el("hint").textContent = `힌트: ${question.hint}`;
  el("question-image").src = question.image;
  el("feedback").hidden = true;
  el("feedback").textContent = "";
  renderChoices(question);
  startTimer();
}

function renderChoices(question) {
  const list = el("choices");
  list.innerHTML = "";
  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.setAttribute("role", "listitem");
    button.dataset.id = choice.id;
    button.innerHTML = `<span class="letter">${choice.id}</span> <span>${choice.text}</span>`;
    button.addEventListener("click", () => handleAnswer(choice.id));
    list.appendChild(button);
  });
}

function startTimer() {
  updateTimer();
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateTimer();
    if (state.timeLeft <= 0) {
      clearInterval(state.timerId);
      revealAnswer(null);
    }
  }, 1000);
}

function updateTimer() {
  const timer = el("timer");
  timer.textContent = `${state.timeLeft}s`;
  timer.style.color = state.timeLeft <= 5 ? "#f87171" : "var(--warning)";
}

function handleAnswer(choiceId) {
  if (state.locked) return;
  revealAnswer(choiceId);
}

function revealAnswer(choiceId) {
  clearInterval(state.timerId);
  state.locked = true;
  const question = currentQuestion();
  if (!question) return;

  const choiceButtons = Array.from(el("choices").querySelectorAll(".choice"));
  const correctChoice = question.answer;

  choiceButtons.forEach((button) => {
    const id = button.dataset.id;
    if (id === correctChoice) {
      button.classList.add("correct");
    }
    if (choiceId && id === choiceId && id !== correctChoice) {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });

  const answeredCorrectly = choiceId === correctChoice;
  const timeSpent = 20 - state.timeLeft;
  const earned = answeredCorrectly ? Math.max(10, 30 - timeSpent) : 0;

  if (answeredCorrectly) {
    state.score += earned;
    state.correct += 1;
    state.streak += 1;
  } else {
    state.streak = 0;
  }

  state.totalAnswered += 1;
  state.totalTime += timeSpent;
  updateScoreboard();
  appendHistory(question, answeredCorrectly, choiceId, timeSpent, earned);

  const feedback = el("feedback");
  feedback.hidden = false;
  feedback.className = "feedback " + (answeredCorrectly ? "good" : "bad");
  const prefix = answeredCorrectly ? "정답!" : "아쉬워요.";
  const detail = answeredCorrectly
    ? `+${earned}점 획득`
    : `정답은 ${correctChoice}번 ${question.choices.find((c) => c.id === correctChoice)?.text} 입니다.`;
  feedback.textContent = `${prefix} ${detail} — ${question.explanation}`;

  if (state.index >= state.questions.length - 1) {
    el("skip").textContent = "결과 보기";
  } else {
    el("skip").textContent = "다음 문제";
  }
}

function appendHistory(question, answeredCorrectly, choiceId, timeSpent, earned) {
  const list = el("history-list");
  const item = document.createElement("li");
  const label = document.createElement("span");
  label.className = "result-label" + (answeredCorrectly ? "" : " wrong");
  label.textContent = answeredCorrectly ? "정답" : "오답";

  const title = document.createElement("div");
  title.innerHTML = `<strong>${question.title}</strong><br /><small>${timeSpent}s · ${earned}점</small>`;

  item.appendChild(label);
  item.appendChild(title);
  list.prepend(item);
  el("summary").textContent = `${state.totalAnswered}개의 문제를 풀었습니다.`;
}

function updateScoreboard() {
  el("score").textContent = state.score;
  el("correct").textContent = state.correct;
  el("streak").textContent = state.streak;
  const avg = state.totalAnswered ? (state.totalTime / state.totalAnswered).toFixed(1) : "--";
  el("speed").textContent = state.totalAnswered ? `${avg}s` : "--";
}

function nextQuestion() {
  if (!state.locked) {
    revealAnswer(null);
  }
  state.index += 1;
  if (state.index >= state.questions.length) {
    showCompletion();
  } else {
    renderQuestion();
  }
}

function showCompletion() {
  clearInterval(state.timerId);
  el("question-title").textContent = "모든 문제를 풀었습니다!";
  el("hint").textContent = "점수판을 확인하고 다시 도전해보세요.";
  el("choices").innerHTML = "";
  el("question-image").src = "";
  el("feedback").hidden = false;
  el("feedback").className = "feedback";
  el("feedback").textContent = `총 ${state.score}점 · 정답 ${state.correct}/${state.questions.length}`;
  el("skip").disabled = true;
  el("restart").hidden = false;
}

function currentQuestion() {
  const idx = state.order[state.index];
  return state.questions[idx];
}

function restartQuiz() {
  state.order = shuffle(Array.from({ length: state.questions.length }, (_, idx) => idx));
  startQuiz();
}

el("skip").addEventListener("click", nextQuestion);
el("restart").addEventListener("click", restartQuiz);

loadQuestions().catch(() => {
  el("question-title").textContent = "문제를 불러오지 못했습니다.";
  el("hint").textContent = "파일이 올바르게 배치되었는지 확인해주세요.";
});
