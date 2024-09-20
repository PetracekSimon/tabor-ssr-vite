import { PropsWithChildren } from "react";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const PublicLayout = ({children}: PropsWithChildren) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default PublicLayout;    