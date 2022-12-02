import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:8081/");
  await page
    .getByRole("tabpanel", { name: "登入" })
    .locator('input[type="email"]')
    .click();
  await page
    .getByRole("tabpanel", { name: "登入" })
    .locator('input[type="email"]')
    .fill("hannah@admin.com");
  await page
    .getByRole("tabpanel", { name: "登入" })
    .locator('input[type="email"]')
    .press("Tab");
  await page
    .getByRole("tabpanel", { name: "登入" })
    .locator('input[type="password"]')
    .fill("111111");
  await page.getByRole("button", { name: "登入" }).click();
  await page.getByRole("button", { name: "確定" }).click();
  await page.getByRole("menuitem", { name: "建立產品" }).click();
  await page.getByPlaceholder("請輸入商品名稱").click();
  await page.getByPlaceholder("請輸入商品名稱").fill("7");
  await page.getByPlaceholder("請上傳商品圖片").click();
  // await page.getByPlaceholder("請上傳商品圖片").setInputFiles("下載.jpeg");
  await page.getByPlaceholder("請輸入產品價格").click();
  await page.getByPlaceholder("請輸入產品價格").fill("7");
  await page.getByPlaceholder("請輸入產品庫存").click();
  await page.getByPlaceholder("請輸入產品庫存").fill("7");
  await page.locator("textarea").click();
  await page.locator("textarea").fill("7");
  await page.getByRole("button", { name: "新增" }).click();
  await page.getByRole("button", { name: "確定" }).click();
  await page
    .getByRole("row", { name: " 編輯  刪除" })
    // .filter({ hasText: "77777編輯刪除確定要刪除此筆訂單嗎?取消確定" })
    .getByRole("button", { name: " 編輯" })
    .click();
  await page.getByPlaceholder("請輸入商品名稱").click();
  await page.getByPlaceholder("請輸入商品名稱").fill("香草拿鐵");
  await page.getByPlaceholder("請輸入產品價格").click();
  await page.getByPlaceholder("請輸入產品價格").fill("110");
  await page.getByPlaceholder("請輸入產品庫存").click();
  await page.getByPlaceholder("請輸入產品庫存").fill("200");
  await page.locator("textarea").click();
  await page.locator("textarea").fill("無");
  await page.getByRole("button", { name: " 儲存" }).click();
  await page
    .getByRole("row", { name: " 編輯  刪除" })
    // .filter({ hasText: "770707070編輯刪除確定要刪除此筆訂單嗎?取消確定" })
    .getByRole("button", { name: " 刪除" })
    .click();
  await page
    .getByRole("row", { name: " 編輯  刪除 確定要刪除此筆訂單嗎？" })
    // .filter({ hasText: "770707070編輯刪除確定要刪除此筆訂單嗎?取消確定" })
    .getByRole("button", { name: "確定" })
    .click();
  await page.getByRole("button", { name: "登出" }).click();
  await page.getByRole("button", { name: "確定" }).click();
});
