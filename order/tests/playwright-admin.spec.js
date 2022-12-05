// @ts-check
// import sync_playwright from playwright.sync_api
// import { test, expect, chromium } from "@playwright/test";
const email = "hannah@admin.com";
const { test, expect } = require("@playwright/test");
test("test", async ({ page }) => {
  await page.goto("http://localhost:8080/");
  await page.locator(".joinBtn").first().click(); //首頁的按鈕圖片
  // await page
  //    .wait_for_selector('input[type="email"]')
  //   .getByRole("tabpanel", { name: "登入" })
  //   .locator('input[type="email"]')
  //    .first();
  //   .click();

  await page
    .getByRole("tabpanel", { name: "登入" })
    .locator('input[type="email"]')
    .fill(email);
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
  await page.getByPlaceholder("請輸入商品名稱").fill("薄荷摩卡");
  await page.getByPlaceholder("請輸入商品名稱").press("Enter");
  await page.getByPlaceholder("請上傳商品圖片").click();
  await page.getByPlaceholder("請上傳商品圖片").setInputFiles("下載.jpeg");
  await page.getByPlaceholder("請輸入產品價格").click();
  await page.getByPlaceholder("請輸入產品價格").fill("120");
  await page.getByPlaceholder("請輸入產品庫存").click();
  await page.getByPlaceholder("請輸入產品庫存").fill("120");
  await page.locator("textarea").click();
  await page.locator("textarea").fill("無");
  await page.getByRole("button", { name: "新增" }).click();
  await page.getByRole("button", { name: "確定" }).click();
  await page
    .getByRole("row", { name: " 編輯  刪除" })
    .filter({
      hasText: "8薄荷摩卡120120無編輯刪除確定要刪除此筆訂單嗎？取消確定",
    })
    .getByRole("button", { name: " 編輯" })
    .click();
  await page.getByPlaceholder("請輸入商品名稱").click();
  await page
    .getByRole("row", { name: " 編輯  刪除" })
    .filter({
      hasText:
        "812月限量薄荷摩卡120120無編輯刪除確定要刪除此筆訂單嗎？取消確定",
    })
    .getByRole("button", { name: " 刪除" })
    .click();
  await page.getByPlaceholder("請輸入產品價格").click();
  await page.getByPlaceholder("請輸入產品價格").fill("130");
  await page.getByPlaceholder("請輸入產品庫存").click();
  await page.getByPlaceholder("請輸入產品庫存").fill("200");
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
