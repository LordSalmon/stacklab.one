import opengraph from "open-graph";

export function scrapeOpenGraph(url: string) {
    return new Promise((resolve, reject) => {
        opengraph(url, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}