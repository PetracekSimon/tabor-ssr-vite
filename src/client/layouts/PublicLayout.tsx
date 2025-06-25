import { PropsWithChildren } from "react";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const PublicLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="mb-8">
            {children}
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;    