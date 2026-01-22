import AddTemplateForm from "./add-template-form";

export default async function AdminDashboard() {
  return (
    <div className="h-screen w-full">
      <div className="p-4 space-y-4 px-28">
        <h2 className="text-xl">Dashboard</h2>
        <h3>Add New Template</h3>
        <AddTemplateForm />
      </div>
    </div>
  );
}
