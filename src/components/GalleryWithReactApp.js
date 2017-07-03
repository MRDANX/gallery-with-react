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

function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}
function getRandomDeg(min, max) {
  return (Math.ceil(Math.random() * (max - min)) + min);
}
var ImgFigure = React.createClass({
  handleClick: function () {
    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
  },
  render: function () {

    var styleObj = {};
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    if(this.props.arrange.rotate){
      ['-moz-', '-webkit-', '-ms-', ''].forEach(function (value) {
            styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));
    }

    var className = 'img-figure';
    if(this.props.arrange.isInverse){
      className += ' img-inverse';
    }
    if(this.props.arrange.isCenter){
      className += ' img-center';
    }

    return (
        <figure className={className} style={styleObj} onClick={this.handleClick}>
          <img src={this.props.data.imageURL} alt={this.props.data.title}/>
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
          </figcaption>
          <div className="img-back">
              {this.props.data.desc}
          </div>
        </figure>
    );
  }
});

var GalleryWithReactApp = React.createClass({
  Constant: {
    centerPos: {
      left: 0,
      top: 0
    },
    hPosRange: {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {
      x: [0, 0],
      topY: [0, 0]
    }
  },
  componentDidMount: function() {

    var stageDOM = React.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgW;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;
    this.rearrange(Math.random() * 16);
    // setInterval(function () {
    //   this.rearrange(Math.random() * 16);
    // }.bind(this), 2000);
  },
  rearrange: function (centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,
        imgsArrangeTopArr = [],
        topImgNum = Math.ceil(Math.random() * 2),
        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true,
          isInverse: false
        };
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        imgsArrangeTopArr.forEach(function (value, index) {
          imgsArrangeTopArr[index] = {
            pos: {
              top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
              left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
            },
            rotate: getRandomDeg(50, 150),
            isCenter: false,
            isInverse: false
          };
        });

        for(var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++){
          var hPosRangeLORX = null;

          if(i < k){
            hPosRangeLORX = hPosRangeLeftSecX;
          }else{
            hPosRangeLORX = hPosRangeRightSecX;
          }

          imgsArrangeArr[i] = {
            pos: {
              top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
              left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            },
            rotate: getRandomDeg(50, 150),
            isCenter: false,
            isInverse: false
          };
        }

        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
          imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        });
  },
  getInitialState: function () {
    return {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: 0,
        //     top: 0;
        //   },
        //  rotete: 0,
        //  isInverse: false,
        //  isCenter: false
        // }
      ]
    };
  },
  inverse: function (index) {
    return function () {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this);
  },
  center: function (index) {
    return function () {
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isCenter = !imgsArrangeArr[index].isCenter;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
      this.rearrange(index);
    }.bind(this);
  },
  render: function() {

    var controllerUnits = [],
        imgFigures = [];

        imageDatas.forEach(function (value, index) {
          if(!this.state.imgsArrangeArr[index]){
            this.state.imgsArrangeArr[index] = {
              pos: {
                left: 0,
                top: 0
              },
              rotate: 0,
              isInverse: false,
              isCenter: false
            };
          }
          imgFigures.push(<ImgFigure data={value}
                            ref={'imgFigure' + index}
                            arrange={this.state.imgsArrangeArr[index]}
                            inverse={this.inverse(index)}
                            center={this.center(index)}/>);
        }.bind(this));
    return (
        <section className="stage" ref="stage">
            <section className="img-sec">
              {imgFigures}
            </section>
            <nav className="controller-nav">
              {controllerUnits}
            </nav>
        </section>
    );
  }
});
React.render(<GalleryWithReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryWithReactApp;
