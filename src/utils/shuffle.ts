// src/utils/shuffle.ts

function sfc32(a: number, b: number, c: number, d: number) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      var t = (a + b | 0) + d | 0;
      d = d + 1 | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    };
  }
  
  export function seededShuffle<T>(array: T[], seed: number): T[] {
    const shuffled = array.map(item => ({ ...item })); // ディープコピー
    const rng = sfc32(seed, seed + 1, seed + 2, seed + 3);
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    // ★ 選択肢の入れ替えロジックを追加
    return shuffled.map((q: any) => {
      // 0.5より小さければ入れ替える（これもシードに基づいた rng() を使う）
      if (rng() < 0.5) {
        const originalA = q.optionA;
        q.optionA = q.optionB;
        q.optionB = originalA;
        q.isSwapped = true; // 入れ替えたことを記録しておく
      } else {
        q.isSwapped = false;
      }
      return q;
    });
  }