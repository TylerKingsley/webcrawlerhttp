const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) { 
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.host !== currentURLObj.host) {
        return pages
    }

    const normalizedCurrentURL = normalizedURL(currentURL)
    if (pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1
    console.log(`Actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)

        if (resp.status > 399) {
            console.log(`Error fetching ${currentURL}: ${resp.status}`)
            return pages
        } 

        const contentType  = resp.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Ignoring ${currentURL} due to content type: ${contentType}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextURLs = getURLSfromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (err) {
        console.log(`Error fetching ${currentURL}: ${err.message}`)
    }
    return pages
}

function getURLSfromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    dom.window.document.querySelectorAll('a').forEach(linkElement => {
        if (linkElement.href.slice(0, 1) == '/'){
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.error(`Error with relative url: ${err.message}`)
            }
        } else{
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`Error with absolute url: ${err.message}`)
            }
        }
    })
    return urls
}

function normalizedURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizedURL,
    getURLSfromHTML,
    crawlPage
}