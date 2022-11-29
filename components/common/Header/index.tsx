import { languageCodes } from '@/data/language/data'
import { LanguageCode } from '@/data/language/type'
import { commonLocalText } from '@/data/localizationText/data'
import { sectionIds } from '@/data/section/data'
import { SectionId } from '@/data/section/type'
import { useLanguageStore } from '@/data/withMobx/Language/LanguageStoreProvider'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useEffect } from 'react'

const { Option } = Select;

import styles from './index.module.scss'

interface HeaderProps {
    sectionKey: string;
}

const headerContainerId = 'header-container';
const isUsinglanguageSelect = true;

const Header = ({ sectionKey }: HeaderProps) => {
    const languageDisplay = useLanguageStore()
    const headerText = languageDisplay.getLangText.Header;
    const selectLanguageHandle = (langCode: LanguageCode) => {
        languageDisplay.setLangCodeClient(langCode);
    }
    useEffect(() => {
        if (isUsinglanguageSelect) {
            languageDisplay.setLangCodeFromLocalStorage()
        }
    }, [])
    return <div id={headerContainerId} className={styles.headerContainer}>
        <div className={styles.itemsContainer}>
            <div></div>
            <div className={styles.toggleContainer}>
                {sectionIds.map(sectionId => {
                    let stringId: string = sectionId;
                    if (sectionId === SectionId.Arithmetic) {
                        stringId = '';
                    }
                    return <Link key={sectionId} className={styles.toggleLink} href={`/${stringId}`}>
                        <button className={`${sectionKey == stringId ? `${styles.selectedToggleButton} ` : ''}${styles.toggleButton}`}>
                            {headerText.toggleButton[sectionId]}
                        </button>
                    </Link>;
                })}
            </div>
            <div className={styles.languageContainer}>
                {isUsinglanguageSelect ? <Select className={styles.select} getPopupContainer={() => document.getElementById(headerContainerId) as HTMLElement} value={languageDisplay.getLangCode} style={{ width: 120 }} onChange={selectLanguageHandle}>
                    {languageCodes.map(key => <Option key={key} value={key}>{commonLocalText.language[key]}</Option>)}
                </Select> : null}
            </div>
        </div>
    </div>
}

export default observer(Header)