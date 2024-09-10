import { CardType } from ".";

export interface CardValidation {
    type: CardType;
    patterns: number[];
    mask: any;
    format: RegExp;
    length: number[];
    cvvLength: number[];
    luhn: boolean;
}
