type Point = { x: number; y: number };

export function snapToPoints(points: Point[], p: Point, threshold = 12): Point {
  let best = p;
  let min = threshold;

  for (const pt of points) {
    const dx = pt.x - p.x;
    const dy = pt.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < min) {
      best = pt;
      min = dist;
    }
  }

  return best;
}
