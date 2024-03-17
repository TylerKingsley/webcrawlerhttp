const { normalizedURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizedURL strip protocal', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizedURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizedURL strip tralining slash', () => {
    const input = 'https://blog.Boot.dev/path/'
    const actual = normalizedURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizedURL capitals', () => {
    const input = 'https://BLOG.Boot.Dev/path'
    const actual = normalizedURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})