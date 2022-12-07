## File details 資料夾結構和內容

```
|- src/
    |- components/
        |- childComponents
            |- addListBtn.vue
            |- addProductBtn.vue
            |- listData.vue(存放訂單資訊)
            |- logoutBtn.vue
            |- productData.vue(存放產品資訊)
        |- mainComponents
            |- listFooter.vue
            |- listHeader.vue
    |- router/
        |- index.js
    |- store/
        |- store.js
        |- productModule.js(存放產品狀態)
        |- listModule.js(存放訂單狀態)
        |- adminModule.js(存放權限狀態)

    |- views/
        |- ListInfo/
            |- _id.vue(編輯訂單)
        |- ProductInfo/
            |- _id.vue(編輯產品)
        |- AddList.vue(新增訂單)
        |- AddProduct.vue(新增產品)
        |- Admin.vue(根目錄)
        |- List.vue(顯示訂單，渲染listData元件的內容)
        |- product.vue(顯示產品，渲染productData元件的內容)
|- db.json(API)

```

## User flow 用戶操作流程

```
- 一般使用者：根目錄(登入及註冊) => 查看訂單 => 編輯或刪除訂單
- 管理者：根目錄(登入及註冊) => 查看訂單 or 查看產品列表 => 編輯或刪除產品列表
```

## Project setup 如何在您的電腦建立專案

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your end-to-end tests

- cypress : `yarn test:e2e`
- playwright :

```
npx playwright test/yarn run test	測試所有spec.js檔案
npx playwright test [檔案名稱] --headed 使用headed模式測試
npx playwright test --debug debug模式
```

### Lints and fixes files

```
yarn lint
```

### Run Json-server

```
json-server --watch db.json
json-server --watch db.json -p 3001
```
