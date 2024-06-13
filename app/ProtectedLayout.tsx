'use client'

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedLayoutProps {
    children: ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
    const router = useRouter();
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        if (!auth) {
            router.replace('/login');
        }
    }, [router]);

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedLayout;
