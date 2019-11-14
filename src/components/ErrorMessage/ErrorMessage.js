import React from 'react'
import styles from './ErrorMessage.module.css'

const ErrorMessage = ({children}) => {
    return (
        <div className={styles.errorMessage}>
            {children}
        </div>
    )
}

export default ErrorMessage