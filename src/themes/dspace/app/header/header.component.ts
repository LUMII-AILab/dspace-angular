import { Component } from '@angular/core';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';
import {
  CLARIN_LV_CORPUS_SEARCH,
  CLARIN_LV_HELP_LINKS,
  CLARIN_LV_PORTAL,
  clarinLocalizedUrl,
} from '../../../../app/shared/clarin-lv-links';

@Component({
  selector: 'ds-header',
  styleUrls: ['header.component.scss'],
  templateUrl: 'header.component.html',
})
export class HeaderComponent extends BaseComponent {
  navigationOpen = false;
  readonly helpLinks = CLARIN_LV_HELP_LINKS;
  readonly corpusSearch = CLARIN_LV_CORPUS_SEARCH;

  get portalUrl(): string {
    return clarinLocalizedUrl(CLARIN_LV_PORTAL, this.getLangCode());
  }

  closeNavigation(toggle: HTMLButtonElement): void {
    if (this.navigationOpen) {
      this.navigationOpen = false;
      toggle.focus();
    }
  }
}
