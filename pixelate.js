var Pixelate = function (imagePath, output, options) {

  // Quit if no imagePath or output
  if (!imagePath || !output) return;
  options = options || {};

  // Set options
  var pixelDensity = options.pixelDensity || 130;
  var pixelStyle = options.pixelStyle || 'square';
  var pixelBorder = options.pixelBorder || 'none';
  
  var image
    , canvas
    , context
    , imgData
    , getRGB
    , start
    , inc
    , wrapper
    , container;

  function setup () {
    // Output container
    wrapper = document.createElement('div');
    wrapper.className = 'image';
    container = document.getElementById(output);
    // Load image context
    canvas = document.createElement('canvas');
    loadImage();
  }

  function loadImage () {
    image = new Image;
    // On the image load, we're going to write our data to the canvas
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
      imgData = context.getImageData(0, 0, image.width, image.height).data;
      // Get image pixel data and build an array with it
      getRGB = function(i) { return [imgData[i], imgData[i + 1], imgData[i + 2]]; };
      // Iteration convenience shit
      start = Math.round(pixelDensity / 2);
      inc = Math.round(image.height / pixelDensity);
    }
    image.src = imagePath;
  }

  function clearOutput () {
    container.innerHTML = '';
  }

  function changeBlockSize (blockSize) {
    blocks = document.getElementsByClassName('block');
    for (var i = blocks.length - 1; i >= 0; i--) {
      block = blocks[i]
      block.style.width = blockSize;
      block.style.height = blockSize;
    };
  }

  function drawOutput () {
    // body...
  }

  function render () {
    for (var i = start, imax = image.height; i < imax; i += inc) {
      var row = document.createElement('div');
      row.className = 'row';
      for (var j = start, jmax = image.width; j < jmax; j += inc) {
        var colorValue = getRGB((i * (image.width * 4)) + (j * 4));
        var block = document.createElement('div');
        block.className = 'block';
        block.style.backgroundColor = 'rgb(' + (colorValue.join(',')) + ')';
        row.appendChild(block);
      }  
    }
    wrapper.appendChild(row);
    clearOutput();
    container.appendChild(wrapper);
  }

  // Expose the Pixelate.js API
  return {

    setup : function () {
      setup();
    },

    clearOutput : function () {
      clearOutput();
    },

    changeBlockSize : function (size) {
      changeBlockSize(size);
    },

    render : function () {
      render();
    }

  }

}