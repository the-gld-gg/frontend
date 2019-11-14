import React from 'react'
import styles from "./LayoutFormControl.module.css";

const LayoutFormControl = ({
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

export default LayoutFormControl