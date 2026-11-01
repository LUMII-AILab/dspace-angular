import { Component, OnInit, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CLARIN_LV_PARTNERS, CLARIN_LV_PORTAL, clarinLocalizedUrl, LocalizedClarinLink } from '../shared/clarin-lv-links';
import { hasValue } from '../shared/empty.util';
import { KlaroService } from '../shared/cookies/klaro.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthorizationDataService } from '../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../core/data/feature-authorization/feature-id';
import { RemoteData } from '../core/data/remote-data';
import { ConfigurationProperty } from '../core/shared/configuration-property.model';
import { ConfigurationDataService } from '../core/data/configuration-data.service';

@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  templateUrl: 'footer.component.html'
})
export class FooterComponent implements OnInit {
  dateObj: number = Date.now();
  readonly partners = CLARIN_LV_PARTNERS;

  readonly portal = CLARIN_LV_PORTAL;


  /**
   * A boolean representing if to show or not the top footer container
   */
  showTopFooter = false;
  showPrivacyPolicy = environment.info.enablePrivacyStatement;
  showEndUserAgreement = environment.info.enableEndUserAgreement;
  showSendFeedback$: Observable<boolean>;

  /**
   * The company url which customized this DSpace with redirection to the DSpace section
   */
  themedByUrl$: Observable<RemoteData<ConfigurationProperty>>;

  /**
   * The company name which customized this DSpace with redirection to the DSpace section
   */
  themedByCompanyName$: Observable<RemoteData<ConfigurationProperty>>;

  constructor(
    @Optional() private cookies: KlaroService,
    private authorizationService: AuthorizationDataService,
    protected configurationDataService: ConfigurationDataService,
    private translate: TranslateService
  ) {
    this.showSendFeedback$ = this.authorizationService.isAuthorized(FeatureID.CanSendFeedback);
  }

  localizedUrl(link: LocalizedClarinLink): string {
    return clarinLocalizedUrl(link, this.translate.currentLang);
  }

  ngOnInit(): void {
    this.loadThemedByProps();
  }
  showCookieSettings() {
    if (hasValue(this.cookies)) {
      this.cookies.showSettings();
    }
    return false;
  }

  private loadThemedByProps() {
    this.themedByUrl$ = this.configurationDataService.findByPropertyName('themed.by.url');
    this.themedByCompanyName$ = this.configurationDataService.findByPropertyName('themed.by.company.name');
  }
}
