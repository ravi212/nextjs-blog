import { Inter, Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import { auth } from "@/config/auth";
import AuthGuard from "@/components/guards/AuthGuard";
const AdLayout = dynamic(() => import ("@/components/molecules/admin/layout"), {ssr: false}) ;

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default async function Template({ children }: { children: React.ReactNode }) {

  return (
    <main className={`${inter.className} ${poppins.className} flex flex-col min-h-screenp bg-background`}>
          <AuthGuard>
            <AdLayout>
              {children}
            </AdLayout>
          </AuthGuard>
    </main>
  );
}
