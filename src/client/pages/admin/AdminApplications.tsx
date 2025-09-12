import ApplicationList from "@client/components/admin/ApplicationList";

const AdminApplications = () => {

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white text-slate-800">Administrace přihlášek</h1>

      <ApplicationList />
    </div>
  );
};

export default AdminApplications;
