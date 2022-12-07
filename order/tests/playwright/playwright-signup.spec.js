// @ts-check
const { test, expect } = require("@playwright/test");
// test(title, testFunction)
test("My Signup Test", async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/Order List/);
  await page.locator("img.joinBtn").first().click();
  //text selector https://playwright.dev/docs/selectors#text-selector
  await page.locator("#tab-second:has-text('註冊')").click();
  //註冊資訊
  //email
  await page
    .locator('div#pane-second input[type="email"]')
    .fill("hannah@playwright.com");
  //暱稱
  await page.locator('div#pane-second input[type = "text"]').fill("肚子好餓");
  //密碼
  await page
    .locator(
      'label[for="signupPassword"] + div .el-input input[type="password"]'
    )
    .fill("111111");

  //反向測試
  await page
    .locator(
      'div#pane-second label[for="checkPassword"] + div .el-input input[type="password"]'
    )
    .fill("11115");

  //註冊按鈕
  await page.locator(".el-button span:has-text('註冊')").click();
  await page.locator("#signupFooter button:nth-child(2)").click();

  //正常情況
  await page
    .locator(
      'div#pane-second label[for="checkPassword"] + div .el-input input[type="password"]'
    )
    .fill("111111");
  //密碼比較
  expect(
    await page
      .locator(
        'label[for="signupPassword"] + div .el-input input[type="password"]'
      )
      .inputValue()
  ).toBe(
    await page
      .locator(
        'div#pane-second label[for="checkPassword"] + div .el-input input[type="password"]'
      )
      .inputValue()
  );
  //亦可使用 getAttribute("value")
  //註冊按鈕
  await page.locator(".el-button span:has-text('註冊')").click();
  await page.locator("#signupFooter button:nth-child(2)").click();
});
