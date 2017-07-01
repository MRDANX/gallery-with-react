'use strict';

var React = require('react/addons');

// CSS
require('normalize.css');
require('../styles/main.scss');

var imageDatas = require('../data/imageDatas.json');
//var imageURL = require('../images/yeoman.png');
imageDatas = (function getImageURL(imageDatasArr) {
  for(var i = 0, j = imageDatasArr.length; i < j; i++){
    var singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

var GalleryWithReactApp = React.createClass({
  render: function() {
    return (
        <section className="stage">
            <section className="img-sec">
            </section>
            <nav className="controller-nav">
            </nav>
        </section>
    );
  }
});
React.render(<GalleryWithReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryWithReactApp;
