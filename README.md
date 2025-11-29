# 奥运会奖牌榜

一个美观、现代的奥运会奖牌榜排行应用，使用 React + TypeScript + Tailwind CSS 构建。

## 功能特点

- 🏅 展示奥运会奖牌榜数据
- 🔄 支持按金牌、银牌、铜牌、总数排序
- 📊 美观的表格界面设计
- 🎨 响应式设计，适配各种屏幕尺寸
- ⚡ 快速、流畅的用户体验

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
.
├── src/
│   ├── components/
│   │   └── MedalTable.tsx    # 奖牌榜组件
│   ├── data.ts               # 示例数据
│   ├── types.ts              # TypeScript 类型定义
│   ├── App.tsx               # 主应用组件
│   ├── main.tsx              # 入口文件
│   └── index.css             # 全局样式
├── index.html                # HTML 模板
├── package.json              # 项目配置
├── tsconfig.json             # TypeScript 配置
├── vite.config.ts            # Vite 配置
└── tailwind.config.js        # Tailwind CSS 配置
```

## 使用说明

1. 点击表头或排序按钮可以按不同字段排序
2. 再次点击同一字段可以切换升序/降序
3. 前三名会有特殊的背景高亮显示
4. 鼠标悬停在表格行上会有交互效果

## 自定义数据

编辑 `src/data.ts` 文件可以修改奖牌榜数据。

