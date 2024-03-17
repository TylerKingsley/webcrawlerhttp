function printReport(pages) {
    console.log("======================================================================")
    console.log("                                REPORT                                ")
    console.log("======================================================================")
    const sortedPages = sortPage(pages)
    sortedPages.forEach(page => {
        console.log(` -> Found ${page[1]} links to: ${page[0]}`)
    })
}

function sortPage(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        return b[1] - a[1]
    })
    return pagesArr
}

module.exports = { 
    sortPage,
    printReport
}