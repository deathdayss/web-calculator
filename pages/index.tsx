import ArithmeticMain from '@/components/ArithmeticMain'
import SectionPage from '@/components/common/SectionPage'
import { getSectionKeyFromUrl } from '@/helperFunction/url/urlUtil'
import { GetServerSideProps } from 'next'

export default function Home({ sectionKey }: any) {
  return <SectionPage sectionKey={sectionKey}><ArithmeticMain /></SectionPage>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getSectionKeyFromUrl(context.resolvedUrl)
}