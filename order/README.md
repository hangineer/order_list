# File's detail

```
|- src/
    |- components/
        |- childComponents
            |- addListBtn.vue
            |- addProductBtn.vue
            |- listData.vue(存放訂單資訊)
            |- logout.vue（未完成）
        |- mainComponents
            |- listFooter.vue（未完成）
            |- listHeader.vue
    |- router/
        |- index.js
    |- store/
        |- index.js
        |- tableData.js(存放訂單狀態，未完成)
        |- Admin.js(存放權限狀態，未完成)

    |- views/
        |- ListInfo/
            |- _id.vue(編輯訂單)
        |- AddList.vue(新增訂單)
        |- AddProduct.vue(新增產品)
        |- Admin.vue(根目錄，未完成)
        |- List.vue(顯示訂單，渲染listData元件的內容)
|- db.json(API)

```

---

## Project setup

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

```
yarn test:e2e
```

### Lints and fixes files

```
yarn lint
```
