import ArithmeticMain from '@/components/ArithmeticMain';
import SectionPage from '@/components/common/SectionPage';
import commonDataFetch from '@/helperFunction/SSR/common';
import { GetServerSideProps } from 'next';

export default function Home({ sectionKey }: any) {
  return <SectionPage sectionKey={sectionKey}><ArithmeticMain /></SectionPage>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return commonDataFetch(context)
}