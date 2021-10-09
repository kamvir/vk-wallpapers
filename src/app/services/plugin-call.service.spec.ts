import { TestBed } from '@angular/core/testing';

import { PluginCallService } from './plugin-call.service';

describe('PluginCallService', () => {
  let service: PluginCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
