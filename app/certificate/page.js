// This is now a Server Component
import { Suspense } from "react";
import CertificateGenerator from "./CertificateGenerator"; // Import the new client component
import { Loader2 } from "lucide-react"; // Import the loader icon

export default function CertificatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <Loader2 className="animate-spin h-8 w-8 text-white" />
        </div>
      }
    >
      <CertificateGenerator />
    </Suspense>
  );
}