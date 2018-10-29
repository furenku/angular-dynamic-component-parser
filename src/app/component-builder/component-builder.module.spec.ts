import { ComponentBuilderModule } from './component-builder.module';

describe('ComponentBuilderModule', () => {
  let ComponentBuilderModule: ComponentBuilderModule;

  beforeEach(() => {
    ComponentBuilderModule = new ComponentBuilderModule();
  });

  it('should create an instance', () => {
    expect(ComponentBuilderModule).toBeTruthy();
  });
});
