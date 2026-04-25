import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/sidebar/theme-provider";
import { ViewModeProvider } from "@/components/providers/view-mode-provider";
import MobileMenu from "@/components/map/mobile-menu";
import { MapSearchProvider } from "@/components/providers/map-search-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Halal Eats",
  description:
    "Discover the best halal restaurants near you with Halal Eats. Explore menus, read reviews, and find your next delicious meal today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <ViewModeProvider>
              <MapSearchProvider>
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
                <MobileMenu />
              </MapSearchProvider>
            </ViewModeProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
