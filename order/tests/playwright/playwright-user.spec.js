// @ts-check
import { test, expect } from "@playwright/test";
test("My User Test", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/Order List/);
  await page.locator("img.joinBtn").first().click();
  //輸入電子郵件
  await page
    .locator("div#pane-first input[type = 'email']")
    .fill("hannah@playwright.com");
  //輸入密碼
  await page.locator("div#pane-first input[type = 'password']").fill("111111");
  await page.locator("div#pane-first button:has-text('登入')").click();
  await page.locator("#loginFooter span:has-text('確定')").click();
  //建立訂單
  await page
    .locator(".el-submenu__title:has(span):has-text('訂單相關')")
    .click();
  await page.getByRole("menuitem", { name: "建立訂單" }).click();
  await page.getByPlaceholder("請選擇商品").click();
  await page.getByRole("listItem").filter({ hasText: "焦糖瑪奇朵" }).click();

  await page.getByPlaceholder("請輸入購買數量").fill("5");
  await page.locator(".el-form textarea").fill("新增成功");
  await page.locator("button.createItem").click();
  await page.locator("button#createListSure").click();

  //編輯按鈕
  await page
    .locator(".el-table__row >> nth=-1") //get the last element
    .locator("td >> nth=-1")
    .locator("div.cell button span:has-text('編輯')")
    .click();
  //進入編輯頁面
  await page.getByPlaceholder("請選擇商品").click();
  await page.getByRole("listItem").filter({ hasText: "薄荷摩卡" }).click();
  await page.locator("input#editQuantity").fill("10");
  await page.locator(".el-form textarea").fill("修改成功");
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
});
