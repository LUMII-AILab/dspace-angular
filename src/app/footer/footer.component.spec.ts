import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './footer.component';
import { KlaroService } from '../shared/cookies/klaro.service';
import { CLARIN_LV_HELP_LINKS, CLARIN_LV_PARTNERS } from '../shared/clarin-lv-links';

describe('CLARIN-LV footer', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let translate: TranslateService;
  let cookies: jasmine.SpyObj<KlaroService>;
  let element: HTMLElement;

  beforeEach(waitForAsync(() => {
    cookies = jasmine.createSpyObj('KlaroService', ['showSettings']);
    return TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, TranslateModule.forRoot()],
      declarations: [FooterComponent],
      providers: [
        { provide: KlaroService, useValue: cookies },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { 'clarin-lv.partners': 'Partners', 'clarin-lv.cookie-settings': 'Cookie settings' });
    translate.setTranslation('lv', { 'clarin-lv.partners': 'Partneri', 'clarin-lv.cookie-settings': 'Sīkdatņu iestatījumi' });
    translate.use('en');
    fixture = TestBed.createComponent(FooterComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('renders seven Latvian partners, not a Czech partner list', () => {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('.partner-links a'));
    expect(links.map(link => link.href)).toEqual(CLARIN_LV_PARTNERS.map(partner => partner.en));
    expect(links.length).toBe(7);
    expect(element.textContent).not.toContain('Charles University');
    expect(element.querySelector('a[href*="lindat.cz"]')).toBeNull();
    expect(element.querySelector('a[href*="twitter.com"]')).toBeNull();
  });

  it('updates partner labels and destinations when the locale changes', () => {
    translate.use('lv');
    fixture.detectChanges();
    expect(element.querySelector('#clarin-partners-heading').textContent).toBe('Partneri');
    expect(Array.from(element.querySelectorAll<HTMLAnchorElement>('.partner-links a')).map(link => link.href))
      .toEqual(CLARIN_LV_PARTNERS.map(partner => partner.lv));
  });

  it('uses Latvia certificates and local images', () => {
    const badges = Array.from(element.querySelectorAll<HTMLAnchorElement>('.certification-badges a'));
    expect(badges.length).toBe(2);
    expect(badges[0].href).toContain('B-centre-certificate_CLARIN-LV.pdf');
    expect(badges[1].href).toContain('CLARIN-LVrepository-CoreTrustSealRequirements2023-2025.pdf');
    expect(element.querySelector('a[href*="11234/6-CTS"]')).toBeNull();
    expect(Array.from(element.querySelectorAll('img')).every(image => image.getAttribute('src').startsWith('assets/images/clarin-lv/'))).toBeTrue();
  });

  it('keeps policies, support and attribution without duplicating the Help menu', () => {
    for (const link of CLARIN_LV_HELP_LINKS) {
      expect(element.querySelector(`a[href="${link.path}"], a[href="/${link.path}"]`)).toBeNull();
    }
    expect(element.querySelector('a[href="static/about"]')).not.toBeNull();
    expect(element.querySelector('a[href="mailto:info@clarin.lv"]')).not.toBeNull();
    expect(element.querySelector('a[href="https://github.com/ufal/clarin-dspace"]')).not.toBeNull();
    expect(element.querySelector('a[href*="xmlui"]')).toBeNull();
  });

  it('opens the existing cookie preferences without changing consent', () => {
    element.querySelector<HTMLButtonElement>('.settings-links button').click();
    expect(cookies.showSettings).toHaveBeenCalledTimes(1);
  });
});
