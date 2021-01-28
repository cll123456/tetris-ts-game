/**
 * 获取指定范围的随机数，取不到最大值
 * @param min {Number} 最小值
 * @param max {Number} 最大值
 */
export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}