const ONE_DIGIT_NUMBERS = [1, 2, 3, 4,5,6,7,8,9] as const;
type OneDigitNumber = typeof ONE_DIGIT_NUMBERS[number];
export const utils = {
    methods: {
        createTextForValue(value: number) {
            if (value < 10) {
                return this.createTextForOneDigitValue(value as OneDigitNumber);
            } else if (value === 10) {
                return 'tíz';
            } else if (value < 20) {
                return 'T.' + this.createTextForOneDigitValue(value - 10 as OneDigitNumber);
            } else if (value === 20) {
                return 'húsz';
            } else if (value  === 21) {
                return 'blackjack'
            }
        },
        createTextForOneDigitValue(value: OneDigitNumber) {
            switch (value) {
                case 1:
                    return 'egy';
                case 2:
                    return 'kettő';
                case 3:
                    return 'három';
                case 4:
                    return 'négy';
                case 5:
                    return 'öt';
                case 6:
                    return 'hat';
                case 7:
                    return 'hét';
                case 8:
                    return 'nyolc';
                case 9:
                    return 'kilenc';
            }
        }
    }
}
