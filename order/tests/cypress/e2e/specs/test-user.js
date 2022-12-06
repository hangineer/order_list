// https://docs.cypress.io/api/table-of-contents

describe("My User Test", () => {
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
    //輸入電子郵件
    cy.get('div#pane-first input[type = "email"]')
      .type("hannah@test.com")
      .should("have.value", "hannah@test.com");
    //輸入密碼
    cy.get('div#pane-first input[type = "password"]')
      .type("111111")
      .should("have.value", "111111"); //比對
    cy.get("div#pane-first button").contains("登入").click(); //透過內容去選取元素就使用contains
    cy.get("#loginFooter span").contains("確定").click();

    //新增訂單
    cy.get(".el-submenu__title span").contains("訂單相關").click();
    cy.get(".el-menu>li").contains("建立訂單").click();

    //todo下拉選單
    // cy.get("input[placeholder='請選擇商品']").click();
    // cy.get("div[data-key]") //自定義元素，存放選到產品的id，預設為1
    //   .click({ force: true })
    //   .invoke("attr", "data-key", "6") //改為6
    //   .should("have.attr", "data-key", "6");

    // .click()
    // .then(($input) => {
    //   $input[0].setAttribute("data-key", "6");
    // })
    // .invoke("attr", "data-key", "6") //= jQuery attr()

    // ----------------------
    //  .trigger("change");
    // cy.get("@dataKey")
    //   .then(($input) => {
    //     $input[0].setAttribute("data-key", "6");
    //   })
    //   .should("have.attr", "data-key", "6");
    cy.get(".el-form input[placeholder='請輸入購買數量']").clear().type("5");
    cy.get(".el-form textarea").type("無");
    cy.get("button.createItem").click();
    cy.get("#createListSure").contains("確定").click();

    // 編輯按鈕
    // 抓取訂單id,用於路由的轉換
    const listEditId = cy
      .get("tbody tr.el-table__row:last-child")
      .find("td:last-child>div.cell button[data-editId]")
      .first()
      // To invoke a function on a current subject,
      .invoke("attr", "data-editId") //= jQuery attr()
      .then(parseFloat);

    cy.get(".el-table__row:last-child td:last-child div.cell button span")
      .contains("編輯")
      .click({ force: true });

    //編輯頁面
    cy.get("input[placeholder='請選擇商品']").click();
    cy.get("li:last-child span").contains("薄荷摩卡").click();
    cy.get(".el-form .el-input #editQuantity").clear().type("10"); //購買數量
    cy.get(".el-form textarea").clear().type("熱的,糖漿2下");

    //修改後儲存按鈕
    cy.get("button[type='button'] span").contains("儲存").click();

    // 刪除按鈕
    // 抓取商訂單id，才能刪除特定訂單
    const listDeleteId = cy
      .get("tbody tr.el-table__row:last-child")
      .find("td:last-child>div.cell button[data-removeId]")
      .first()
      .invoke("attr", "data-removeId") //= jQuery attr()
      .then(parseFloat);
    cy.get(".el-table__row:last-child td:last-child div.cell button span")
      .contains("刪除")
      .click({ force: true });
    cy.get(".el-dialog__footer button#removeSure")
      .contains("確定")
      .click({ force: true });

    //登出
    cy.get("div.logoutContainer .logout span").contains("登出").click();
    cy.get(".el-dialog__footer button#logoutSure").contains("確定").click();
  });
});
