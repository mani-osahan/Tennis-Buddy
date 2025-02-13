import { SessionProvider } from "@/app/contexts/sessionContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
