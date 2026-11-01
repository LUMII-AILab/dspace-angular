import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// Compile the same EN/LV fragments used by /static/privacy-policy, without duplicating legal text.

@Component({
  selector: 'ds-privacy-content',
  template: `
    <ds-privacy-content-lv *ngIf="translate.currentLang === 'lv'; else english"></ds-privacy-content-lv>
    <ng-template #english><ds-privacy-content-en></ds-privacy-content-en></ng-template>
  `,
})
export class PrivacyContentComponent {
  constructor(public translate: TranslateService) {}
}
