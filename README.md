# vue-test

  注：由于未将后台部分代码上传，故脱离后台后基本不能运行，正在进行重构希望能解决该问题并将其他功能进行优化，移步到[重构版](https://github.com/gandao/ErShou)
## 一、简介
  该项目基于Vue2实现的电子商务的spa应用，主要用途：用于校园二手物品交易的信息发布平台，登录用户可以管理自己上架的商品，未登录用户也可对商品进行查看和检索，用户自行线下交易商品。 整个项目包含：登录/注册、主页、商品详情、个人中心、商品检索这个四个部分，后台管理部分已剥离成一个独立的项目（[ER_SHOU_BMS](https://github.com/gandao/ER_SHOU_BMS)）,整个项目所用到的技术栈：Vue2+vue-router+axios+webpack+less+element。 
## 二、内容展示
### 1.主页

![baidu](https://github.com/gandao/ERSHOU_BASE/blob/master/resource/Image_desc/1.png "主页")

### 2.商品详情

![baidu](https://github.com/gandao/ERSHOU_BASE/blob/master/resource/Image_desc/4.png "商品详情")

### 3.搜索列表

![baidu](https://github.com/gandao/ERSHOU_BASE/blob/master/resource/Image_desc/2.png "搜索列表")

### 4.个人中心

![baidu](https://github.com/gandao/ERSHOU_BASE/blob/master/resource/Image_desc/3.png "个人中心")

### 5.登录和注册

![baidu](https://github.com/gandao/ERSHOU_BASE/blob/master/resource/Image_desc/2.png "百度logo")

## 三、Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
