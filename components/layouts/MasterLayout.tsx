import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";
interface IMaster {
    children: any;
}
export default function MasterLayout({ children }:IMaster) {
    const [initialRenderComplete, setInitialRenderComplete] = useState(false);

    useEffect(() => {
        setInitialRenderComplete(true);
    }, []);

    if (!initialRenderComplete) {
        return null;
    } else {
        const date = new Date();
        return (
            <>
                {
                    typeof window !== 'undefined' &&
                    <>
                        {children}

                        <ToastContainer />
                    </>
                }
            </>
        );
    }
}