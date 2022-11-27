import ArithmeticMain from '@/components/ArithmeticMain'
import Footer from '../Footer'
import Header from '../Header'
import SectionMain from '../SectionMain'
import styles from './index.module.scss'

interface SectionPageProps {
    sectionKey: string,
    children: React.ReactNode
}

export default function SectionPage({ sectionKey, children }: SectionPageProps) {
    return <div className={styles.sectionBody}>
        <Header sectionKey={sectionKey} />
        <SectionMain>
            {children}
        </SectionMain>

        <Footer />
    </div>
}