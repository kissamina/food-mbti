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
    text: "ランチ選びの決め手は？",
    optionA: "一応「野菜」や「栄養」を気にする",
    optionB: "今の欲求優先！「味の濃さ」や「ガッツリ」で選ぶ",
  },
  {
    id: "q2",
    type: "HP",
    text: "ストレスが溜まった時の食生活は？",
    optionA: "体調管理のために栄養ドリンクや食事に気を使う",
    optionB: "発散のために甘いもの・ジャンクフードを爆食い",
  },
  {
    id: "q3",
    type: "HP",
    text: "普段の飲み物はどっちが多い？",
    optionA: "水・お茶・ブラックコーヒー（無糖）",
    optionB: "ジュース・甘いラテ・エナドリ（糖分あり）",
  },
  {
    id: "q4",
    type: "HP",
    text: "深夜のラーメンの誘惑、勝てる？",
    optionA: "「むくむ」「太る」と思って我慢する",
    optionB: "本能に抗えない。「背徳感が最高」と食べちゃう",
  },
  {
    id: "q5",
    type: "HP",
    text: "商品パッケージ、どこを最初に見る？",
    optionA: "裏面の「成分表示」やカロリー",
    optionB: "表面の「おいしそうな写真」や増量の文字",
  },

  // --- 軸2：リズム (Clock vs Random) ---
  {
    id: "q6",
    type: "CR",
    text: "平日の朝ごはんはどうしてる？",
    optionA: "毎日だいたい決まった時間に食べる",
    optionB: "ギリギリまで寝て食べない。時間もバラバラ",
  },
  {
    id: "q7",
    type: "CR",
    text: "空腹を感じるタイミングは？",
    optionA: "昼12時や夜19時など、食事時になると空く",
    optionB: "時間は関係ない。深夜に突然猛烈に空くことがある",
  },
  {
    id: "q8",
    type: "CR",
    text: "休日の食リズムは？",
    optionA: "平日とあまり変えず、規則正しく食べる",
    optionB: "昼過ぎまで寝て、一食目が夕方になるなど崩壊しがち",
  },
  {
    id: "q9",
    type: "CR",
    text: "ゲームや課題に集中してる時、食事は？",
    optionA: "お腹が空いたら一旦中断して食べる",
    optionB: "空腹を忘れ、気づけば何時間も経っている",
  },
  {
    id: "q10",
    type: "CR",
    text: "夕食を食べる時間帯は？",
    optionA: "基本的には24時前には食べ終わる",
    optionB: "24時過ぎや、深夜2時ごろになることがよくある",
  },

  // --- 軸3：好奇心 (Adventure vs Safe) ---
  {
    id: "q11",
    type: "AS",
    text: "飲食店でのメニュー選び、どっち派？",
    optionA: "「期間限定」や「新メニュー」に惹かれる",
    optionB: "失敗したくないから「いつもの定番」を選ぶ",
  },
  {
    id: "q12",
    type: "AS",
    text: "「これ何の味？」という未知の食べ物は？",
    optionA: "面白そう！とりあえず一口試してみる",
    optionB: "味が想像できないものは怖くて手を出さない",
  },
  {
    id: "q13",
    type: "AS",
    text: "友達に「珍しい専門店がある」と誘われたら？",
    optionA: "即OK！新しい刺激を求める",
    optionB: "まずは食べログで馴染める味か入念に確認する",
  },
  {
    id: "q14",
    type: "AS",
    text: "コンビニのレジ横の新商品は？",
    optionA: "見たことないやつはとりあえず買ってみる",
    optionB: "結局いつも買ってるお気に入りを選んじゃう",
  },
  {
    id: "q15",
    type: "AS",
    text: "旅行先での食事はどう決める？",
    optionA: "現地の人が行くようなニッチな店を攻める",
    optionB: "安心安全！有名なチェーン店やガイドブックの店へ",
  },

  // --- 軸4：労力 (Do vs Easy) ---
  {
    id: "q16",
    type: "DE",
    text: "自炊についてのスタンスは？",
    optionA: "節約や健康のために、基本は自分で作る",
    optionB: "面倒くさい。外食・コンビニ・惣菜がメイン",
  },
  {
    id: "q17",
    type: "DE",
    text: "冷蔵庫に中途半端な余り物があったら？",
    optionA: "何か作れないかレシピを考える",
    optionB: "放置して、結局コンビニにお弁当を買いに行く",
  },
  {
    id: "q18",
    type: "DE",
    text: "料理の後の「洗い物」についてどう思う？",
    optionA: "手間だけど、自炊の一環として割り切れる",
    optionB: "とにかく苦痛。極力お皿を出したくない",
  },
  {
    id: "q19",
    type: "DE",
    text: "スーパーに行く主な目的は？",
    optionA: "肉、魚、野菜などの「素材」を買うため",
    optionB: "お惣菜、お弁当、冷凍食品を買うため",
  },
  {
    id: "q20",
    type: "DE",
    text: "テスト期間など、忙しい時の食事は？",
    optionA: "簡単なもの（納豆ご飯など）をサッと用意する",
    optionB: "カップ麺やゼリー飲料、菓子パンで済ませる",
  },
];