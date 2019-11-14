import React from 'react'
import styles from "./LayoutAuth.module.css";

const LayoutAuth = ({
    children,
}) => {
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

export default LayoutAuth