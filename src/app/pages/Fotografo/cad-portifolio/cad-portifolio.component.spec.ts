import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadPortifolioComponent } from './cad-portifolio.component';

describe('CadPortifolioComponent', () => {
  let component: CadPortifolioComponent;
  let fixture: ComponentFixture<CadPortifolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadPortifolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadPortifolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
