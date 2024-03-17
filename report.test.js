const { sortPage} = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/contact': 4
    }
    const actual = sortPage(input)
    const expected = [
        ['https://wagslane.dev/contact', 4],
        ['https://wagslane.dev', 3],
    ]
})

test('sortPages 5 pages', () => {
    const input = {
        'https://wagslane.dev': 3,
        'https://wagslane.dev/contact': 4,
        'https://wagslane.dev/about': 1,
        'https://wagslane.dev/blog': 2,
        'https://wagslane.dev/projects': 5
    }
    const actual = sortPage(input)
    const expected = [
        ['https://wagslane.dev/projects', 5],
        ['https://wagslane.dev/contact', 4],
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/blog', 2],
        ['https://wagslane.dev/about', 1]
    ]
    expect(actual).toEqual(expected)
})

