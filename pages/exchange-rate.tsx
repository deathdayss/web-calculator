import Header from "@/components/common/Header";
import { getSectionKeyFromUrl } from "@/helperFunction/url/urlUtil";
import { GetServerSideProps } from "next";


export default function ExchangeRate({ sectionKey }: any) {
    return <div>
        <Header sectionKey={sectionKey}/>
        <main>

        </main>

        <footer>
        </footer>
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return getSectionKeyFromUrl(context.resolvedUrl)
}