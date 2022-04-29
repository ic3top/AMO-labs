export function calcEquation(values) {
  const { b1, b2, b3, a12, a11, a22, a33, a23, a13, a21, a31, a32 } = values;
  let x1 = b1;
  let x2 = 0;
  let x3 = 0;
  for (let i = 0; i < 5; i++) {
    x1 = (b1 - x2 * a21 - x3 * a31) / a11;
    x2 = (b2 - x1 * a12 - x3 * a32) / a22;
    x3 = (b3 - x1 * a13 - x2 * a23) / a33;
  }
  return [x1, x2, x3];
}
