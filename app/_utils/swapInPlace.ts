export default function swapInPlace(arr: unknown[], i1: number, i2: number) {
  const tmp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = tmp;
}
