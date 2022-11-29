export function getKeywordFromUrlByIndex(url: string, index: number) {
    return url.split('/')[index]
}