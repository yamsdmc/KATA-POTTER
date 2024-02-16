import { Book } from "./Book";

const FIVE_PERCENT_COEFFICIENT = 0.95;
const TEN_PERCENT_COEFFICIENT = 0.90;
const TWENTY_PERCENT_COEFFICIENT = 0.80;
const TWENTY_FIVE_PERCENT_COEFFICIENT = 0.75;
const STANDARD_PRICE = 8;

export class Basket {
    private books: Book[]
    private readonly discount: Record<number, number> = {
        2: FIVE_PERCENT_COEFFICIENT,
        3: TEN_PERCENT_COEFFICIENT,
        4: TWENTY_PERCENT_COEFFICIENT,
        5: TWENTY_FIVE_PERCENT_COEFFICIENT
    }

    constructor(books: Book[] = []) {
        this.books = books;
    }

    calculatePrice(): any {
        const uniqueBookNumber = this.getUniqueBookCount();
        const discount = this.getDiscount(uniqueBookNumber);
        return this.books.length * STANDARD_PRICE * discount;
    }

    private getDiscount(uniqueBookNumber: number) {
        const NO_DISCOUNT = 1;
        return this.discount[uniqueBookNumber] || NO_DISCOUNT
    }
    private getUniqueBookCount(): number {
        return new Set(this.books.map((book: Book) => book)).size;
    }
}