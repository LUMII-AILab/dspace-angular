import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// Keep the acceptance screen and /static/terms-of-service on the same EN/LV policy text.

@Component({
  selector: 'ds-end-user-agreement-content',
  template: `
    <ds-end-user-agreement-content-lv *ngIf="translate.currentLang === 'lv'; else english"></ds-end-user-agreement-content-lv>
    <ng-template #english><ds-end-user-agreement-content-en></ds-end-user-agreement-content-en></ng-template>
  `,
})
export class EndUserAgreementContentComponent {
  constructor(public translate: TranslateService) {}
}
