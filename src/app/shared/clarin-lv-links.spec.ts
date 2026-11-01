import { CLARIN_LV_PARTNERS, CLARIN_LV_PORTAL, clarinLocalizedUrl } from './clarin-lv-links';

describe('CLARIN-LV links', () => {
  it('keeps seven uniquely identified partners with HTTPS destinations in both languages', () => {
    expect(CLARIN_LV_PARTNERS.length).toBe(7);
    expect(new Set(CLARIN_LV_PARTNERS.map(partner => partner.key)).size).toBe(7);
    CLARIN_LV_PARTNERS.forEach(partner => {
      expect(new URL(partner.en).protocol).toBe('https:');
      expect(new URL(partner.lv).protocol).toBe('https:');
    });
  });

  it('selects Latvian explicitly and falls back to English', () => {
    expect(clarinLocalizedUrl(CLARIN_LV_PORTAL, 'lv')).toBe('https://www.clarin.lv/lv/');
    expect(clarinLocalizedUrl(CLARIN_LV_PORTAL, 'en')).toBe('https://www.clarin.lv/en-us/');
    expect(clarinLocalizedUrl(CLARIN_LV_PORTAL, 'cs')).toBe('https://www.clarin.lv/en-us/');
    expect(clarinLocalizedUrl(CLARIN_LV_PORTAL, undefined)).toBe('https://www.clarin.lv/en-us/');
  });
});
