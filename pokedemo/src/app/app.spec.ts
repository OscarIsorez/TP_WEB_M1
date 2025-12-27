import { App } from './app';

describe('App', () => {
  let component: App;

  beforeEach(() => {
    component = new App();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have pokedemo as title', () => {
    expect(component.title()).toEqual('pokedemo');
  });
});
