import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSuperCardsComponent } from './ngx-super-cards.component';

describe('NgxSuperCardsComponent', () => {
  let component: NgxSuperCardsComponent;
  let fixture: ComponentFixture<NgxSuperCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSuperCardsComponent]
    });
    fixture = TestBed.createComponent(NgxSuperCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
