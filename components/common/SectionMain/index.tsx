import React from "react"
import styles from './index.module.scss'


interface SectionMainProps {
    children: React.ReactNode
}

export default function SectionMain({ children }: SectionMainProps) {
    return <main className={styles.sectionMain}>
        {children}
    </main>
}