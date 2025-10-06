import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEjerciciosComponent } from './listar-ejercicios.component';

describe('ListarEjerciciosComponent', () => {
  let component: ListarEjerciciosComponent;
  let fixture: ComponentFixture<ListarEjerciciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEjerciciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
