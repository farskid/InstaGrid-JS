const canvasFactory = () => {
  const canvas = document.createElement('canvas'),
    context = canvas.getContext('2d')

  return {
    canvas,
    context
  }
}

const isFunction = func => {
  return func && typeof func === 'function'
}

const resetHTML = elem => {
  elem.innerHTML = ''
}

const setElemAttrs = (elem, attrs) => {
  Object.keys(attrs).forEach(attr => {
    elem[attr] = attrs[attr]
  })
}

const setElemDimensions = (elem, dimensions) => {
  setElemAttrs(elem, dimensions)
}

const setElemStyles = (elem, styles) => {
  setElemAttrs(elem.style, styles)
}

module.exports = {
  canvasFactory,
  isFunction,
  resetHTML,
  setElemDimensions,
  setElemAttrs,
  setElemStyles
}
