import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeioAmbiente } from './meio-ambiente';

describe('MeioAmbiente', () => {
  let component: MeioAmbiente;
  let fixture: ComponentFixture<MeioAmbiente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeioAmbiente],
    }).compileComponents();

    fixture = TestBed.createComponent(MeioAmbiente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
