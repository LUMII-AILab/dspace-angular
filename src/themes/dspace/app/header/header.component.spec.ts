import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LocaleService } from '../../../../app/core/locale/locale.service';
import { HostWindowService } from '../../../../app/shared/host-window.service';
import { MenuService } from '../../../../app/shared/menu/menu.service';
import { HeaderComponent } from './header.component';

describe('CLARIN-LV themed header', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;
  let language: string;

  beforeEach(waitForAsync(() => {
    language = 'en';
    return TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, NgbDropdownModule, TranslateModule.forRoot()],
      declarations: [HeaderComponent],
      providers: [
        { provide: MenuService, useValue: {} },
        { provide: HostWindowService, useValue: { isUpTo: () => of(false) } },
        { provide: LocaleService, useValue: { getCurrentLanguageCode: () => language } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { 'clarin-lv.menu': 'Menu' });
    translate.use('en');
    fixture = TestBed.createComponent(HeaderComponent);
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('links repository navigation internally and corpus search to Latvia', () => {
    expect(element.querySelector('a.clarin-brand[href="/home"]')).not.toBeNull();
    expect(element.querySelector('a[href="/community-list"]')).not.toBeNull();
    const corpus = element.querySelector<HTMLAnchorElement>('a[href="https://korpuss.lv/search"]');
    expect(corpus.target).toBe('_blank');
    expect(corpus.relList.contains('noopener')).toBeTrue();
    expect(corpus.relList.contains('noreferrer')).toBeTrue();
    expect(element.querySelector('a[href="/services/catalog"]')).toBeNull();
    expect(element.querySelector('a[href="/lindat"]')).toBeNull();
    expect(element.querySelector('a[href*="dariah"]')).toBeNull();
    expect(element.querySelector('ds-clarin-navbar-top')).not.toBeNull();
  });

  it('updates the external portal destination for Latvian', () => {
    language = 'lv';
    fixture.detectChanges();
    expect(element.querySelector('a[href="https://www.clarin.lv/lv/"]')).not.toBeNull();
  });

  it('opens and closes the mobile menu and updates its accessible state', () => {
    const toggle = element.querySelector<HTMLButtonElement>('.clarin-menu-toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('#clarin-main-menu').classList.contains('is-open')).toBeTrue();
    const focus = spyOn(toggle, 'focus');
    element.querySelector('nav').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(focus).toHaveBeenCalled();
  });

  it('uses the existing keyboard-aware dropdown with real help destinations', () => {
    element.querySelector<HTMLButtonElement>('#clarin-help-menu').click();
    fixture.detectChanges();
    expect(element.querySelector('#clarin-help-menu').getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('a[href="static/deposit"]')).not.toBeNull();
    expect(element.querySelector('a[href="static/faq"]')).not.toBeNull();
    expect(element.querySelector('a[href="contact"]')).not.toBeNull();
  });
});
