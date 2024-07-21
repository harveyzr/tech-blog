const { format_date, format_plural, format_url } = require('../utils/helpers');

// Test for format_date() to ensure it returns dates in MM/DD/YYYY format
test('format_date() returns a date string', () => {
    const date = new Date('2023-03-20 16:12:03');
    expect(format_date(date)).toBe('3/20/2023');
});

// Test for format_plural() to check pluralization of words
test('format_plural() returns a pluralized word', () => {
    expect(format_plural('tiger', 2)).toBe('tigers');
    expect(format_plural('lion', 1)).toBe('lion');
});

// Test for format_url() to verify URL shortening
test('format_url() returns a simplified url string', () => {
    expect(format_url('http://test.com/page/1')).toBe('test.com');
    expect(format_url('https://www.coolstuff.com/abcdefg/')).toBe('coolstuff.com');
    expect(format_url('https://www.google.com?q=hello')).toBe('google.com');
});
