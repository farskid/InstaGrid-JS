# InstaGrid

The js library to do exactly what [InstGrid Application](https://play.google.com/store/apps/details?id=com.hodanny.instagrid&hl=en) does. It splits any image into 6 parts. Like the image below:
![InstaGrid App](http://m.img.brothersoft.com/iphone/12/679974012_screen2360x480.jpeg)

## Installation

with NPM: `npm install instagrid --save`
with Yarn: `yarn add instagrid`
browser: Just get the last version from __dist__ folder and use it. It's your choice whether to use the `script.es6.js` or `script.es5.js`.

## Usage

```
new InstaLayout([INPUT_ELEMENT], [RESULT_CONTAINER])

Params:
  * the input[type=file] element
  * the resulting container className
```

```
<input type="file" id="file" onchange="runLayout(this)">
<div class="result">
  <!-- This is where our result would be rendered to DOM -->
</div>  

<script src="PATH_TO_INSTAGRID.JS"></script>
<script>
  function runLayout(elem) {
    var layout = new InstaGrid(elem, '.result')
    layout.render(function(self) {
      // You have the whole `layout` object here.
    })
  }
</script>
```

## Available Methods

__`render`:__ Renders 6 resulting image parts into the `result_container` element. It also accepts a callback that runs after all images been rendered to the DOM.

__`getSources`:__ Returns an array of 6 image objects with `src`  and `position` properties. The `position` property is an object containing `top`, `left` and `order` props of the image in order.

---
MIT licensed. Credit: Farskid (Farzad YZ)
