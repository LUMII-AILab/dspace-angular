import { Component } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { LocaleService } from '../core/locale/locale.service';

/** Native navigation remains usable without discovery scripts, including SSR. */
@Component({
  selector: 'ds-clarin-navbar-top',
  templateUrl: './clarin-navbar-top.component.html',
  styleUrls: ['./clarin-navbar-top.component.scss']
})
export class ClarinNavbarTopComponent {
  authenticatedUser$ = this.authService.getAuthenticatedUserFromStoreIfAuthenticated();

  constructor(private authService: AuthService, private localeService: LocaleService) { }

  setLanguage(language: string) {
    this.localeService.setCurrentLanguageCode(language);
    this.localeService.refreshAfterChangeLanguage();
  }
}
