// export interface IProduct {
//   id: number;
//   slug: string;
//   nameBn: string;
//   unit: string;
//   image: string;
//   today: number;
//   change: ProductChange;
// }
interface ProductChange {
  dir: "up" | "down" | "flat";
  pct: number;
}
// interface Change {
//   dir: string;
//   pct: number;
// }
export interface IProduct {
  id: number
  slug: string
  nameBn: string
  category: string
  categoryNameBn: string
  categoryIcon: string
  unit: string
  image: string
  today: number
  yesterday: number
  lastWeek: number
  lastMonth: number
  change: ProductChange
  markets: Market[]
}

// export interface Change {
//   dir: string
//   pct: number
// }

export interface Market {
  market: string
  division: string
  min: number
  max: number
}
