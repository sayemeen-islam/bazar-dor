export function toBanglaNumber(value: number | string): string {
  const banglaDigits = "০১২৩৪৫৬৭৮৯";

  return value.toString().replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
}