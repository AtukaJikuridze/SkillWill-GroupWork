export default function timeStringToDecimal(timeStr: string) {
  const [h, m] = timeStr.split(":").map(Number);
  return Math.round((h + m / 60) * 10) / 10;
}
