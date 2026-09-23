import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { ClarinNavbarTopComponent } from './clarin-navbar-top.component';
import { AuthService } from '../core/auth/auth.service';
import { LocaleService } from '../core/locale/locale.service';

describe('ClarinNavbarTopComponent', () => {
  let fixture: ComponentFixture<ClarinNavbarTopComponent>;
  const user$ = new BehaviorSubject<any>(null);
  beforeEach(async () => {
    user$.next(null);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [ClarinNavbarTopComponent],
      providers: [
        { provide: AuthService, useValue: { getAuthenticatedUserFromStoreIfAuthenticated: () => user$ } },
        { provide: LocaleService, useValue: { setCurrentLanguageCode() {}, refreshAfterChangeLanguage() {} } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ClarinNavbarTopComponent);
    fixture.detectChanges();
  });
  it('offers a keyboard-accessible login link without popup scripts', () => {
    expect(fixture.nativeElement.querySelector('a[href="/login"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#clarin-signon-discojuice')).toBeNull();
  });
  it('updates navigation when authentication changes', () => {
    user$.next({ name: 'Synthetic user' }); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[href="/profile"]')).toBeTruthy();
    user$.next(null); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[href="/login"]')).toBeTruthy();
  });
});
