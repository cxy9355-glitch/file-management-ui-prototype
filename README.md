# File Management UI Prototype

本项目是一个可直接预览的 React + Vite 原型，用于给 UI、QA 或产品同学通过浏览器查看和操作。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## GitHub Pages 发布

这个仓库已经包含 GitHub Pages 的 Actions 工作流：

- 工作流文件：`.github/workflows/deploy-pages.yml`
- 推送到 `main` 后会自动构建并发布

首次启用时需要在 GitHub 仓库设置里打开：

1. `Settings`
2. `Pages`
3. `Build and deployment`
4. `Source` 选择 `GitHub Actions`

发布完成后，GitHub 会生成一个可直接访问的页面地址。
