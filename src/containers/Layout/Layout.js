import React from 'react'

const Layout = ({
    children,
}) => {
    return (
        <div>
            <div>
                Header
            </div>
            {children}
        </div>
    )
}

export default Layout