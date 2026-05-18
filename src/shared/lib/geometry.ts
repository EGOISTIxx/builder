type Point = {
  x: number
  y: number
}

export function lockAngle(
  start: Point,
  end: Point,
  step = 45
): Point {
  const dx = end.x - start.x
  const dy = end.y - start.y

  // длина линии
  const distance = Math.sqrt(dx * dx + dy * dy)

  // угол в радианах
  const angle = Math.atan2(dy, dx)

  // шаг угла
  const snap = (Math.PI / 180) * step

  // округляем угол
  const snappedAngle = Math.round(angle / snap) * snap

  return {
    x: start.x + Math.cos(snappedAngle) * distance,
    y: start.y + Math.sin(snappedAngle) * distance,
  }
}