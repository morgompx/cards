import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackCardsComponent } from './black-cards.component';

describe('BlackCardsComponent', () => {
  let component: BlackCardsComponent;
  let fixture: ComponentFixture<BlackCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
