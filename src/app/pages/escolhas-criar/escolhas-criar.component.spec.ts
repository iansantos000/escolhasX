import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolhasCriarComponent } from './escolhas-criar.component';

describe('EscolhasCriarComponent', () => {
  let component: EscolhasCriarComponent;
  let fixture: ComponentFixture<EscolhasCriarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolhasCriarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolhasCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
