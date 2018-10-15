import { ContentCaptureModule } from './content-capture.module';

describe('ContentCaptureModule', () => {
  let contentCaptureModule: ContentCaptureModule;

  beforeEach(() => {
    contentCaptureModule = new ContentCaptureModule();
  });

  it('should create an instance', () => {
    expect(contentCaptureModule).toBeTruthy();
  });
});
