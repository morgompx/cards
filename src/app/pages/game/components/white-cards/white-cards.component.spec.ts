import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteCardsComponent } from './white-cards.component';

describe('WhiteCardsComponent', () => {
  let component: WhiteCardsComponent;
  let fixture: ComponentFixture<WhiteCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
