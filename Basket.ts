import {Book} from "./Book";

const FIVE_PERCENT_COEFFICIENT = 0.95;
const TEN_PERCENT_COEFFICIENT = 0.90;
const TWENTY_PERCENT_COEFFICIENT = 0.80;
const TWENTY_FIVE_PERCENT_COEFFICIENT = 0.75;
const STANDARD_PRICE = 8;

export class Basket {
    private readonly books: Book[]

    constructor(books: Book[] = []) {
        this.books = books;
    }

    calculatePrice(): any {
        const groups = this.findOptimalDiscount();

        return groups.reduce(this.calculateGroupPrice.bind(this), 0);
    }

    private calculateGroupPrice(total: number, group: Book[]): number {
        const discount = this.getDiscount(group.length);
        return total + (group.length * STANDARD_PRICE * discount);
    }

    private findOptimalDiscount(): Book[][] {
        const groups: Book[][] = [];
        const books = [...this.books];

        while (books.length > 0) {
            const currentGroup = new Set<Book>();
            const lastIndex = books.length - 1;

            for (let i = lastIndex; i >= 0; i--) {
                const currentBook = books[i]
                if (!currentGroup.has(currentBook)) {
                    currentGroup.add(currentBook);
                    books.splice(i, 1);
                }
            }
            groups.push([...currentGroup]);
        }
        return groups
    }


    private getDiscount(uniqueBookNumber: number) {
        const discount: Record<number, number> = {
            2: FIVE_PERCENT_COEFFICIENT,
            3: TEN_PERCENT_COEFFICIENT,
            4: TWENTY_PERCENT_COEFFICIENT,
            5: TWENTY_FIVE_PERCENT_COEFFICIENT
        }
        const NO_DISCOUNT = 1;
        return discount[uniqueBookNumber] || NO_DISCOUNT
    }
}