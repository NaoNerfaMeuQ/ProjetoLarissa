import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasHistorias } from './minhas-historias';

describe('MinhasHistorias', () => {
  let component: MinhasHistorias;
  let fixture: ComponentFixture<MinhasHistorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinhasHistorias],
    }).compileComponents();

    fixture = TestBed.createComponent(MinhasHistorias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
