import Header from "@/components/common/Header";
import commonDataFetch from "@/helperFunction/SSR/common";
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
    return commonDataFetch(context)
}