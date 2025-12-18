import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCardPage } from './word-card-page';
describe('WordCardPage', () => {
  let component: WordCardPage;
  let fixture: ComponentFixture<WordCardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordCardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
