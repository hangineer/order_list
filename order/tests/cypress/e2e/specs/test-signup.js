describe("My signup Test", () => {
  //啟動json server
  beforeEach(() => {
    cy.exec("json-server --watch db.json", { failOnNonZeroExit: false });
  });
  //清除session storage
  it("clear session storage", () => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  it("Visits the app root url", () => {
    //一個 it 對應一個 test case，用 info 描述所測試的內容
    cy.visit("/");
    expect(true).to.equal(true);
    cy.get("img.joinBtn").click();
    cy.get("#tab-second").contains("註冊").click();
    //輸入註冊資訊
    cy.get('div#pane-second input[type = "email"]').type("cypress@test.com");
    cy.get('div#pane-second input[type = "text"]').type("使用者二號");
    //密碼
    cy.get("div#pane-second")
      .find(
        'label[for="signupPassword"] + div .el-input input[type="password"]'
      )
      .type("111111");
    //密碼確認
    cy.get("div#pane-second")
      .find('label[for="checkPassword"] + div .el-input input[type="password"]')
      .type("111111")
      .invoke("val")
      //密碼比對
      //https://stackoverflow.com/questions/48910677/cypress-compare-equality-of-two-inputs
      .then((comparePwd) => {
        cy.get("div#pane-second")
          .find(
            'label[for="signupPassword"] + div .el-input input[type="password"]'
          )
          .should("have.value", comparePwd);
      });

    //註冊按鈕
    cy.get(".el-button span").contains("註冊").click();
    cy.get("#signupFooter button:nth-child(2)").click();
  });
});
