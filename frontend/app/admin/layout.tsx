import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: 'Aakara Admin',
    description: 'AAKARA Admin Dashboard',
}


const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div>
            <AdminNav />
            {children}
        </div>
     );
}
 
export default AdminLayout;