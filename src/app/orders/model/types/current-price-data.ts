import { CurrentPrice } from "./current-price";

export interface CurrentPriceData {
  p: string,
  d: CurrentPrice[] | string[]
}
