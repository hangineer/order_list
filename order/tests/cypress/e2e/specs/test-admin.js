// https://docs.cypress.io/api/table-of-contents

describe("My admin Test", () => {
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
      .type("hannah@admin.com")
      .should("have.value", "hannah@admin.com");
    //輸入密碼
    cy.get('div#pane-first input[type = "password"]')
      .type("111111")
      .should("have.value", "111111"); //比對
    cy.get("div#pane-first button").contains("登入").click(); //透過內容去選取元素就使用contains
    cy.get("#loginFooter span").contains("確定").click();
    //新增產品
    cy.get(".el-submenu__title span").contains("產品相關").click();
    cy.get(".el-menu>li").contains("建立產品").click();
    cy.get(".el-form input[placeholder='請輸入產品名稱']").type("薄荷摩卡");
    //圖片上傳:使用 cypress-file-upload
    cy.get(".el-form input[placeholder='請上傳產品圖片']").attachFile(
      "薄荷摩卡.jpeg"
    );
    cy.get(".el-form input[placeholder='請輸入產品價格']").type("120");
    cy.get(".el-form input[placeholder='請輸入產品庫存']").type("200");
    cy.get(".el-form textarea").type("無");
    cy.get("button.createProduct").click();
    cy.get("#createProductSure").contains("確定").click();

    // 編輯按鈕
    // 抓取商品id,用於路由的轉換
    const productEditId = cy
      .get("tbody tr.el-table__row:last-child")
      .find("td:last-child>div.cell button[data-editId]")
      .first()
      //To invoke a function on a current subject,
      .invoke("attr", "data-editId") //= jQuery attr()
      .then(parseFloat);

    cy.get(".el-table__row:last-child td:last-child div.cell button span")
      .contains("編輯")
      .click({ force: true });
    //編輯頁面
    cy.get(".el-form input#productName").clear().type("十二月限定-薄荷摩卡");
    cy.get(".el-form input[type='file']")
      .click()
      .attachFile("薄荷摩卡(修改).jpeg");
    cy.get(".el-form input[placeholder='請輸入產品價格']").clear().type("130");
    cy.get(".el-form input[placeholder='請輸入產品庫存']").clear().type("250");
    cy.get(".el-form textarea").clear().type("視銷量決定是否要延長販賣期限");
    //修改後儲存按鈕
    cy.get("button[type='button'] span").contains("儲存").click();

    // 刪除按鈕
    // 抓取商品id，才能刪除特定商品
    const productDeleteId = cy
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
