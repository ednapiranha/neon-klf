// modified version from: http://thecodeplayer.com/walkthrough/3d-perspective-projection-canvas-javascript

(function () {
  var canvas = document.querySelector('#canvas');
  var canvas2 = document.querySelector('#canvas2');
  var body = document.body;
  var ctxWidth = canvas.width = canvas2.width = window.innerWidth;
  var ctxHeight = canvas.height = canvas2.height = window.innerHeight;
  var fov = 150;
  var ctx = canvas.getContext('2d');
  var ctx2 = canvas2.getContext('2d');
  var start = window.mozAnimationStartTime || new Date().getTime();
  var cached = {};
  var pixels = [];

  function generate() {
    var max = 150;

    for (var x = -max; x < max; x += 25) {
      for (var z = -max; z < max; z += 10) {
        pixels.push(
          {
            x: max,
            y: x,
            z: z
          },
          {
            x: -max,
            y: x,
            z: z
          });
      }
    }

     for (var x = -max; x < max; x += 50) {
      for (var z = -max * 2; z < max; z += 5) {
        pixels.push(
          {
            x: x,
            y: max,
            z: z
          },
          {
            x: x,
            y: -max,
            z: z
          });
      }
    }
  }

  var currXView = 2;

  function render() {
    var i = pixels.length;

    if (currXView % 20 === 0) {
      ctx.clearRect(0, 0, ctxWidth, ctxHeight);
    }

    while (i--) {
      var pixel = pixels[i];
      //calculating 2d position for 3d coordinates
      //fov = field of view = denotes how far the pixels are from us.
      //the scale will control how the spacing between the pixels will decrease with increasing distance from us.
      var scale = fov / (fov + pixel.z);
      var xView = Math.floor(Math.random() * 200 + 1);
      if (i % 100 === 0) {
        currXView = xView;
      }
      var x2d = pixel.x * scale + ctxWidth / currXView;
      var y2d = pixel.y * scale + ctxHeight / currXView;

      //marking the points only if they are inside the screen
      if (x2d >= 0 && x2d <= ctxWidth && y2d >= 0 && y2d <= ctxHeight) {
        var shapeType = Math.floor(Math.random() * 2 + 1);

        if (!cached[x2d + '-' + y2d + '-' + shapeType]) {
          var rad;

          rad = ctx.createRadialGradient(x2d + 5, y2d + 5,  10, x2d + 40, y2d + 40, 50);
          rad.addColorStop(0.4, 'rgba(255, 55, 215, 0.1)');
          var red = Math.floor(Math.random() * 155 + 10);
          var green = Math.floor(Math.random() * 155 + 50);
          var blue = Math.floor(Math.random() * 155 + 100);

          rad.addColorStop(0.2, 'rgba(' + red + ', ' + green + ', ' + blue + ', 0.7)');
          cached[x2d + '-' + y2d + '-' + shapeType] = rad;
        }

        ctx.fillStyle = cached[x2d + '-' + y2d + '-' + shapeType];

        if (shapeType === 1) {
          ctx.fillRect(x2d, y2d, 10, 150);
        } else {
          ctx.fillRect(x2d, y2d, 10, 100);
        }

      // ctx.rotate(1);

      }

      pixel.z -= 2;

      if (pixel.z < -fov) {
        pixel.z += 5 * fov;
      }
    }

    setTimeout(function () {
      requestAnimationFrame(render);
    }, 1000 / 160);
  }

  function render2() {
    ctx2.clearRect(0, 0, ctxWidth, ctxHeight);
    var i = pixels.length;

    while (i--) {
      var pixel = pixels[i];
      var scale = fov / (fov + pixel.z);
      var x2d = pixel.x * scale + ctxWidth / 2;
      var y2d = pixel.y * scale + ctxHeight / 2;

      //marking the points only if they are inside the screen
      if (x2d >= 0 && x2d <= ctxWidth && y2d >= 0 && y2d <= ctxHeight) {
        var shapeType = Math.floor(Math.random() * 2 + 1);

        var blue = Math.floor(Math.random() * 255 + 150);

        ctx2.fillStyle = 'rgba(0, 155, ' + blue + ', 0.7)';

        if (shapeType === 1) {
          ctx2.fillRect(x2d, y2d, 10, 10);
        } else {
          ctx2.fillRect(x2d, y2d, 10, 50);
        }

      // ctx.rotate(1);

      }

      pixel.z -= 1;

      if (pixel.z < -fov) {
        pixel.z += 5 * fov;
      }
    }

    setTimeout(function () {
      requestAnimationFrame(render2);
    }, 1000 / 160);
  }

  generate(start);
  render();
  render2();
/*
  setInterval(function () {
    switchLayout = !switchLayout;

    if (switchLayout) {
      body.classList.add('switch')
    } else {
      body.classList.remove('switch');
    }

  }, 6000);
*/
})();