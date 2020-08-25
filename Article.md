## vite原理解析与实现

### 目录

- [ ] 背景介绍
  - [ ] 为什么需要vite？
  - [ ] vite是什么？
- [ ] 如何使用vite？
- [ ] vite原理解析


### 使用vite

```shell
npm i -g create-vite-app
create-vite-app vite-example
cd vite-example
npm i
npm run dev
```

### 原理解析

![import-mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

借助`script`标签`type=module`时使用ES6的`import`导入文件会发起请求，然后在本地起服务对其拦截处理

### 如何实现

#### 准备环境

安装依赖
```shell
npm i koa koa-static es-module-lexer magic-string
```

```shell
npm link
```

```shell
npm run dev:my
```

#### koa洋葱模型

![洋葱模型](https://segmentfault.com/a/1190000020641411#item-6)

#### 解析静态文件

将用户当前工作空间作为静态服务

```shell
npm i koa-static
```

#### 解析js文件import并拦截重写路径

- 重写非相对路径
将`import { createApp } from 'vue'` => `import { createApp } from '/@modules/vue'`

#### 解析import重写后路径并找到对应文件内容

#### 解析.vue文件

#### 为html注入代码解决变量问题

#### 实现热更新
