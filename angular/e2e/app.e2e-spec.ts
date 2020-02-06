import { ConciergePage } from './app.po';

describe('concierge App', () => {
  let page: ConciergePage;

  beforeEach(() => {
    page = new ConciergePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
