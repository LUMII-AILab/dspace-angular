import { PLATFORM_ID } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { ClarinNavbarTopComponent } from './clarin-navbar-top.component';
import { AuthService } from '../core/auth/auth.service';
import { authReducer, AuthState } from '../core/auth/auth.reducer';
import {
  AuthenticatedErrorAction,
  AuthenticatedSuccessAction,
  CheckAuthenticationTokenAction,
  CheckAuthenticationTokenCookieAction,
  LogOutSuccessAction,
  RefreshTokenAction,
  RetrieveAuthenticatedEpersonErrorAction,
  RetrieveAuthenticatedEpersonSuccessAction,
  RetrieveAuthMethodsErrorAction,
  RetrieveAuthMethodsSuccessAction,
} from '../core/auth/auth.actions';
import { getAuthState } from '../core/auth/selectors';
import { AuthTokenInfo } from '../core/auth/models/auth-token-info.model';
import { LocaleService } from '../core/locale/locale.service';
import { StoreActionTypes } from '../store.actions';

describe('ClarinNavbarTopComponent', () => {
  let fixture: ComponentFixture<ClarinNavbarTopComponent>;
  let store: MockStore;
  let auth: AuthState;
  let platformId: string;
  const user$ = new BehaviorSubject<any>(null);

  beforeEach(async () => {
    user$.next(null);
    platformId = 'browser';
    auth = authReducer(undefined, { type: 'initial' } as any);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [ClarinNavbarTopComponent],
      providers: [
        provideMockStore(),
        { provide: PLATFORM_ID, useFactory: () => platformId },
        { provide: AuthService, useValue: { getAuthenticatedUserFromStoreIfAuthenticated: () => user$ } },
        { provide: LocaleService, useValue: jasmine.createSpyObj('LocaleService',
          ['setCurrentLanguageCode', 'refreshAfterChangeLanguage']) }
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    store.overrideSelector(getAuthState, auth);
  });

  function create() {
    fixture = TestBed.createComponent(ClarinNavbarTopComponent);
    fixture.detectChanges();
  }

  function apply(action) {
    auth = authReducer(auth, action);
    store.overrideSelector(getAuthState, auth);
    store.refreshState();
    fixture.detectChanges();
  }

  function expectPending() {
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('a[href="/login"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/profile"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/logout"]')).toBeNull();
  }

  function authenticate() {
    apply(new AuthenticatedSuccessAction(true, new AuthTokenInfo('test'), '/eperson/test'));
    user$.next({ name: 'Synthetic user' });
    apply(new RetrieveAuthenticatedEpersonSuccessAction('test'));
  }

  it('keeps login hidden throughout a three-second external-session check', fakeAsync(() => {
    create();
    expectPending();
    apply(new CheckAuthenticationTokenAction());
    apply(new CheckAuthenticationTokenCookieAction());
    setTimeout(() => authenticate(), 3000);
    tick(2999);
    fixture.detectChanges();
    expectPending();
    tick(1);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/login"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/profile"]').textContent).toContain('Synthetic user');
    expect(fixture.nativeElement.querySelector('a[href="/logout"]')).toBeTruthy();
  }));

  it('waits for the user record after authentication succeeds', () => {
    create();
    apply(new AuthenticatedSuccessAction(true, new AuthTokenInfo('test'), '/eperson/test'));
    apply(new RetrieveAuthenticatedEpersonSuccessAction('test'));
    expectPending();
    user$.next({ name: 'Synthetic user' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[href="/profile"]')).toBeTruthy();
  });

  it('offers a keyboard-accessible login link once anonymous authentication resolves', () => {
    create();
    apply(new RetrieveAuthMethodsSuccessAction([]));
    // Anonymous auth does not set loaded=true: do not wait on that unrelated flag.
    expect(auth.loaded).toBe(false);
    expect(fixture.nativeElement.querySelector('a[href="/login"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('#clarin-signon-discojuice')).toBeNull();
  });

  [new AuthenticatedErrorAction(new Error('Session unavailable')),
    new RetrieveAuthenticatedEpersonErrorAction(new Error('User unavailable')),
    new RetrieveAuthMethodsErrorAction()].forEach((action) => {
    it(`leaves pending state after ${action.type}`, () => {
      create();
      apply(action);
      expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
      expect(fixture.nativeElement.querySelector('a[href="/login"]')).toBeTruthy();
    });
  });

  it('keeps the initial server-rendered snapshot neutral even if it resolved as anonymous', () => {
    platformId = 'server';
    create();
    apply(new RetrieveAuthMethodsSuccessAction([]));
    expectPending();
  });

  it('checks again when browser state is rehydrated', () => {
    create();
    apply(new RetrieveAuthMethodsSuccessAction([]));
    apply({ type: StoreActionTypes.REHYDRATE });
    expectPending();
    authenticate();
    expect(fixture.nativeElement.querySelector('a[href="/logout"]')).toBeTruthy();
  });

  it('keeps the signed-in menu visible during background token refresh', () => {
    create();
    authenticate();
    apply(new RefreshTokenAction(new AuthTokenInfo('test')));
    expect(fixture.nativeElement.querySelector('a[href="/profile"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();
  });

  it('removes the old user immediately on logout and offers login after the check completes', () => {
    create();
    authenticate();
    apply(new LogOutSuccessAction());
    expectPending();
    apply(new RetrieveAuthMethodsSuccessAction([]));
    expect(fixture.nativeElement.querySelector('a[href="/profile"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/login"]')).toBeTruthy();
  });
});
