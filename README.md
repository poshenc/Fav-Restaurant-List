# 餐廳清單
---
- 利用Node.js + Express 建立餐廳list網站
- 必須登入後才能使用，支援 Facebook 登入功能。
- Deployment: https://quiet-waters-03168.herokuapp.com/

## 功能:
---
- 使用者可以新增一家餐廳
- 使用者可以瀏覽一家餐廳的詳細資訊
- 使用者可以瀏覽全部所有餐廳
- 使用者可以依據餐廳名稱與類別搜尋特定餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳
- 使用者可以註冊帳號
- 使用者可以透過 FB 或註冊帳號登入

## 環境建置:
---
- Visual Studio Code
- Express 4.17.1
- Node.js
- BootStrap v4
- JQuery v3.3.1
- popper.js
- restaurant.json
- express-handlebars 5.3.2

## 安裝流程:
---
1. 開啟終端機，並cd 要放專案的位置並執行: `git clone https://github.com/poshenc/Fav-Restaurant-List.git`
2. 進入專案資料夾 `cd restaurant-list`
3. 安裝 npm 套件 `npm install`
4. 裝 nodemon 套件 (若未安裝) `npm install -g nodemon`
5. 啟動伺服器，執行 app.js 檔案 `npm run dev`
6. 當終端機出現以下字樣，表示啟動完成 The Express server is running on http://localhost:3000