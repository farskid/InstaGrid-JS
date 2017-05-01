const utils = require('./utils')
const { canvasFactory, setElemAttrs, setElemDimensions, setElemStyles, resetHTML, isFunction } = utils

class InstaLayout {
  constructor(elem, resultClassName) {
    this.elem = elem
    this.resultClassName = resultClassName
    this.container = document.querySelector(resultClassName)
    this.images = []
  }

  _setStyles() {
    setElemStyles(this.container, {
      position: 'relative'
    })
  }

  _readFile(file, onLoadCallback) {
    const reader = new FileReader()
    const { render } = this

    reader.onload = function () {
      if (isFunction(onLoadCallback)) onLoadCallback(reader.result)
    }

    reader.readAsDataURL(file)
  }

  _drawImagePart(image, x, y, width, height, id) {
    const canvasObj = canvasFactory()
    const { canvas, context } = canvasObj
    const position = {
      top: (id < 4 ? '0px' : `${height}px`),
      left: `${x}px`
    }

    setElemDimensions(canvas, {
      width,
      height
    })
    setElemAttrs(canvas, {
      id
    })
    setElemStyles(canvas, Object.assign({}, position, {
      position: 'absolute',
      border: '1px solid #ddd'
    }))

    context.drawImage(image, x, y, width, height, 0, 0, width, height)

    try {
      this._setImage(canvas.toDataURL(), position, id)
    } catch (e) { console.warn("[InstaLayout]: Can't pull images out of canvas.", e) }

    this.container.appendChild(canvas)
  }

  _setImage(src, position, id) {
    this.images.push({
      src,
      position,
      order: id
    })
  }

  render(callback) {
    const image = document.createElement('img')

    image.onload = () => {
      const width = image.width,
        height = image.height

      const partWidth = width / 3,
        partHeight = height / 2

      resetHTML(this.container)

      this._drawImagePart(image, 0, 0, partWidth, partHeight, 1)
      this._drawImagePart(image, partWidth, 0, partWidth, partHeight, 2)
      this._drawImagePart(image, 2 * partWidth, 0, partWidth, partHeight, 3)
      this._drawImagePart(image, 0, partHeight, partWidth, partHeight, 4)
      this._drawImagePart(image, partWidth, partHeight, partWidth, partHeight, 5)
      this._drawImagePart(image, 2 * partWidth, partHeight, partWidth, partHeight, 6)

      if (isFunction(callback)) callback(this)
    }

    this._readFile(this.elem.files[0], (src) => {
      image.src = src
    })

  }

  getSources() {
    return this.images
  }

}

module.exports = InstaLayout
