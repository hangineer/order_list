// // @ts-check
// const { test, expect } = require("@playwright/test");
// // import Admin from "@views/Admin.vue";
// const baseURL = "http://localhost:8080/";
// // test("homepage has title and links to intro page", async ({ mount }) => {
// // await page.goto(`${baseURL}`);
// // test("homepage has title and links to intro page", async ({ page }) => {
// //   await page.goto("http://localhost:8080/");

// // Expect a title "to contain" a substring.
// // await expect(page).toHaveTitle(/Order List/);

// // create a locator
// const getStarted = page.getByRole("link", { name: "Get started" });
// const userName = page.getByLabel("User Name").fill("John");
// const pwd = page.getByLabel("Password").fill("secret-password");
// // const email =
// // Expect an attribute "to be strictly equal" to the value.
// await expect(getStarted).toHaveAttribute("href", "/docs/intro");

// // Click the get started link.
// await getStarted.click();

// // Expects the URL to contain intro.
// await expect(page).toHaveURL(/.*intro/);
// // });
