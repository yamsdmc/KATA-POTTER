import {describe, test, expect} from "vitest";
import { Basket } from "./Basket";
import {Book} from "./Book";

export const BOOK_1: Book = new Book('Harry potter le grand maître')
export const BOOK_2: Book = new Book('Harry potter la chambre des secrets')
export const BOOK_3: Book = new Book('Harry potter le prison')
export const BOOK_4: Book = new Book('Harry potter la coupe de feu')
export const BOOK_5: Book = new Book('Harry potter l\'ordre du phénix')
export const EmptyShoppingCard: Book[] = []

describe("Kata potter", () => {
    test("the amount cart must be 0€ when it empty", () => {
        const basket = new Basket(EmptyShoppingCard);
        expect(basket.calculatePrice()).to.equal(0);
    })
    test('the amount cart must be 8€ when it contain one book', () => {
        const basket = new Basket([BOOK_1]);
        expect(basket.calculatePrice()).to.equal(8);
    })
    test('the cart should not apply discounts for multiple copies of the same book', () => {
        const basket = new Basket([BOOK_1, BOOK_1]);
        expect(basket.calculatePrice()).toEqual(16);
    })
    test('the cart must be discounted by 5% when it contains 2 different books', () => {
        const basket = new Basket([BOOK_1, BOOK_2]);
        expect(basket.calculatePrice()).toEqual(15.2);
    })
    test('The cart must be discounted by 10% when it contains 3 different books.', () => {
        const basket = new Basket([BOOK_4, BOOK_2, BOOK_1]);
        expect(basket.calculatePrice()).toEqual(21.6);
    })
    test('The cart must be discounted by 20% when it contains 4 different books.', () => {
        const basket = new Basket([BOOK_4, BOOK_2, BOOK_1, BOOK_3]);
        expect(basket.calculatePrice()).toEqual(25.6);
    })
    test('The cart must be discounted by 25% when it contains 5 different books', () => {
        const basket = new Basket([BOOK_4, BOOK_2, BOOK_1, BOOK_3, BOOK_5]);
        expect(basket.calculatePrice()).toEqual(30);
    })
    test('The amount cart must be 23.2€ when it contains 1 pair of 2 different and 1 book same with pair', () => {
        const basket = new Basket([BOOK_1, BOOK_1, BOOK_3]);
        expect(basket.calculatePrice()).toEqual(23.2);
    })
})
