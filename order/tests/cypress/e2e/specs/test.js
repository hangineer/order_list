// https://docs.cypress.io/api/table-of-contents

describe("My First Test", () => {
  it("Visits the app root url", () => {
    //一個 it 對應一個 test case，用 info 描述所測試的內容
    cy.visit("localhost:8080/");
    expect(true).to.equal(true);
    cy.get("img.joinBtn").click();
    //輸入電子郵件
    cy.get('div#pane-first input[type = "email"]')
      .type("hannah@admin.com")
      .should("have.value", "hannah@admin.com");
    //輸入密碼
    cy.get('div#pane-first input[type = "password"]')
      .type("111111")
      .should("have.value", "111111"); //比對
    cy.get("div#pane-first button").contains("登入").click(); //透過內容去選取元素就使用contains
    cy.get("#loginFooter span").contains("確定").click();
    // .click({ force: true });
    // cy.contains("h1", "Welcome to Your Vue.js App");
  });
});
