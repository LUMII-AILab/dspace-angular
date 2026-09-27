import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { getAuthState } from '../core/auth/selectors';
import { AuthService } from '../core/auth/auth.service';
import { LocaleService } from '../core/locale/locale.service';

/** Native navigation remains usable without discovery scripts, including SSR. */
@Component({
  selector: 'ds-clarin-navbar-top',
  templateUrl: './clarin-navbar-top.component.html',
  styleUrls: ['./clarin-navbar-top.component.scss']
})
export class ClarinNavbarTopComponent {
  // SSR can precede the browser's external-session check. Keep its snapshot neutral
  // as well as the live header until authentication and the user record are ready.
  session$ = combineLatest([
    this.store.select(getAuthState),
    this.authService.getAuthenticatedUserFromStoreIfAuthenticated(),
  ]).pipe(map(([auth, user]) => ({
    pending: !isPlatformBrowser(this.platformId) || auth.blocking || auth.loading
      || (auth.authenticated && !user),
    user: auth.authenticated ? user : null,
  })));

  constructor(private authService: AuthService,
              private localeService: LocaleService,
              private store: Store<AppState>,
              @Inject(PLATFORM_ID) private platformId: object) { }

  setLanguage(language: string) {
    this.localeService.setCurrentLanguageCode(language);
    this.localeService.refreshAfterChangeLanguage();
  }
}
