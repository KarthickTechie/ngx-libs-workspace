import { TestBed } from '@angular/core/testing';

import { NgxSuperCardsService } from './ngx-super-cards.service';

describe('NgxSuperCardsService', () => {
  let service: NgxSuperCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSuperCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
