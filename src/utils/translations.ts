const unitTranslations: Record<string, string> = {
  kg: "কেজি",
  dozen: "ডজন",
  litre: "লিটার",
  piece: "পিস",
};

export function translateUnit(unit: string): string {
  return unitTranslations[unit] ?? unit;
}
