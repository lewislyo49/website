export const languages = ['en', 'zh', 'ja'] as const;
export type Lang = (typeof languages)[number];

export const languageLabels: Record<Lang, string> = {
  en: 'EN',
  zh: '中',
  ja: '日'
};

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    home: 'Home', work: 'Work', about: 'About', explore: 'Explore', viewAll: 'View all work',
    introTitle: "HELLO, I'M LEWIS", introRole: 'Graphic Designer / Video Editor / VFX Artist / AI Creator',
    pioneerTitle: 'ABOUT LUMINA TRAILBLAZER', pioneerBody: 'Born from a childhood fascination with electronic worlds, this original character took shape in 2020 and now carries my experience, visual language, and creative life.', learnMore: 'Learn more',
    servicesTitle: 'WHAT CAN I DO?', servicesLead: 'Creative solutions across video, AI creation, virtual branding, graphic design, and digital experiences.',
    videoWork: 'VIDEO PRODUCTION', graphicWork: 'GRAPHIC DESIGN', featured: 'FEATURED WORK', byDiscipline: 'BROWSE BY DISCIPLINE', byClient: 'BROWSE BY CLIENT',
    create: "LET'S CREATE TOGETHER", createBody: 'Bring your ideas to life with visual work that connects, informs, and stays memorable.',
    name: 'Name', email: 'Email', company: 'Company (optional)', projectType: 'Project type', timeline: 'Timeline (optional)', budget: 'Budget (optional)', message: 'Tell me about your project', send: 'Send inquiry',
    textPreferred: 'Text preferred', languages: 'Chinese / English / Japanese',
    comingSoon: 'COMING SOON', comingSoonBody: 'This collection is being prepared. More work will be added soon.',
    role: 'Role', year: 'Year', client: 'Client', backWork: 'Back to work', selectedWork: 'Selected work',
    aboutTitle: 'ABOUT ME', experienceTitle: 'MY EXPERIENCE', credentialsTitle: 'EDUCATION & CERTIFICATIONS', recommendation: 'Read Momiji recommendation letter',
    thankTitle: 'THANK YOU', thankBody: 'Your inquiry has been sent. I will get back to you as soon as possible.', backHome: 'Return home'
  },
  zh: {
    home: '首页', work: '作品', about: '关于', explore: '浏览', viewAll: '查看全部作品',
    introTitle: '您好，我是 LEWIS', introRole: '平面设计师 / 视频剪辑师 / VFX 艺术家 / AI 创作者',
    pioneerTitle: '关于来明先锋', pioneerBody: '形象源于我儿时对电子世界的幻想，2020 年开始获得最初设定，并在持续创作中承载了我的经验、视觉语言与生命力。', learnMore: '了解更多',
    servicesTitle: '我能做什么？', servicesLead: '涵盖视频、AI 创作、虚拟品牌、平面设计与数字体验的完整视觉解决方案。',
    videoWork: '视频制作', graphicWork: '平面设计', featured: '精选作品', byDiscipline: '按作品类型浏览', byClient: '按客户浏览',
    create: '让我们一起创作', createBody: '把想法转化为清晰、有感染力并令人记住的视觉作品。',
    name: '姓名', email: '电子邮箱', company: '公司（选填）', projectType: '项目类型', timeline: '时间范围（选填）', budget: '预算（选填）', message: '请简单介绍您的项目', send: '发送项目咨询',
    textPreferred: '短信优先', languages: '中文 / 英文 / 日文',
    comingSoon: '即将更新', comingSoonBody: '这个作品分类正在整理中，更多内容将陆续加入。',
    role: '负责内容', year: '年份', client: '客户', backWork: '返回作品页', selectedWork: '精选作品',
    aboutTitle: '关于我', experienceTitle: '工作经历', credentialsTitle: '教育与认证', recommendation: '查看 Momiji 推荐信',
    thankTitle: '感谢您的联系', thankBody: '项目咨询已发送，我会尽快回复。', backHome: '返回首页'
  },
  ja: {
    home: 'ホーム', work: '作品', about: 'プロフィール', explore: '見る', viewAll: 'すべての作品',
    introTitle: 'こんにちは、LEWISです', introRole: 'グラフィックデザイナー / 映像編集 / VFXアーティスト / AIクリエイター',
    pioneerTitle: 'ルミナ・トレイルブレイザーについて', pioneerBody: '幼少期に思い描いた電子世界への憧れから生まれ、2020年に形を得たオリジナルキャラクターです。今では私の経験と映像表現を宿す存在になりました。', learnMore: '詳しく見る',
    servicesTitle: 'できること', servicesLead: '映像、AI制作、バーチャルブランディング、グラフィック、デジタル体験を横断したビジュアル制作。',
    videoWork: '映像制作', graphicWork: 'グラフィックデザイン', featured: '注目作品', byDiscipline: '分野から探す', byClient: 'クライアントから探す',
    create: '一緒に作りましょう', createBody: 'アイデアを、伝わり、心に残るビジュアルへ。',
    name: 'お名前', email: 'メール', company: '会社名（任意）', projectType: 'プロジェクト種別', timeline: '希望時期（任意）', budget: '予算（任意）', message: 'プロジェクトについて', send: 'お問い合わせを送信',
    textPreferred: 'SMS優先', languages: '中国語 / 英語 / 日本語',
    comingSoon: '近日公開', comingSoonBody: '現在作品を準備しています。順次追加予定です。',
    role: '担当', year: '年', client: 'クライアント', backWork: '作品一覧へ', selectedWork: '選定作品',
    aboutTitle: 'プロフィール', experienceTitle: '経歴', credentialsTitle: '学歴・認定', recommendation: 'Momiji 推薦状を見る',
    thankTitle: 'ありがとうございます', thankBody: 'お問い合わせを送信しました。できるだけ早く返信します。', backHome: 'ホームへ戻る'
  }
} as const;

export function isLang(value: string | undefined): value is Lang {
  return languages.includes(value as Lang);
}

export function localized<T extends Record<Lang, string>>(value: T, lang: Lang): string {
  return value[lang] || value.en;
}
