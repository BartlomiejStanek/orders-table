import { Side } from "../enums/side";

export interface OrderSchema {
  openTime: number,
	openPrice: number,
	swap: number,
	closePrice: number,
	id: number,
	symbol: string,
	side: Side,
	size: number
}
