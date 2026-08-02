import type { Lang } from '../i18n/ui';

type LocalizedLabel = Record<Lang, string>;

export const videoCategories = [
  { slug: 'video-commercials', label: { en: 'Video Commercials', zh: '商业视频', ja: '広告映像' } },
  { slug: 'short-form', label: { en: 'Short-form', zh: '短视频', ja: 'ショート動画' } },
  { slug: 'vfx', label: { en: 'VFX', zh: 'VFX', ja: 'VFX' } },
  { slug: 'ai-video', label: { en: 'AI Video', zh: 'AI 视频', ja: 'AI映像' } },
  { slug: 'precision-editing', label: { en: 'Precision Editing', zh: '视频精剪', ja: '映像編集' } },
  { slug: 'non-profit', label: { en: 'Non-profit', zh: '非盈利企划', ja: '非営利企画' } }
] as const satisfies ReadonlyArray<{ slug: string; label: LocalizedLabel }>;

export const graphicCategories = [
  { slug: 'poster', label: { en: 'Poster', zh: '海报', ja: 'ポスター' } },
  { slug: 'table-tent', label: { en: 'Table Tent', zh: '桌卡', ja: 'テーブルテント' } },
  { slug: 'menu', label: { en: 'Menu', zh: '菜单', ja: 'メニュー' } },
  { slug: 'social-image', label: { en: 'Social Image', zh: '社交媒体图片', ja: 'SNS画像' } },
  { slug: 'logo', label: { en: 'Logo', zh: '标志设计', ja: 'ロゴ' } },
  { slug: 'other', label: { en: 'Other', zh: '其他', ja: 'その他' } }
] as const satisfies ReadonlyArray<{ slug: string; label: LocalizedLabel }>;

export const categories = [...videoCategories, ...graphicCategories];

export const clients = [
  { slug: 'momiji', label: 'MOMIJI' },
  { slug: 'kea-lani', label: 'KEA LANI' },
  { slug: 'sugoi', label: 'SUGOI' },
  { slug: 'ideal-foods', label: 'IDEAL FOODS' },
  { slug: 'independent', label: 'NON-PROFIT / INDEPENDENT' }
] as const;

export function categoryLabel(slug: string, lang: Lang): string {
  return categories.find((item) => item.slug === slug)?.label[lang] ?? slug;
}

export function clientLabel(slug: string | undefined): string {
  return clients.find((item) => item.slug === slug)?.label ?? '';
}
