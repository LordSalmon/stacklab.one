import opengraphScraper from "open-graph-scraper";

export function scrapeOpenGraph(url: string) {
    return new Promise((resolve, reject) => {
        opengraphScraper({
            url,
        }).then(res => {
            if (res.error) {
                reject(res.result);
            }
            resolve(res.result);
        }).catch(err => {
            reject(err);
        })
    });
}