# 故障排查

## `pnpm` 或 `node` 找不到

安装 Node.js 22，然后启用 pnpm：

```bash
corepack enable
corepack prepare pnpm@11.9.0 --activate
pnpm install
```

## `pnpm install` 报告 ignored builds

项目的 `pnpm-workspace.yaml` 只允许 `esbuild` 的必要安装脚本。确认该文件包含：

```yaml
allowBuilds:
  esbuild: true
```

不要使用允许所有依赖执行脚本的设置。

## 页面构建失败

依次运行：

```bash
pnpm media:check
pnpm check
pnpm build
```

- `Missing media files`：检查 Markdown 中的 `cover`、`src`、`poster` 是否与 `public/` 中的实际文件一致。
- 内容 schema 错误：检查 `src/content.config.ts` 允许的分类、客户和必填字段。
- YAML 错误：含冒号、`#` 或特殊符号的文字使用双引号。

## 主页视频黑屏或不能自动播放

- 必须保留 `autoplay muted loop playsinline`；浏览器不允许带声音自动播放。
- 确认 `public/media/hero/home-hero.m4v` 与 `home-hero-mobile.m4v` 存在。
- 使用 Safari 和 Chrome 分别测试。
- 如果访客启用了减少动态效果，网站会故意显示 `home-poster.webp` 而不是播放。
- 编码不兼容时，重新使用 `avconvert` 的 Apple M4V 预设生成副本。

## 作品视频点击后无法播放

- 本地视频必须是网页兼容的 H.264/M4V，并且 `<source>` 路径存在。
- 确认视频文件不是原始 4K 制作文件。
- YouTube 项目只填写视频 ID，不填写完整网址。
- 浏览器开发者工具 Network 中出现 404 时，修正 Markdown 路径。

## 图片不显示或方向错误

- 路径区分大小写；Netlify 与本机 macOS 的表现可能不同。
- 重新导出 WebP 时应用照片方向信息。
- 封面建议使用常见 RGB 色彩空间，避免 CMYK 网页图片。

## 自动语言选择不正确

- 语言选择保存在浏览器 `localStorage` 的 `lewis-lang`。
- 手动点击 EN / 中 / 日会覆盖浏览器语言。
- 如需重新测试自动识别，在开发者工具中删除该键，再访问网站根路径 `/`。
- 不支持的浏览器语言会进入英文版本。

## Netlify 收不到表单

1. 确认 Netlify Forms 中已启用 form detection。
2. 确认部署输出包含 `/__forms.html`。
3. 表单名称必须保持 `project-inquiry`，隐藏字段 `form-name` 必须一致。
4. 查看 Netlify Forms 的 Spam 分类。
5. 在 Project configuration → Notifications 中重新添加电邮通知。
6. 本地 `astro dev` 不会把提交发送到 Netlify；必须在 Netlify Deploy Preview 上测试。

## Netlify 构建失败

- Build command：`pnpm build`
- Publish directory：`dist`
- Node：22
- 查看失败部署的完整日志，不要只看最后一行。
- 依赖问题时运行 `pnpm install` 并提交最新 `pnpm-lock.yaml`。

## 恢复上一个网站版本

最快方式：Netlify → Deploys → 选择上一个成功部署 → Restore/Publish deploy。

代码恢复方式：找到最后一个正常 Git 提交，创建一个反向提交或修复提交，再推送。不要使用 `git reset --hard`，以免丢失尚未保存的作品更新。
