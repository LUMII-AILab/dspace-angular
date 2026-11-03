import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PrivacyContentComponent } from './privacy-content.component';
import { PrivacyContentEnComponent } from './privacy-content-en.component';
import { PrivacyContentLvComponent } from './privacy-content-lv.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

describe('PrivacyContentComponent', () => {
  let component: PrivacyContentComponent;
  let fixture: ComponentFixture<PrivacyContentComponent>;

  beforeEach(waitForAsync(() => {
    return TestBed.configureTestingModule({
      imports: [CommonModule, TranslateModule.forRoot()],
      declarations: [PrivacyContentComponent, PrivacyContentEnComponent, PrivacyContentLvComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(TranslateService).use('en');
    fixture = TestBed.createComponent(PrivacyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('switches the actual shared policy content between English and Latvian', () => {
    const translate = TestBed.inject(TranslateService);
    translate.use('lv');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('LV, Latvijas Republika');
    expect(fixture.nativeElement.textContent).not.toContain('LV, Republic of Latvia');
    expect(fixture.nativeElement.querySelectorAll('h1').length).toBe(1);
    translate.use('en');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('LV, Republic of Latvia');
    expect(fixture.nativeElement.textContent).not.toContain('LV, Latvijas Republika');
  });

  it('renders the shared Latvian repository policy instead of generic boilerplate', () => {
    expect(component).toBeTruthy();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1').textContent).toContain('CLARIN-LV');
    expect(element.textContent).toContain('Institute of Mathematics and Computer Science');
    expect(element.textContent).toContain('LV, Republic of Latvia');
    expect(element.textContent).toContain('five years');
    expect(element.textContent).not.toContain('Children under the age of 13');
    expect(element.textContent).not.toContain('"Company"');
  });
});
