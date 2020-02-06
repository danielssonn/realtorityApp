import { HtmlSanitizerPipePipe } from './html-sanitizer-pipe.pipe';

describe('HtmlSanitizerPipePipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlSanitizerPipePipe();
    expect(pipe).toBeTruthy();
  });
});
