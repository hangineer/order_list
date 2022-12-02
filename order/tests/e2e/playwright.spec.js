// const { chromium } = require("playwright");
// // const { test } = require("@playwright/test");
// const { expect } = require("chai");
// const baseURL = "http://localhost:8080/";
// const adminEmail = "hannah@admin.com";
// const adminName = "管理者";
// const adminPwd = "MTExMTEx";
// //密碼？

// describe("Auth", () => {
//   let browser, page;
// });
// before(async () => {
//   browser = await chromium.launch();
//   page = await browser.newPage();
//   await page.goto(`${baseURL}`);
//   // await page.goto(`${baseURL}list`);
// });
// after(async () => {
//   await page.close();
//   await browser.close();
// });
// //驗證開始
// it("An unauthenticated user should not be able to see the list page", async () => {
//   await page.goto(`${baseURL}list`);
//   expect(page.url()).to.equal(`${baseURL}`);
// });
// it("be redirected back to list page after login", async () => {
//   await page.goto(`${baseURL}list`);
//   const [popup] = await Promise.all([
//     page.waitForEvent("popup"), //等待彈跳視窗
//     await page.click("el-button.login"), //selectors
//   ]);
//   popup.on("close", async () => {
//     expect(page.url()).to.equal(`${baseUrl}admin`);
//   });

//   await popup.fill("el-input[type='email']", adminEmail);
//   // await popup.fill("el-input[type='text']", adminName);
//   await popup.fill("el-input[type='password']", adminPwd);
//   await popup.click("el-button[type='primary']");
// });
