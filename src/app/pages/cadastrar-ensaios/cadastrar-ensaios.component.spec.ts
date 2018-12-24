import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEnsaiosComponent } from './cadastrar-ensaios.component';

describe('CadastrarEnsaiosComponent', () => {
  let component: CadastrarEnsaiosComponent;
  let fixture: ComponentFixture<CadastrarEnsaiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarEnsaiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarEnsaiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
