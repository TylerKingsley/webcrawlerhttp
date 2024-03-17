const { crawlPage } = require("./crawl")

async function main() {
    if (process.argv.length < 3){
        console.error('no website provided')
        process.exit(1)
    } else if  (process.argv.length > 3) {
        console.log("too many command line arguments")
        process.exit(1) 
    }
    const baseURL = process.argv[2]

    console.log("Start crawling...")
    console.log(`Base URL: ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})

    for (const page in pages){
        console.log(` - PAGE: ${page}\n - OCCURENCES: ${pages[page]}`)
    }
}

main()