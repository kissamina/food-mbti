import { test, expect } from "@playwright/test";

// --- ヘルパー: 全問回答して結果ページへ遷移 ---
async function completeDiagnosis(page: import("@playwright/test").Page) {
  // 「診断をはじめる」をクリック
  await page.getByRole("button", { name: "診断をはじめる" }).click();

  // 4ページ分の質問に回答
  for (let pageIdx = 0; pageIdx < 4; pageIdx++) {
    // 各ページで5問、各問の最初の選択肢をクリック
    const buttons = page.locator(".choice-button:not(.selected)");
    // ページ内の未回答ボタンを順番にクリック
    const cards = page.locator(".question-card");
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      // そのカードの選択肢で .selected がなければ最初のボタンを押す
      const selected = card.locator(".choice-button.selected");
      if ((await selected.count()) === 0) {
        await card.locator(".choice-button").first().click();
      }
    }
    // 「次へ」または「結果を見る」をクリック
    const navBtn = pageIdx < 3
      ? page.getByRole("button", { name: "次へ" })
      : page.getByRole("button", { name: "結果を見る" });
    await navBtn.click();
  }

  // 結果ページに遷移したことを確認
  await expect(page.locator("h1")).toHaveText("診断結果");
}

// =============================================
// 1. トップページ
// =============================================
test.describe("トップページ", () => {
  test("タイトル・開始ボタン・16タイプ一覧が表示される", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toHaveText("食キャラ 診断");
    await expect(page.getByRole("button", { name: "診断をはじめる" })).toBeVisible();
    await expect(page.locator("h2", { hasText: "16タイプ一覧" })).toBeVisible();
    // 16枚のタイプカードが表示される
    await expect(page.locator(".type-card")).toHaveCount(16);
  });
});

// =============================================
// 2. 診断フロー
// =============================================
test.describe("診断フロー", () => {
  test("全問回答後に結果ページに遷移できる", async ({ page }) => {
    await page.goto("/");
    await completeDiagnosis(page);
    // 結果ページにタイプ名が表示される
    await expect(page.locator("h2")).not.toBeEmpty();
  });
});

// =============================================
// 3. 結果ページ（/ からアクセス）
// =============================================
test.describe("結果ページ（/ パス）", () => {
  test("タイプ名・説明が表示され、商品セクションが表示されない", async ({ page }) => {
    await page.goto("/");
    await completeDiagnosis(page);

    // タイプ名・説明が存在する
    await expect(page.locator(".type-tag")).toBeVisible();
    await expect(page.locator("h2")).toBeVisible();
    await expect(page.locator(".short-desc")).toBeVisible();
    await expect(page.locator(".long-desc")).toBeVisible();

    // 商品セクションが表示されない
    await expect(page.locator(".product-section")).toHaveCount(0);
  });
});

// =============================================
// 4. 結果ページ（/pr/ からアクセス）
// =============================================
test.describe("結果ページ（/pr/ パス）", () => {
  test("タイプ名・説明が表示され、商品セクションが表示される", async ({ page }) => {
    await page.goto("/pr/");
    await completeDiagnosis(page);

    // タイプ名・説明
    await expect(page.locator(".type-tag")).toBeVisible();
    await expect(page.locator("h2")).toBeVisible();

    // 商品セクションが表示される
    await expect(page.locator(".product-section")).toBeVisible();
    await expect(page.locator(".product-name")).toBeVisible();
    await expect(page.locator(".product-ingredients")).toBeVisible();
    await expect(page.locator(".btn-check")).toBeVisible();
  });
});

// =============================================
// 5. タイプ詳細ページ（/ からアクセス）
// =============================================
test.describe("タイプ詳細ページ（/ パス）", () => {
  test("商品セクションが表示されない", async ({ page }) => {
    await page.goto("/");
    // 最初のタイプカードの「詳しく」ボタンをクリック
    await page.locator(".type-card button").first().click();
    // 詳細ページが表示される
    await expect(page.locator(".detail-container")).toBeVisible();
    // 商品セクションが表示されない
    await expect(page.locator(".product-section")).toHaveCount(0);
  });
});

// =============================================
// 6. タイプ詳細ページ（/pr/ からアクセス）
// =============================================
test.describe("タイプ詳細ページ（/pr/ パス）", () => {
  test("商品セクションが表示される", async ({ page }) => {
    await page.goto("/pr/");
    // 最初のタイプカードの「詳しく」ボタンをクリック
    await page.locator(".type-card button").first().click();
    // 詳細ページが表示される
    await expect(page.locator(".detail-container")).toBeVisible();
    // 商品セクションが表示される
    await expect(page.locator(".product-section")).toBeVisible();
  });
});
