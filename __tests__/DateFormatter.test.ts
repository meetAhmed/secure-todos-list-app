import DateFormatter from '../src/common/utils/DateFormatter';

describe('DateFormatter', () => {
    // Test Valid Date
    it('should format a valid date correctly', () => {
        // expected date: July 20, 2025 (month is 0 indexed, so 6 = July)
        const input = new Date('2025-07-20');
        const expected = 'Sun, 20 July 2025';

        // expectation: formatted output date must be equal to given date
        expect(DateFormatter.formatDate(input)).toBe(expected);
    });


    // Test Invalid Date
    it('should return "Invalid Date" for null input', () => {
        // formatDate should return 'Invalid Date'
        expect(DateFormatter.formatDate(null as any)).toBe('Invalid Date');
    });

    // Test Invalid Date
    it('should return "Invalid Date" for an invalid Date object', () => {
        // invalid date obj
        const invalidDate = new Date('invalidDate');

        // calling formatDate
        const result = DateFormatter.formatDate(invalidDate);

        // expectation: formatDate should not return any date
        expect(result).toBe('Invalid Date');
    });
});
