import React from 'react'
import styles from "./Layout.module.css";

const Layout = ({
    children,
}) => {
    return (
        <div className={styles.layout}>
            {/* Header */}
            <div className={styles.components}>
                {children}
            </div>
        </div>
    )
}

export default Layout