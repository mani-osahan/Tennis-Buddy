import DashboardNavbar from "../ui/dashboard/dashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashboardNavbar />
      <div className="absolute h-full top-0   ">
        <div>{children}</div>
      </div>
    </div>
  );
}
