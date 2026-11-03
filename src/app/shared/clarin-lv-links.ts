export interface LocalizedClarinLink {
  en: string;
  lv: string;
}

export const CLARIN_LV_PORTAL: LocalizedClarinLink = {
  en: 'https://www.clarin.lv/en-us/',
  lv: 'https://www.clarin.lv/lv/',
};

export const CLARIN_LV_CORPUS_SEARCH = 'https://korpuss.lv/search';

export const CLARIN_LV_PARTNERS: ReadonlyArray<LocalizedClarinLink & { key: string }> = [
  { key: 'lumii', en: 'https://www.lumii.lv/?lang=en', lv: 'https://www.lumii.lv/' },
  { key: 'lulfmi', en: 'https://lulfmi.lv/en/', lv: 'https://lulfmi.lv/' },
  { key: 'lu', en: 'https://www.lu.lv/en/', lv: 'https://www.lu.lv/' },
  { key: 'rsu', en: 'https://www.rsu.lv/en', lv: 'https://www.rsu.lv/' },
  { key: 'liepaja', en: 'https://www.rtu.lv/en/liepaja', lv: 'https://www.rtu.lv/lv/liepaja' },
  { key: 'rezekne', en: 'https://www.rtu.lv/en/rezekne', lv: 'https://www.rtu.lv/lv/rezekne' },
  { key: 'lnb', en: 'https://www.lnb.lv/en', lv: 'https://www.lnb.lv/' },
];

export const CLARIN_LV_HELP_LINKS = [
  { key: 'deposit', path: 'static/deposit' },
  { key: 'cite', path: 'static/cite' },
  { key: 'lifecycle', path: 'static/item-lifecycle' },
  { key: 'faq', path: 'static/faq' },
  { key: 'metadata', path: 'static/metadata' },
  { key: 'contact', path: 'contact' },
];

export function clarinLocalizedUrl(link: LocalizedClarinLink, language: string): string {
  return language === 'lv' ? link.lv : link.en;
}
