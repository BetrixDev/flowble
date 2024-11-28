import TopNav from "@/components/top-nav";
import { Suspense } from "react";

export const experimental_ppr = true;

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col justify-center">
      <Suspense>
        <TopNav />
      </Suspense>
      <div className="text-xl grow flex items-center justify-center">Page not found</div>
    </main>
  );
}
