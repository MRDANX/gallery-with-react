'use strict';

describe('GalleryWithReactApp', () => {
  let React = require('react/addons');
  let GalleryWithReactApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    GalleryWithReactApp = require('components/GalleryWithReactApp.js');
    component = React.createElement(GalleryWithReactApp);
  });

  it('should create a new instance of GalleryWithReactApp', () => {
    expect(component).toBeDefined();
  });
});
