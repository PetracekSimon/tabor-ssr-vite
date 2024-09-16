import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const PublicLayout = ({ children }: { children: any }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default PublicLayout;    