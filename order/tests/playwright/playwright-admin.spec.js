// @ts-check
import { test, expect } from "@playwright/test";
//!!  layout selector :below(inner > selector)
test("My Admin Test", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/Order List/);
  await page.locator("img.joinBtn").first().click();
  //輸入電子郵件
  await page
    .locator("div#pane-first input[type = 'email']")
    .fill("hannah@admin.com");
  //輸入密碼
  await page.locator("div#pane-first input[type = 'password']").fill("111111");
  await page.locator("div#pane-first button:has-text('登入')").click();
  await page.locator("#loginFooter span:has-text('確定')").click();
  //建立訂單
  await page
    .locator(
      //:right-of layout selector
      "span:text('產品相關'):right-of(.el-submenu__title:has(span):has-text('訂單相關'))"
    )
    .click();
  await page.getByRole("menuitem", { name: "建立產品" }).click();
  await page.getByPlaceholder("請輸入產品名稱").fill("氮氣咖啡");
  await page
    .getByPlaceholder("請上傳產品圖片")
    // .click()
    .setInputFiles("tests/playwright/氮氣咖啡.jpeg");

  await page.getByPlaceholder("請輸入產品價格").fill("150");
  await page.getByPlaceholder("請輸入產品庫存").fill("200");
  await page
    .locator(".el-form textarea")
    .fill("氮氣注入低溫慢速萃取的冷萃咖啡中，可創造出綿密的泡沫");
  await page.locator("button.createProduct").click();
  await page.locator("button#createProductSure:has-text('確定')").click();

  //編輯按鈕
  await page
    .locator(".el-table__row >> nth=-1") //get the last element
    .locator("td >> nth=-1")
    .locator("div.cell button span:has-text('編輯')")
    .click();
  //進入編輯頁面
  await page.locator(".el-form input#productName").fill("冷萃氮氣咖啡");
  await page
    .locator(".el-form input[type='file']")
    .setInputFiles("tests/playwright/氮氣咖啡(修改).jpeg");

  await page.getByPlaceholder("請輸入產品價格").fill("155");
  await page.getByPlaceholder("請輸入產品庫存").fill("250");
  await page
    .locator(".el-form textarea")
    .fill("[修改成功]氮氣注入低溫慢速萃取的冷萃咖啡中，可創造出綿密的泡沫");

  //修改後儲存按鈕
  await page.locator("button[type='button'] span:has-text('儲存')").click();

  //刪除按鈕
  await page
    .locator(".el-table__row >> nth=-1")
    .locator("td >> nth=-1")
    .locator("div.cell button span:has-text('刪除')")
    .click();
  await page
    .locator(".el-dialog__footer button#removeSure >> nth=-1 >> text=確定")
    .click();
  //登出
  await page
    .locator("div.logoutContainer .logout span:has-text('登出')")
    .click();
  await page
    .locator(".el-dialog__footer button#logoutSure:has-text('確定')")
    .click();

  //   await page
  //     .getByRole("row", { name: " 編輯  刪除 確定要刪除此筆訂單嗎？" })
  //     // .filter({ hasText: "770707070編輯刪除確定要刪除此筆訂單嗎?取消確定" })
  //     .getByRole("button", { name: "確定" })
  //     .click();
  //   await page.getByRole("button", { name: "登出" }).click();
  //   await page.getByRole("button", { name: "確定" }).click();
});
