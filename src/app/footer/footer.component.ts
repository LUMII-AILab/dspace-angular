import { Component, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CLARIN_LV_PARTNERS, CLARIN_LV_PORTAL, clarinLocalizedUrl, LocalizedClarinLink } from '../shared/clarin-lv-links';
import { hasValue } from '../shared/empty.util';
import { KlaroService } from '../shared/cookies/klaro.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html'
})
export class FooterComponent {
  readonly partners = CLARIN_LV_PARTNERS;
  readonly portal = CLARIN_LV_PORTAL;
  showPrivacyPolicy = environment.info.enablePrivacyStatement;
  showEndUserAgreement = environment.info.enableEndUserAgreement;

  constructor(
    @Optional() private cookies: KlaroService,
    private translate: TranslateService
  ) {}

  localizedUrl(link: LocalizedClarinLink): string {
    return clarinLocalizedUrl(link, this.translate.currentLang);
  }

  showCookieSettings() {
    if (hasValue(this.cookies)) {
      this.cookies.showSettings();
    }
    return false;
  }
}
