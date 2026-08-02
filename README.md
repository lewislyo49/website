# Lewis Lyo Portfolio

Lewis Lyo 的中、英、日三语视频与平面设计作品网站。项目使用 Astro 7 静态构建、Markdown 内容集合和 Netlify Forms；网站素材为本机备份的网页衍生副本，原始文件不保存在 Git 仓库中。

## 目录

- `src/content/projects/`：每个作品一个 Markdown 文件，是作品内容的唯一来源。
- `public/media/`：已压缩的图片、视频、Logo 和首屏媒体。
- `src/pages/[lang]/`：三语页面路由。
- `src/i18n/ui.ts`：公共界面文案和语言名称。
- `src/lib/catalog.ts`：作品分类与客户清单。
- `docs/`：无 Codex 维护手册与故障排查。
- `output/pdf/`：公开推荐信的最终脱敏 PDF。
- `/Users/lewisliboliu/Documents/Website Backup/Website/`：本机原始素材备份，不属于仓库。

## 环境与命令

需要 Node.js 22 与 pnpm 11。

最简单的 macOS 预览方式是双击项目根目录中的 `打开网站预览.command`。它会在默认浏览器打开 `http://127.0.0.1:4321/en/`；预览期间请保持自动出现的终端窗口开启，完成后可关闭该窗口或双击 `关闭网站预览.command`。

```bash
pnpm install
pnpm dev
```

浏览器打开终端显示的本地地址，通常为 `http://localhost:4321`。

```bash
pnpm check        # Astro/TypeScript 内容与类型检查
pnpm media:check  # 检查代码和 Markdown 引用的媒体是否存在
pnpm build        # 完整检查并生成 dist/
pnpm preview      # 预览构建后的正式版本
```

## Netlify 部署

1. 将仓库推送到 Lewis 本人持有的 GitHub 仓库。
2. 在 Lewis 本人持有的 Netlify 账户中导入该仓库。
3. Netlify 会读取 `netlify.toml`：构建命令为 `pnpm build`，发布目录为 `dist`。
4. 在 Netlify 的 **Forms** 页面启用 form detection。
5. 在 **Project configuration → Notifications → Form submission notifications** 添加发送到 `lewislyo49@gmail.com` 的邮件通知。
6. 先检查 Deploy Preview，再把 `lewislyo49.com` 设为 Production domain。

项目不需要 API 密钥。不要把 Netlify、GitHub 或域名密码写入仓库。

## 主页媒体来源

主页循环视频的原始来源固定为：

`/Users/lewisliboliu/Documents/Website Backup/Website/主页视频.mp4`

网站只使用：

- `public/media/hero/home-hero-46s.m4v`：完整 46.3 秒、720p 桌面副本。
- `public/media/hero/home-hero-mobile.m4v`：轻量移动端副本。
- `public/media/hero/home-poster.webp`：加载失败和减少动态效果时的封面。

完整维护方法见 [docs/CONTENT_MAINTENANCE.md](docs/CONTENT_MAINTENANCE.md)，故障排查见 [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)。
