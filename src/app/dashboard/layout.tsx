import DashboardNavbar from "../ui/dashboard/dashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardNavbar />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div>{children}</div>
      </div>
    </div>
  );
}
