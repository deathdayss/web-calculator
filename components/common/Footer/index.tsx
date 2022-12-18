import { useLanguageStore } from '@/data/withMobx/Language/LanguageStoreProvider'
import { observer } from 'mobx-react-lite'
import styles from './index.module.scss'

const projectLink = 'https://github.com/deathdayss/web-calculator'

const Footer = () => {
    const { devLinkLabel } = useLanguageStore().getLangText.footer
    return <footer className={styles.footer}>
        <a href={projectLink}>{devLinkLabel}</a>
    </footer>
}

export default observer(Footer)