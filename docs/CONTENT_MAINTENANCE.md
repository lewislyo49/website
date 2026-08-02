# 网站内容维护手册

本手册不依赖 Codex。执行任何更新前，先确认本机备份存在：

`/Users/lewisliboliu/Documents/Website Backup/Website/`

不要直接修改移动硬盘或本机备份中的原始文件；只在项目 `public/media/` 中制作网页副本。

## 1. 作品文件结构

每个作品由两部分组成：

1. `src/content/projects/项目名.md`：标题、分类、年份、顺序与媒体路径。
2. `public/media/projects/项目名/`：网页图片、视频和封面。

项目名只用小写英文字母、数字与连字符，例如 `new-commercial`。不要使用空格或中文作为网页文件夹名。

可复制的模板：

- `docs/templates/local-video.md`
- `docs/templates/youtube.md`
- `docs/templates/image-gallery.md`

## 2. 新增本地视频作品

1. 在 `public/media/projects/` 新建项目文件夹。
2. 把压缩视频命名为 `video.m4v`，封面命名为 `cover.webp`。
3. 复制 `docs/templates/local-video.md` 到 `src/content/projects/项目名.md`。
4. 修改中、英、日标题与简介、客户、分类、年份、角色和路径。
5. 运行：

```bash
pnpm media:check
pnpm check
pnpm dev
```

6. 在三种语言中检查项目详情、分类和客户页面。

### macOS 视频压缩示例

720p 桌面视频：

```bash
avconvert --source "/完整路径/原视频.mp4" \
  --preset PresetAppleM4V720pHD \
  --output "public/media/projects/项目名/video.m4v" \
  --replace
```

轻量短视频：

```bash
avconvert --source "/完整路径/原视频.mp4" \
  --preset PresetAppleM4VWiFi \
  --output "public/media/projects/项目名/video.m4v" \
  --replace
```

带有本地视频的作品卡片会自动使用 `media` 中的第一个视频作为鼠标悬停预览；不需要修改组件代码。项目详情页中的本地视频也会在鼠标悬停时静音播放，移开后暂停。手机端仍由访客点击播放，启用“减少动态效果”的设备不会触发悬停播放。建议单个网页视频小于 15 MB；超大或较长作品优先上传 YouTube，再使用 YouTube 模板。

## 3. 新增 YouTube 作品

1. 复制 `docs/templates/youtube.md`。
2. `src` 只填写 YouTube 视频 ID，而不是完整网址。例如 `https://youtu.be/abc123` 只填写 `abc123`。
3. 为视频准备本地 `cover.webp`，访客点击封面后才会加载 YouTube 隐私增强播放器。

## 4. 新增图片画廊

1. 将图片复制到新的项目媒体文件夹。
2. 转为 WebP，最长边建议 1600–2000 px。
3. 复制 `docs/templates/image-gallery.md`，为每张图片增加一项 `media`。
4. 每张图片必须填写三语 `alt`；描述画面内容，不要只写文件名。

可使用 macOS `sips` 先缩小图片，再通过常用图像软件导出 WebP。建议质量 80–88，单张尽量低于 500 KB。

## 5. 分类、客户与显示顺序

允许的 `categories`：

```text
video-commercials  short-form  vfx  ai-video  precision-editing  non-profit
poster  table-tent  menu  social-image  logo  other
```

允许的 `client`：

```text
momiji  kea-lani  sugoi  ideal-foods  independent
```

- `featured: true`：进入 Work 首页精选区。
- `order: 1`：数字越小越靠前。
- `published: false`：保留项目文件但不在网站显示。
- 同一作品可以有多个分类，不需要复制项目。
- 没有作品的分类会自动显示 Coming Soon。
- AI 视频页面按 `order` 从小到大排列；当前来明先锋主页影像使用 `order: 0`，因此会位于 Sugoi AI 视频之前。

如果需要新增分类或客户，同时修改：

- `src/content.config.ts` 的允许值。
- `src/lib/catalog.ts` 的三语标签。

## 6. 修改三语文案

作品文件中的字段格式：

```yaml
title:
  en: "English title"
  zh: "中文标题"
  ja: "日本語タイトル"
```

公共按钮、导航和联系表单文案位于 `src/i18n/ui.ts`。三种语言必须同时保留；暂时没有译文时可先复制英文，但不要删除字段。

## 7. 替换主页循环视频

1. 确认新原片已进入本机备份，不要直接引用移动硬盘路径。
2. 生成桌面副本：

```bash
avconvert --source "/本机备份/新主页视频.mp4" \
  --preset PresetAppleM4V720pHD \
  --output "public/media/hero/home-hero-46s.m4v" \
  --replace
```

不要加入 `--duration` 参数；省略该参数时会转换到原片结尾。加入例如 `--duration 12` 会把网页视频永久裁成 12 秒。

3. 再生成完整的手机版副本：

```bash
avconvert --source "/本机备份/新主页视频.mp4" \
  --preset PresetAppleM4VWiFi \
  --output "public/media/hero/home-hero-mobile.m4v" \
  --replace
```
4. 从视频中导出一张 16:9 静态图，保存为 `home-poster.webp`。
5. 若新视频内容或时长发生变化，建议更改文件名中的版本标记，并同步修改 `src/pages/[lang]/index.astro` 和对应作品文件，避免访客浏览器继续使用旧视频缓存。
6. 运行 `pnpm media:check` 和 `pnpm build`，检查桌面、手机与减少动态效果模式。

## 8. 修改联系信息与外部链接

- 电邮、SMS 与 Instagram：`src/components/ContactSection.astro`
- Vtuber Linktree：`src/components/VtuberCard.astro`（显示在“非盈利企划”分类内）
- 网站域名：`astro.config.mjs`
- Netlify 表单邮件通知：Netlify 网站后台，不在代码仓库中。

## 9. 发布与回滚

```bash
pnpm build
git status
git add 路径
git commit -m "Update portfolio work"
git push
```

GitHub 推送后，Netlify 自动建立 Deploy Preview/Production deploy。先检查预览链接；如发现问题，可在 Netlify Deploys 页面选择上一个成功版本并点击恢复，或使用 Git 提交修复后再次推送。

## 10. 发布前检查清单

- 三语标题与简介均存在。
- 分类、客户、年份和顺序正确。
- 所有图片与视频路径通过 `pnpm media:check`。
- 桌面端将鼠标移到本地视频作品卡片或详情视频上会静音播放预览，移开后停止；手机端可点击播放。
- 图片没有明显压缩损伤，文件大小合理。
- 手机端没有横向滚动。
- 所有素材均拥有公开展示权。
