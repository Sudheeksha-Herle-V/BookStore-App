import React, { useState } from 'react'
import Sidebar from './Sidebar';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>

            <button
                className="btn btn-ghost lg:hidden "
                onClick={() => setIsOpen(true)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        </>
    )
}

export default Header