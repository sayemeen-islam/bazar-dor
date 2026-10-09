export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: ProductChange;
}
interface ProductChange {
  dir: "up" | "down" | "flat";
  pct: number;
}
// interface Change {
//   dir: string;
//   pct: number;
// }