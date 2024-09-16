import React, { useEffect } from "react";
import AdminMenu from "../components/admin/AdminMenu";

const PublicLayout = ({ children }: { children: any }) => {
    
        console.log('AdminLayout');
    
    return (
        <div className="flex">
            <AdminMenu />
            <div className="admin-main px-4 relative z-10 w-full">
                {children}
            </div>
        </div>
    );
};

export default PublicLayout;    