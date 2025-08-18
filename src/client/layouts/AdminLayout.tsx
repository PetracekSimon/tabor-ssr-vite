import { PropsWithChildren } from "react";
import AdminMenu from "../components/admin/AdminMenu";

const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex">
            <AdminMenu />
            <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
                <div className="w-[108rem] flex-none flex justify-end">
                    <picture>
                        <source srcSet="/assets/docs@30.8b9a76a2.avif" type="image/avif" />
                        <img src="/assets/docs@tinypng.d9e4dcdc.png" alt="" className="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async" />
                    </picture>
                    <picture>
                        <source srcSet="/assets/docs-dark@30.1a9f8cbf.avif" type="image/avif" />
                        <img src="/assets/docs-dark@tinypng.1bbe175e.png" alt="" className="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async" />
                    </picture>
                </div>
            </div>
            <div className="admin-main px-4 relative z-10 w-full dark:bg-slate-900 duration-100 bg-primary">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;    