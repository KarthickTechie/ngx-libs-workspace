import { TestBed } from '@angular/core/testing';

import { NgxSuperDashboardService } from './ngx-super-dashboard.service';

describe('NgxSuperDashboardService', () => {
  let service: NgxSuperDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSuperDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
