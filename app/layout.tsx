import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { AuthProvider } from "@/features/auth/hooks/useAuth";
import { AuthUser } from "@/features/auth/types/auth.type";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Oxanium } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";
import "./globals.css";

const oxaniumHeading = Oxanium({ subsets: ['latin'], variable: '--font-heading' });

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "GearUp Sports Gear Rental Platform",
  description: "Welcome to the backend engine of GearUp, a high-performance, secure, and production-ready Sports Gear Rental platform",
};

//* Get Display Name of User
function getDisplayName(decoded: Partial<AuthUser>) {
  return decoded.name || decoded.email || decoded.role || "Member";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Initial User
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let initialUser: AuthUser | null = null;

  if (accessToken) {
    try {
      const decoded = jwtDecode<Partial<AuthUser>>(accessToken);

      if (decoded.role) {
        initialUser = {
          id: decoded.id,
          name: getDisplayName(decoded),
          email: decoded.email,
          role: decoded.role,
        };
      }
    } catch {
      initialUser = null;
    }
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", outfit.variable, oxaniumHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AuthProvider initialUser={initialUser}>
            <Toaster position="top-right" richColors />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
