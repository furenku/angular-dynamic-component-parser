import { ContentComponentsModule } from './content-components.module';

describe('ContentComponentsModule', () => {
  let contentComponentsModule: ContentComponentsModule;

  beforeEach(() => {
    contentComponentsModule = new ContentComponentsModule();
  });

  it('should create an instance', () => {
    expect(contentComponentsModule).toBeTruthy();
  });
});
