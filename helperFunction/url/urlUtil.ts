function getKeywordFromUrlByIndex(url: string, index: number) {
    return url.split('/')[index]
}

export function getSectionKeyFromUrl(url: string) {
    return {
        props: {sectionKey: getKeywordFromUrlByIndex(url, 1)}
    }
}