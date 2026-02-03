// src/main.ts
import { questions as originalQuestions } from "./data/questions.js";
import { seededShuffle } from "./utils/shuffle.js";
import { foodMbtiTypes } from "./data/types.js";
import { judgeType } from "./logic/judgeType.js";
// --- シャッフル設定 ---
const SEED = 42;
// 質問順と「左右のAB」を同時に決定的にシャッフル
const shuffledQuestions = seededShuffle(originalQuestions, SEED);
const QUESTIONS_PER_PAGE = 5;
let currentView = { name: "top" };
let answers = [];
const app = document.getElementById("app");
function setView(view) {
    currentView = view;
    render();
}
function setAnswer(questionId, choice) {
    const existingIndex = answers.findIndex((a) => a.questionId === questionId);
    if (existingIndex >= 0) {
        answers[existingIndex] = { questionId, choice };
    }
    else {
        answers.push({ questionId, choice });
    }
}
function getAnswerChoice(questionId) {
    const found = answers.find((a) => a.questionId === questionId);
    return found ? found.choice : null;
}
// --- 描画関数 ---
function renderTop() {
    app.innerHTML = "";
    const container = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = "食キャラ 診断";
    const desc = document.createElement("p");
    desc.textContent = "大学生の食生活から、あなたのタイプと救済フードを提案するよ！";
    const startBtn = document.createElement("button");
    startBtn.textContent = "診断をはじめる";
    startBtn.className = "btn-primary";
    startBtn.onclick = () => {
        answers = [];
        setView({ name: "diagnosis", pageIndex: 0 });
    };
    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(startBtn);
    // タイプ一覧
    const typeListTitle = document.createElement("h2");
    typeListTitle.textContent = "16タイプ一覧";
    container.appendChild(typeListTitle);
    const typeList = document.createElement("div");
    typeList.className = "type-list";
    foodMbtiTypes.forEach((t) => {
        const card = document.createElement("div");
        card.className = "type-card";
        card.innerHTML = `<h3>${t.name}</h3><div class="type-tag">${t.id}</div>`;
        const btn = document.createElement("button");
        btn.textContent = "詳しく";
        btn.onclick = () => setView({ name: "typeDetail", typeId: t.id });
        card.appendChild(btn);
        const img = document.createElement("img");
        img.src = `${t.iconPath}`;
        img.alt = t.name;
        img.className = "type-image";
        card.appendChild(img);
        typeList.appendChild(card);
    });
    container.appendChild(typeList);
    app.appendChild(container);
}
function renderDiagnosis(pageIndex) {
    const totalPages = Math.ceil(shuffledQuestions.length / QUESTIONS_PER_PAGE);
    const start = pageIndex * QUESTIONS_PER_PAGE;
    const end = start + QUESTIONS_PER_PAGE;
    const pageQuestions = shuffledQuestions.slice(start, end);
    app.innerHTML = "";
    const header = document.createElement("div");
    header.className = "page-header";
    header.innerHTML = `<h2>質問 (${pageIndex + 1}/${totalPages})</h2>`;
    const backBtn = document.createElement("button");
    backBtn.textContent = "トップへ";
    backBtn.onclick = () => setView({ name: "top" });
    header.appendChild(backBtn);
    app.appendChild(header);
    const container = document.createElement("div");
    container.className = "questions-container";
    pageQuestions.forEach((q, index) => {
        const card = document.createElement("div");
        card.className = "question-card";
        card.innerHTML = `<p class="question-text">Q${start + index + 1}. ${q.text}</p>`;
        const choiceGroup = document.createElement("div");
        choiceGroup.className = "choice-group";
        const currentChoice = getAnswerChoice(q.id);
        ["A", "B"].forEach((choice) => {
            const btn = document.createElement("button");
            btn.textContent = choice === "A" ? q.optionA : q.optionB;
            btn.className = "choice-button btn-outline" + (currentChoice === choice ? " selected" : "");
            btn.onclick = () => {
                setAnswer(q.id, choice);
                renderDiagnosis(pageIndex);
            };
            choiceGroup.appendChild(btn);
        });
        card.appendChild(choiceGroup);
        container.appendChild(card);
    });
    app.appendChild(container);
    const nav = document.createElement("div");
    nav.className = "nav-buttons";
    const allAnswered = pageQuestions.every(q => getAnswerChoice(q.id) !== null);
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "前へ";
    prevBtn.disabled = pageIndex === 0;
    prevBtn.onclick = () => setView({ name: "diagnosis", pageIndex: pageIndex - 1 });
    const nextBtn = document.createElement("button");
    nextBtn.textContent = pageIndex === totalPages - 1 ? "結果を見る" : "次へ";
    nextBtn.className = "btn-primary" + (allAnswered ? "" : " blocked");
    nextBtn.onclick = () => {
        if (!allAnswered)
            return;
        if (pageIndex === totalPages - 1) {
            // ★ judgeType に answers と shuffledQuestions の両方を渡す
            const result = judgeType(answers, shuffledQuestions);
            setView({ name: "result", resultType: result });
        }
        else {
            setView({ name: "diagnosis", pageIndex: pageIndex + 1 });
        }
    };
    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    app.appendChild(nav);
}
// 診断結果ページ
function renderResult(resultType) {
    app.innerHTML = `
    <div class="result-container">
      <h1>診断結果</h1>
      <div class="type-tag">${resultType.id}</div>
      <h2>${resultType.name}</h2>
      
      <img src="${resultType.iconPath}" alt="${resultType.name}" class="result-image">
      
      <p class="short-desc"><strong>${resultType.shortDescription}</strong></p>
      <p class="long-desc">${resultType.longDescription}</p>

      <img src="${resultType.imagePath}" alt="${resultType.name}" class="result-image">

      
      <div class="button-group" style="margin-top: 20px;">
        <button id="detail-btn" class="btn-outline">詳しい説明を見る</button>
        <button id="retry-btn" class="btn-primary" style="margin-left: 8px;">もう一度診断する</button>
      </div>
    </div>
  `;
    // イベントリスナーの設定
    document.getElementById("detail-btn").onclick = () => {
        setView({ name: "typeDetail", typeId: resultType.id });
    };
    document.getElementById("retry-btn").onclick = () => {
        answers = [];
        setView({ name: "diagnosis", pageIndex: 0 });
    };
}
// タイプ詳細ページ
function renderTypeDetail(typeId) {
    const type = foodMbtiTypes.find(t => t.id === typeId);
    if (!type)
        return;
    app.innerHTML = `
    <div class="detail-container">
      <h1>${type.name}</h1>
      <div class="type-tag">${type.id}</div>
      
      <img src="${type.iconPath}" alt="${type.name}" class="result-image">
      
      <p>${type.longDescription}</p>
      <img src="${type.imagePath}" alt="${type.name}" class="result-image">

      <button id="back-btn" class="btn-outline">一覧に戻る</button>
    </div>
  `;
    document.getElementById("back-btn").onclick = () => setView({ name: "top" });
}
function render() {
    switch (currentView.name) {
        case "top":
            renderTop();
            break;
        case "diagnosis":
            renderDiagnosis(currentView.pageIndex);
            break;
        case "result":
            renderResult(currentView.resultType);
            break;
        case "typeDetail":
            renderTypeDetail(currentView.typeId);
            break;
    }
}
render();
