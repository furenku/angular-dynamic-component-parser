import { TestBed, inject } from '@angular/core/testing';

import { ContentCaptureService } from './content-capture.service';

describe('ContentCaptureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentCaptureService]
    });
  });

  it('should be created', inject([ContentCaptureService], (service: ContentCaptureService) => {
    expect(service).toBeTruthy();
  }));
});
