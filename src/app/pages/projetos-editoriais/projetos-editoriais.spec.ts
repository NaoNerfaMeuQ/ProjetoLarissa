import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjetosEditoriais } from './projetos-editoriais';

describe('ProjetosEditoriais', () => {
  let component: ProjetosEditoriais;
  let fixture: ComponentFixture<ProjetosEditoriais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetosEditoriais],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetosEditoriais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
