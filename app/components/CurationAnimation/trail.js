export class Trail {
  constructor() {
    this.points = []; // { x, y, age }
    this.maxAge = 3600; // frames (~60s at 60fps — effectively permanent)
  }

  addPoint(x, y) {
    this.points.push({ x, y, age: 0 });
    if (this.points.length > 300) this.points.shift();
  }

  update() {
    for (let i = this.points.length - 1; i >= 0; i--) {
      this.points[i].age++;
      if (this.points[i].age > this.maxAge) this.points.splice(i, 1);
    }
  }

  draw(ctx, hexColor, config) {
    const { trailOpacity, trailBlobRadius } = config;
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    for (const pt of this.points) {
      const decay = 1 - pt.age / this.maxAge;
      const opacity = trailOpacity * decay;
      if (opacity < 0.002) continue;
      const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, trailBlobRadius);
      grad.addColorStop(0, `rgba(${r},${g},${b},${opacity})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, trailBlobRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  clear() {
    this.points = [];
  }
}
