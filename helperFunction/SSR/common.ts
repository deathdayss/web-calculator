import { LanguageCode } from "@/data/language/type";
import { IncomingMessage } from "http";
import { GetServerSidePropsContext } from "next";
import { findLanguageCodeByCountryCode } from "../language/common";
import { getKeywordFromUrlByIndex } from "../url/urlUtil";

const geoip = require('geoip-lite');

function getLangCode(props: any, req: IncomingMessage) {
    let ip = req.headers['x-forwarded-for'] ?? req.connection.remoteAddress
    const geo = geoip.lookup(ip)
    let langCode = LanguageCode.English
    if (geo && geo.country) {
        langCode = findLanguageCodeByCountryCode(geo.country)
    }
    props.languageInitData = { langCode }
}

function getSectionKeyFromUrl(props: any, url: string) {
    props.sectionKey = getKeywordFromUrlByIndex(url, 1)
}

export default function commonDataFetch({ req, resolvedUrl }: GetServerSidePropsContext, props = {}) {
    getLangCode(props, req)
    getSectionKeyFromUrl(props, resolvedUrl)
    return { props };
}