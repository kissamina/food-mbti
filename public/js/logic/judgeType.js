// src/logic/judgeType.ts
import { foodMbtiTypes } from "../data/types.js";
/**
 * ユーザーの回答を分析し、16タイプの中から最適なものを判定する
 * @param answers ユーザーの回答リスト
 * @param questions シャッフル済みの質問リスト（isSwapped判定用）
 */
export function judgeType(answers, questions) {
    // 1. 各軸のカウント用
    const counts = {
        HP: 0,
        CR: 0,
        AS: 0,
        DE: 0,
    };
    // 2. 回答をループして集計
    answers.forEach((ans) => {
        // 渡された質問リストから該当する質問を探す
        const question = questions.find((q) => q.id === ans.questionId);
        if (question) {
            let effectiveChoice = ans.choice;
            // 左右が入れ替わっていたら判定を逆転させる
            if (question.isSwapped) {
                effectiveChoice = ans.choice === "A" ? "B" : "A";
            }
            // 本来のA（左側指標）であればカウント
            if (effectiveChoice === "A") {
                counts[question.type]++;
            }
        }
    });
    // 3. MBTIコードの生成 (3以上で左側タイプ)
    const code = [
        counts.HP >= 3 ? "H" : "P",
        counts.CR >= 3 ? "C" : "R",
        counts.AS >= 3 ? "A" : "S",
        counts.DE >= 3 ? "D" : "E",
    ].join("-");
    // 4. タイプ検索
    const result = foodMbtiTypes.find((t) => t.id === code);
    return result || foodMbtiTypes[0];
}
