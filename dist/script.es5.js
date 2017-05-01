'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InstaGrid = function () {
  // Utils
  var canvasFactory = function canvasFactory() {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    return {
      canvas: canvas,
      context: context
    };
  };

  var isFunction = function isFunction(func) {
    return func && typeof func === 'function';
  };

  var resetHTML = function resetHTML(elem) {
    elem.innerHTML = '';
  };

  var setElemAttrs = function setElemAttrs(elem, attrs) {
    Object.keys(attrs).forEach(function (attr) {
      elem[attr] = attrs[attr];
    });
  };

  var setElemDimensions = function setElemDimensions(elem, dimensions) {
    setElemAttrs(elem, dimensions);
  };

  var setElemStyles = function setElemStyles(elem, styles) {
    setElemAttrs(elem.style, styles);
  };

  // InstaGrid

  var InstaLayout = function () {
    function InstaLayout(elem, resultClassName) {
      _classCallCheck(this, InstaLayout);

      this.elem = elem;
      this.resultClassName = resultClassName;
      this.container = document.querySelector(resultClassName);
      this.images = [];
    }

    _createClass(InstaLayout, [{
      key: '_setStyles',
      value: function _setStyles() {
        setElemStyles(this.container, {
          position: 'relative'
        });
      }
    }, {
      key: '_readFile',
      value: function _readFile(file, onLoadCallback) {
        var reader = new FileReader();
        var render = this.render;


        reader.onload = function () {
          if (isFunction(onLoadCallback)) onLoadCallback(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }, {
      key: '_drawImagePart',
      value: function _drawImagePart(image, x, y, width, height, id) {
        var canvasObj = canvasFactory();
        var canvas = canvasObj.canvas,
            context = canvasObj.context;

        var position = {
          top: id < 4 ? '0px' : height + 'px',
          left: x + 'px'
        };

        setElemDimensions(canvas, {
          width: width,
          height: height
        });
        setElemAttrs(canvas, {
          id: id
        });
        setElemStyles(canvas, Object.assign({}, position, {
          position: 'absolute'
        }));

        context.drawImage(image, x, y, width, height, 0, 0, width, height);

        try {
          this._setImage(canvas.toDataURL(), position);
        } catch (e) {
          console.warn("[InstaLayout]: Can't pull images out of canvas.", e);
        }

        this.container.appendChild(canvas);
      }
    }, {
      key: '_setImage',
      value: function _setImage(src, position) {
        this.images.push({
          src: src,
          position: position
        });
      }
    }, {
      key: 'render',
      value: function render(callback) {
        var _this = this;

        var image = document.createElement('img');

        image.onload = function () {
          var width = image.width,
              height = image.height;

          var partWidth = width / 3,
              partHeight = height / 2;

          resetHTML(_this.container);

          _this._drawImagePart(image, 0, 0, partWidth, partHeight, 1);
          _this._drawImagePart(image, partWidth, 0, partWidth, partHeight, 2);
          _this._drawImagePart(image, 2 * partWidth, 0, partWidth, partHeight, 3);
          _this._drawImagePart(image, 0, partHeight, partWidth, partHeight, 4);
          _this._drawImagePart(image, partWidth, partHeight, partWidth, partHeight, 5);
          _this._drawImagePart(image, 2 * partWidth, partHeight, partWidth, partHeight, 6);

          if (isFunction(callback)) callback(_this);
        };

        this._readFile(this.elem.files[0], function (src) {
          image.src = src;
        });
      }
    }, {
      key: 'getSources',
      value: function getSources() {
        return this.images;
      }
    }]);

    return InstaLayout;
  }();

  return InstaGrid;
}();
