const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxESkI7tJufsArq3jQEWA9ie9FueaFEjyajfJ_pPS6WVE2CadLHXKsXHaYjZENtgUm2vw/exec";

const domains = {
  myself: {
    key: "myself",
    originalName: "Myself",
    studentName: "나를 챙기는 힘",
    description: "계획을 세우고, 스스로를 관리하며, 끝까지 해내는 힘이에요.",
    tips: [
      "해야 할 일을 작은 순서로 나누어 보기",
      "놀기 전에 먼저 해야 할 일 하나 끝내기",
      "어려운 일이 있으면 혼자 참기보다 도움 요청하기"
    ]
  },
  bridge: {
    key: "bridge",
    originalName: "Bridge",
    studentName: "친구와 함께하는 힘",
    description: "친구의 마음을 살피고, 함께 어울리며, 서로 도와주는 힘이에요.",
    tips: [
      "친구가 말할 때 끝까지 들어 보기",
      "모둠활동에서 먼저 한 번 도와주기",
      "친구의 표정과 말투를 살펴보기"
    ]
  },
  together: {
    key: "together",
    originalName: "Together",
    studentName: "함께 지키는 힘",
    description: "우리 반과 학교에서 함께 지켜야 할 것을 생각하며 행동하는 힘이에요.",
    tips: [
      "반 규칙을 떠올리며 행동해 보기",
      "도움이 필요한 친구를 보면 먼저 다가가기",
      "예의 바른 말 한마디 실천하기"
    ]
  },
  innerPeace: {
    key: "innerPeace",
    originalName: "Inner Peace",
    studentName: "내 마음 돌보는 힘",
    description: "내 기분을 알아차리고, 감정을 표현하고, 마음을 가라앉히는 힘이에요.",
    tips: [
      "지금 내 기분을 한 단어로 말해 보기",
      "불편한 기분이 들면 잠깐 천천히 숨 쉬기",
      "기분이 좋지 않은 이유를 조용히 생각해 보기"
    ]
  }
};

const questions = [
  { no: 1, domain: "myself", text: "나는 좋은 성적을 얻기 위해 구체적인 계획을 세운다." },
  { no: 2, domain: "myself", text: "나는 놀고 싶어도 해야 할 일을 먼저 끝낸 다음에 논다." },
  { no: 3, domain: "myself", text: "나는 내가 계획한 대로 일이 진행되고 있는지 중간 중간 확인한다." },
  { no: 4, domain: "myself", text: "나는 숙제가 어려워도 포기하지 않고 끝까지 해서 낸다." },
  { no: 5, domain: "myself", text: "나는 어려운 일이 생기면 도와 달라고 부탁하는 편이다." },

  { no: 6, domain: "bridge", text: "나는 모둠 활동을 할 때 친구를 잘 도와준다." },
  { no: 7, domain: "bridge", text: "나는 다른 사람의 말이나 표정으로 그 사람의 기분을 알아차릴 수 있다." },
  { no: 8, domain: "bridge", text: "나는 우리 반 친구들과 두루 친하게 지낸다." },
  { no: 9, domain: "bridge", text: "나는 다른 사람의 생각과 감정을 이해하려고 노력한다." },
  { no: 10, domain: "bridge", text: "나는 다른 사람이 슬퍼할 때 함께 슬퍼한다." },

  { no: 11, domain: "together", text: "나는 다른 사람들과 생활할 때 도움이 되는 행동을 하려고 노력한다." },
  { no: 12, domain: "together", text: "나는 어떤 행동이 예의 바른 행동인지 알고 있다." },
  { no: 13, domain: "together", text: "나는 도움이 필요한 친구를 보면 잘 도와주는 편이다." },
  { no: 14, domain: "together", text: "나는 학교에서 지켜야 할 규칙을 알고 있다." },
  { no: 15, domain: "together", text: "나는 우리 반에서 정한 규칙을 잘 지킨다." },

  { no: 16, domain: "innerPeace", text: "나는 내 기분에 이름을 붙일 수 있다." },
  { no: 17, domain: "innerPeace", text: "나는 내가 느끼는 기분의 이유를 정확히 알아차릴 수 있다." },
  { no: 18, domain: "innerPeace", text: "나는 상황에 맞게 내 감정을 표현할 수 있다." },
  { no: 19, domain: "innerPeace", text: "나는 불편한 기분이 들 때 스스로 가라앉힐 수 있다." },
  { no: 20, domain: "innerPeace", text: "나는 내가 어떤 상황에서 기분이 불편하고 나쁜지 알고 있다." }
];

const likertChoices = [
  { label: "매우 그렇다", value: 5 },
  { label: "그렇다", value: 4 },
  { label: "보통이다", value: 3 },
  { label: "그렇지 않다", value: 2 },
  { label: "전혀 그렇지 않다", value: 1 }
];

const appState = {
  student: {
    className: "",
    number: "",
    name: ""
  },
  answers: {},
  currentPage: 0
};

const pageSize = 5;
const totalPages = questions.length / pageSize;

const screenIntro = document.getElementById("screen-intro");
const screenSurvey = document.getElementById("screen-survey");
const screenResult = document.getElementById("screen-result");

const studentClassEl = document.getElementById("studentClass");
const studentNumberEl = document.getElementById("studentNumber");
const studentNameEl = document.getElementById("studentName");

const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const pageLabel = document.getElementById("pageLabel");
const progressBar = document.getElementById("progressBar");
const sectionTitle = document.getElementById("sectionTitle");
const sectionSubtitle = document.getElementById("sectionSubtitle");
const questionsContainer = document.getElementById("questionsContainer");

const resultGreeting = document.getElementById("resultGreeting");
const strengthList = document.getElementById("strengthList");
const growthList = document.getElementById("growthList");
const tipsList = document.getElementById("tipsList");

let resultChart = null;

function showScreen(screenName) {
  screenIntro.classList.remove("active");
  screenSurvey.classList.remove("active");
  screenResult.classList.remove("active");

  if (screenName === "intro") screenIntro.classList.add("active");
  if (screenName === "survey") screenSurvey.classList.add("active");
  if (screenName === "result") screenResult.classList.add("active");
}

function validateIntro() {
  const className = studentClassEl.value.trim();
  const number = studentNumberEl.value.trim();
  const name = studentNameEl.value.trim();

  if (!className) {
    alert("반을 선택해 주세요.");
    studentClassEl.focus();
    return false;
  }

  if (!number) {
    alert("번호를 입력해 주세요.");
    studentNumberEl.focus();
    return false;
  }

  if (Number(number) <= 0) {
    alert("번호는 1 이상의 숫자로 입력해 주세요.");
    studentNumberEl.focus();
    return false;
  }

  if (!name) {
    alert("이름을 입력해 주세요.");
    studentNameEl.focus();
    return false;
  }

  appState.student = {
    className,
    number,
    name
  };

  return true;
}

function getCurrentPageQuestions() {
  const start = appState.currentPage * pageSize;
  return questions.slice(start, start + pageSize);
}

function renderCurrentPage() {
  const currentQuestions = getCurrentPageQuestions();
  pageLabel.textContent = `${appState.currentPage + 1} / ${totalPages}`;
  progressBar.style.width = `${((appState.currentPage + 1) / totalPages) * 100}%`;

  sectionTitle.textContent = `${appState.student.name}님의 응답`;
  sectionSubtitle.textContent = "가장 내 모습에 가까운 답을 골라 주세요.";

  questionsContainer.innerHTML = "";

  currentQuestions.forEach((q) => {
    const questionCard = document.createElement("div");
    questionCard.className = "question-card";

    const selectedValue = appState.answers[q.no] || "";

    const choicesHTML = likertChoices
      .map(
        (choice) => `
          <div class="choice-option">
            <input
              type="radio"
              id="q${q.no}_${choice.value}"
              name="q${q.no}"
              value="${choice.value}"
              ${String(selectedValue) === String(choice.value) ? "checked" : ""}
            />
            <label for="q${q.no}_${choice.value}">${choice.label}</label>
          </div>
        `
      )
      .join("");

    questionCard.innerHTML = `
      <div class="question-number">${q.no}번 문항</div>
      <div class="question-text">${q.text}</div>
      <div class="choice-group">${choicesHTML}</div>
    `;

    questionsContainer.appendChild(questionCard);
  });

  currentQuestions.forEach((q) => {
    const radios = document.querySelectorAll(`input[name="q${q.no}"]`);
    radios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        appState.answers[q.no] = Number(e.target.value);
      });
    });
  });

  prevBtn.style.visibility = appState.currentPage === 0 ? "hidden" : "visible";
  nextBtn.textContent = appState.currentPage === totalPages - 1 ? "결과 보기" : "다음";
}

function validateCurrentPage() {
  const currentQuestions = getCurrentPageQuestions();
  const unanswered = currentQuestions.find((q) => !appState.answers[q.no]);

  if (unanswered) {
    alert(`${unanswered.no}번 문항에 답해 주세요.`);
    return false;
  }
  return true;
}

function calculateResults() {
  const grouped = {
    myself: [],
    bridge: [],
    together: [],
    innerPeace: []
  };

  questions.forEach((q) => {
    grouped[q.domain].push(appState.answers[q.no]);
  });

  const averages = Object.keys(grouped).map((domainKey) => {
    const arr = grouped[domainKey];
    const avg = arr.reduce((sum, v) => sum + v, 0) / arr.length;
    return {
      domainKey,
      average: avg,
      ...domains[domainKey]
    };
  });

  const scoreMap = {};
  averages.forEach((item) => {
    scoreMap[item.domainKey] = Number(item.average.toFixed(2));
  });

  const overall =
    averages.reduce((sum, item) => sum + item.average, 0) / averages.length;

  averages.sort((a, b) => b.average - a.average);

  return {
    sortedResults: averages,
    scoreMap,
    overall: Number(overall.toFixed(2))
  };
}

function buildRelativeMessage(rankIndex) {
  if (rankIndex === 0) return "지금 특히 잘 자라고 있는 힘이에요.";
  if (rankIndex === 1) return "꾸준히 잘 보여 주고 있는 힘이에요.";
  if (rankIndex === 2) return "조금 더 연습하면 더욱 단단해질 수 있는 힘이에요.";
  return "앞으로 천천히 키워 가면 좋은 힘이에요.";
}

function renderResult() {
  const { sortedResults } = calculateResults();
  const strengths = sortedResults.slice(0, 2);
  const growths = sortedResults.slice(2);

  resultGreeting.textContent = `${appState.student.className} ${appState.student.number}번 ${appState.student.name}님, 나의 마음과 관계를 천천히 살펴보는 시간을 잘 마쳤어요.`;

  strengthList.innerHTML = strengths
    .map(
      (item, idx) => `
        <div class="result-item">
          <div class="result-item-title">${item.studentName} (${item.originalName})</div>
          <div class="result-item-desc">
            ${item.description}<br />
            ${buildRelativeMessage(idx)}
          </div>
        </div>
      `
    )
    .join("");

  growthList.innerHTML = growths
    .map(
      (item, idx) => `
        <div class="result-item">
          <div class="result-item-title">${item.studentName} (${item.originalName})</div>
          <div class="result-item-desc">
            ${item.description}<br />
            ${buildRelativeMessage(idx + 2)}
          </div>
        </div>
      `
    )
    .join("");

  const tipPool = [];
  growths.forEach((item) => {
    item.tips.forEach((tip) => tipPool.push(tip));
  });

  const uniqueTips = [...new Set(tipPool)].slice(0, 4);
  tipsList.innerHTML = uniqueTips.map((tip) => `<li>${tip}</li>`).join("");

  drawChart(sortedResults);
}

function drawChart(results) {
  const ctx = document.getElementById("resultChart");

  if (resultChart) {
    resultChart.destroy();
  }

  // 학생에게는 숫자 점수가 아니라 상대적 위치만 보여주기 위해
  // 실제 평균값(1~5)을 화면용 값으로 살짝 압축합니다.
  const displayValues = results.map((item) => {
    return 1 + (item.average - 1) * 0.45;
  });

  resultChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: results.map((item) => item.studentName),
      datasets: [
        {
          label: "상대적 강점",
          data: displayValues,
          backgroundColor: ["#7aa8ff", "#8dd3c7", "#ffd27d", "#ffb3c1"],
          borderRadius: 12,
          borderSkipped: false,
          barPercentage: 0.55,
          categoryPercentage: 0.6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        y: {
          min: 0,
          max: 3,
          ticks: {
            display: false
          },
          grid: {
            display: false,
            drawBorder: false
          },
          border: {
            display: false
          }
        },
        x: {
          ticks: {
            color: "#44516b",
            font: {
              size: 13,
              weight: "700"
            }
          },
          grid: {
            display: false
          },
          border: {
            display: false
          }
        }
      }
    }
  });

  ctx.height = 180;
}

function resetApp() {
  appState.student = {
    className: "",
    number: "",
    name: ""
  };
  appState.answers = {};
  appState.currentPage = 0;

  studentClassEl.value = "";
  studentNumberEl.value = "";
  studentNameEl.value = "";

  showScreen("intro");
}

startBtn.addEventListener("click", () => {
  if (!validateIntro()) return;
  appState.currentPage = 0;
  renderCurrentPage();
  showScreen("survey");
});

prevBtn.addEventListener("click", () => {
  if (appState.currentPage > 0) {
    appState.currentPage -= 1;
    renderCurrentPage();
  }
});

nextBtn.addEventListener("click", async () => {
  if (!validateCurrentPage()) return;

  if (appState.currentPage < totalPages - 1) {
    appState.currentPage += 1;
    renderCurrentPage();
  } else {
    try {
      await saveResultToSheet();
    } catch (error) {
      console.error("시트 저장 중 오류:", error);
      alert("응답 저장 중 문제가 있었어요. 인터넷 연결이나 설정을 확인해 주세요.");
      return;
    }

    renderResult();
    showScreen("result");
  }
});

restartBtn.addEventListener("click", () => {
  resetApp();
});

showScreen("intro");
async function saveResultToSheet() {
  const resultData = calculateResults();
  const payload = {
    className: appState.student.className,
    number: appState.student.number,
    name: appState.student.name,
    Q1: appState.answers[1] || "",
    Q2: appState.answers[2] || "",
    Q3: appState.answers[3] || "",
    Q4: appState.answers[4] || "",
    Q5: appState.answers[5] || "",
    Q6: appState.answers[6] || "",
    Q7: appState.answers[7] || "",
    Q8: appState.answers[8] || "",
    Q9: appState.answers[9] || "",
    Q10: appState.answers[10] || "",
    Q11: appState.answers[11] || "",
    Q12: appState.answers[12] || "",
    Q13: appState.answers[13] || "",
    Q14: appState.answers[14] || "",
    Q15: appState.answers[15] || "",
    Q16: appState.answers[16] || "",
    Q17: appState.answers[17] || "",
    Q18: appState.answers[18] || "",
    Q19: appState.answers[19] || "",
    Q20: appState.answers[20] || "",
    myself: resultData.scoreMap.myself,
    bridge: resultData.scoreMap.bridge,
    together: resultData.scoreMap.together,
    innerPeace: resultData.scoreMap.innerPeace,
    overall: resultData.overall
  };

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  return response;
}