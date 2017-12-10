# VueJS-WebApp

### 项目概述 
基于Vue.js 制作的移动外卖 WebApp。使用Vue.js+es6+webpack等前端最新最热的技术，采用组件化、模块化、代码规范化的开发方式，领略Vue.js开发的灵活性。
  
---
### 视图层 
![视图层预览](https://raw.githubusercontent.com/EricWeii/IMG/master/preview/%E6%89%8B%E6%9C%BA%E6%95%88%E6%9E%9C%E5%9B%BE2-T2.jpg)
![视图层预览](https://raw.githubusercontent.com/EricWeii/IMG/master/preview/%E6%89%8B%E6%9C%BA%E6%95%88%E6%9E%9C%E5%9B%BE3.jpg)

---
### 技术栈 

**-= 前端 =-**
#### - VUE -

- `VueJS`： 只关注视图层， 是一套构建用户界面的渐进式 MVVM 框架。它的目标是**实现响应的数据绑**和**组合的视图组件**
- `vue-router`：vue.js为方便构建单页面应用提供的一个路由插件
- `vue-resource`：前端与服务端进行数据接口请求，实现项目的动态数据交互
- `better-scroll`：移动端滚动的解决方案，使移动端滑动体验更加流畅
- `transition`：Vue封装提供的过渡动画的内置组件

#### - JS -
- `ES6`：ECMAScript6 是JavaScript语言的新一代标准，提供了箭头函数、默认参数、字符串模板、for of 遍历、模块化、解构赋值、Promise、Class 等新特性

#### - CSS -

- `Less`：CSS 预编译处理器，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。

**-= 自动化构建和其他工具 =-**
#### - vue-cli -
- `vue-cli`：Vue 脚手架工具，可以快速构建 vue 项目。

#### - ESLint -
- `eslint`：JavaScript代码检测工具，规范代码书写，统一代码的风格。
---
### SRC文件夹目录 

![SRC文件夹目录 ](https://raw.githubusercontent.com/EricWeii/IMG/d49d2a08f9c293d292a5b4b693c19e6beb670321/preview/SRC%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.jpg)

---
### 交互体验 

- 使用better-scroll插件，实现所有页面涉及到的滚动效果，体验如原生APP般丝滑(#^.^#)
- 使用vue内置transition组件，实现路由之间切换过渡动画。

---
### 交互效果 

![交互效果](https://github.com/EricWeii/IMG/blob/d49d2a08f9c293d292a5b4b693c19e6beb670321/preview/webapp.gif)

---
### 如何构建 

``` bash
# clone the repo into your disk.
git clone https://github.com/EricWeii/VueJS-WebApp.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

---
### 总结 

- 充分体验到 vue.js 数据驱动和组件化在开发中的灵活和高效
- vue.js 社区和生态活跃度较高，总结一套常用的 vue 工具插件
- 使用 vue 内置 transition 组件，让动画实现得更简单
- 利用 vue 内置 JS动画hook 实现过渡动画效果，提高用户交互体验
- ES6 提供的箭头函数、函数简写、字符串模板、模块化等新特性在实际开发带来的便捷和高效
- ESLint 规范代码书写,可以避免低级错误和统一代码的风格，使代码的后期维护更高效
