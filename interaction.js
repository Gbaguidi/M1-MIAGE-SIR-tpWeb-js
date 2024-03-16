
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
  this.initX = canvas?.[0] ?? 0;
  this.initY = canvas?.[1] ?? 0;
  this.finalX = canvas?.[2] ?? 0;
  this.finalY = canvas?.[3] ?? 0;
  this.mouseIsDown = false;
  this.clicMouse = function handleMouseDown(event) {
    var pos = getMousePosition(canvas, event)
    this.initX = pos.x
    this.initY = pos.y
    this.mouseIsDown = true
    interactor.onInteractionStart(this);
  }.bind(this)
  this.moveMouse = function handleMouseMove(event) {
    if (this.mouseIsDown) {
      var pos = getMousePosition(canvas, event)
      this.finalX = pos.x
      this.finalY = pos.y
      interactor.onInteractionUpdate(this);
    }
  }.bind(this)
  this.releaseMouse = function handleMouseUp(event) {
    var pos = getMousePosition(canvas, event)
    this.finalX = pos.x
    this.finalY = pos.y
    interactor.onInteractionEnd(this);
    this.mouseIsDown = false
  }.bind(this)


  canvas.addEventListener('mousedown', this.clicMouse, false);
  canvas.addEventListener('mousemove', this.moveMouse, false);
  canvas.addEventListener('mouseup', this.releaseMouse, false);


  return this;
};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



