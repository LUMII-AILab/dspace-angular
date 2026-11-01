import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EndUserAgreementContentComponent } from './end-user-agreement-content.component';
import { EndUserAgreementContentEnComponent } from './end-user-agreement-content-en.component';
import { EndUserAgreementContentLvComponent } from './end-user-agreement-content-lv.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

describe('EndUserAgreementContentComponent', () => {
  let component: EndUserAgreementContentComponent;
  let fixture: ComponentFixture<EndUserAgreementContentComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      imports: [CommonModule, TranslateModule.forRoot()],
      declarations: [EndUserAgreementContentComponent, EndUserAgreementContentEnComponent, EndUserAgreementContentLvComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(TranslateService).use('en');
    fixture = TestBed.createComponent(EndUserAgreementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('switches the shared terms and retains the privacy link in both languages', () => {
    const translate = TestBed.inject(TranslateService);
    translate.use('lv');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('pakalpojumu lietošanas noteikumi');
    expect(fixture.nativeElement.querySelector('a[href="static/privacy-policy"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('h1').length).toBe(1);
    translate.use('en');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Terms of Service');
    expect(fixture.nativeElement.querySelector('a[href="static/privacy-policy"]')).not.toBeNull();
  });

  it('renders the shared v5 Latvia terms without changing the acceptance controls', () => {
    expect(component).toBeTruthy();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1').textContent).toContain('CLARIN Terms of Service');
    expect(element.textContent).toContain('CLARIN-LV');
    expect(element.textContent).toContain('laws of Latvia');
    expect(element.textContent).toContain('Riga District Court');
    expect(element.textContent).not.toContain('"Company"');
    expect(element.querySelector('a[href="static/privacy-policy"]')).not.toBeNull();
  });
});
