const { normalizedURL, getURLSfromHTML } = require('./crawl.js')
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

test('getURLSfromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="https://blog.boot.dev">
            Boot.dev Blog
        </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLSfromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLSfromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLSfromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLSfromHTML invalid link', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="invalid">
            Boot.dev Blog
        </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLSfromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})

test('getURLSfromHTML multiple (relative & absolute)', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog
        </a>
        <a href="https://blog.boot.dev">
            Boot.dev Blog
        </a>
        <a href="/path3/">
            Boot.dev Blog
        </a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLSfromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/', 'https://blog.boot.dev/path1/', 'https://blog.boot.dev/', 'https://blog.boot.dev/path3/']
    expect(actual).toEqual(expected)
})

test('getURLSfromHTML multiple (relative, absolute & invalid)', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>    
        <a href="invalid">
            Boot.dev Blog
        </a>    
        <a href="https://blog.boot.dev">
            Boot.dev Blog
        </a>    
        <a href="/path3/">
            Boot.dev Blog
        </a>    
        </body>
    </html>    
    `
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLSfromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path/', 'https://blog.boot.dev/', 'https://blog.boot.dev/path3/']
    expect(actual).toEqual(expected)
})    

