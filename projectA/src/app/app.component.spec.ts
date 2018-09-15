import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ShareService } from 'share-module/src/app/share.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [ShareService]
    }).compileComponents();
  }));

  it('should return \'test\' ', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance as AppComponent;
    // It should be wrong
    expect(app.shareService.getData()).toBe('test');
  }));

});
