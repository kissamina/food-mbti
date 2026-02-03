// src/data/questions.ts
export type Question = {
  id: string;
  type: "HP" | "CR" | "AS" | "DE";
  text: string;
  optionA: string;
  optionB: string;
};

export const questions: Question[] = [
  // --- 軸1：動機 (Health vs Pleasure) ---
  {
    id: "q1",
    type: "HP",
    text: "メニューを選ぶ際、まず「野菜の量」や「タンパク質」を計算する？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q2",
    type: "HP",
    text: "ストレスが溜まると、つい高カロリーなジャンクフードに走ってしまう？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q3",
    type: "HP",
    text: "サプリやプロテインなど、栄養補助食品を日常的に取り入れている？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q4",
    type: "HP",
    text: "たとえ太るとわかっていても、深夜のラーメンの誘惑には勝てない？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q5",
    type: "HP",
    text: "食事の最大の目的は「健康な体作り」にあると思う？",
    optionA: "はい",
    optionB: "いいえ",
  },

  // --- 軸2：リズム (Clock vs Random) ---
  {
    id: "q6",
    type: "CR",
    text: "授業やバイトの有無に関わらず、朝・昼・晩の時間は固定されている？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q7",
    type: "CR",
    text: "お腹が空いていなくても「時間になったから食べる」ことが多い？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q8",
    type: "CR",
    text: "休日は昼過ぎまで寝てしまい、1日2食（または1食）になるのが普通だ？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q9",
    type: "CR",
    text: "深夜2時過ぎにしっかりした食事を摂ることがよくある？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q10",
    type: "CR",
    text: "1週間のうち、決まったルーティンで食事を摂る日が4日以上ある？",
    optionA: "はい",
    optionB: "いいえ",
  },

  // --- 軸3：好奇心 (Adventure vs Safe) ---
  {
    id: "q11",
    type: "AS",
    text: "初めて行く街では、チェーン店よりも見たことのない個人店に入りたい？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q12",
    type: "AS",
    text: "「：期間限定メニューや新発売の文字を見ると、つい挑戦したくなる？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q13",
    type: "AS",
    text: "お気に入りのメニューを見つけたら、そればかりをリピートし続ける？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q14",
    type: "AS",
    text: "海外の珍しい調味料や、食べたことのない異国料理に興味がある？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q15",
    type: "AS",
    text: "飲食店選びで一番大事なのは「失敗しない（確実に美味しい）」ことだ？",
    optionA: "はい",
    optionB: "いいえ",
  },

  // --- 軸4：労力 (Do vs Easy) ---
  {
    id: "q16",
    type: "DE",
    text: "食事中は動画やスマホを見ず、味や盛り付けをじっくり楽しみたい？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q17",
    type: "DE",
    text: "準備や後片付けに時間をかけるくらいなら、サッと食べ終えたい？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q18",
    type: "DE",
    text: "たとえ一人の食事でも、お皿に綺麗に盛り付けるとテンションが上がる？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q19",
    type: "DE",
    text: "食事は「味わうもの」というより、次のタスクのための「燃料補給」に近い？",
    optionA: "はい",
    optionB: "いいえ",
  },
  {
    id: "q20",
    type: "DE",
    text: "ゆっくり時間をかけてフルコースを食べるより、短時間で済む牛丼やパンの方が合理的で好き？",
    optionA: "はい",
    optionB: "いいえ",
  },
];