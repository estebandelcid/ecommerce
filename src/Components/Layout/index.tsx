import React from "react"

interface LayoutProps {
    children:React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return(
        <div className="flex flex-col mt-20 items-center">
            {children}
        </div>
    )
}

export default Layout