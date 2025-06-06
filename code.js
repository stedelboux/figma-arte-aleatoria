const colors = [
  { r: 1, g: 0.4, b: 0.3 },
  { r: 0.3, g: 0.8, b: 1 },
  { r: 0.9, g: 0.8, b: 0.2 },
  { r: 0.4, g: 0.3, b: 1 },
  { r: 0.5, g: 1, b: 0.6 }
];

function getRandom(min, max) {
  return min + Math.random() * (max - min);
}

function createRandomShape() {
  const shapeType = Math.random() > 0.5 ? 'RECTANGLE' : 'ELLIPSE';
  const shape = shapeType === 'RECTANGLE' ? figma.createRectangle() : figma.createEllipse();
  
  const size = getRandom(50, 200);
  shape.resize(size, size);
  
  shape.x = getRandom(0, figma.viewport.bounds.width - size);
  shape.y = getRandom(0, figma.viewport.bounds.height - size);

  shape.fills = [{
    type: 'SOLID',
    color: colors[Math.floor(Math.random() * colors.length)]
  }];

  figma.currentPage.appendChild(shape);
}

// Mostrar interface
figma.showUI(__html__);

// Esperar mensagem da UI
figma.ui.onmessage = (msg) => {
  if (msg.type === "generate") {
    figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(() => {
      for (let i = 0; i < msg.count; i++) {
        createRandomShape();
      }
      figma.closePlugin(`🎨 Gerado com ${msg.count} formas`);
    });
  }
};
