// This file will contain all the logic and state from your original component
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation"; // This hook is now here
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import MotionDiv from "@/components/ui/MotionDiv";
import { useToast } from "@/components/ui/use-toast";
import { Download, FileText, Copy, Loader2, Check, Linkedin } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// Workshops list
const WORKSHOPS = [
  "AI for Entrepreneurs",
  "Startup Sprint: Idea to Pitch",
  "Build With AI: No-Code MVP",
];

// Small reusable certificate component (1100 x 780)
function CertificateContent({ name, workshop, date, certificateNumber, nameFontSize }) {
  return (
    <div
      className="relative font-sans flex flex-col items-center justify-center"
      style={{
        width: 1100,
        height: 780,
        backgroundColor: "#fdfcf7",
        border: "12px solid #eab308",
        borderRadius: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      {/* Header */}
      <div style={{ position: "absolute", top: 48, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111827", letterSpacing: 0.4 }}>
          Certificate of Achievement
        </h1>
        <div style={{ width: 160, height: 4, backgroundColor: "#eab308", margin: "10px auto 0" }} />
        <p style={{ marginTop: 10, color: "#374151", fontSize: 16 }}>Presented by TeenSkool</p>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 64px", textAlign: "center" }}>
        <div>
          <p style={{ color: "#4b5563", fontSize: 18, marginBottom: 18 }}>This is proudly presented to</p>

          <h2 style={{ fontSize: nameFontSize, lineHeight: 1.05, margin: "6px 0", fontWeight: 800, color: "#111827" }}>
            {name || "Student Name"}
          </h2>

          <p style={{ color: "#4b5563", fontSize: 18, marginTop: 22, maxWidth: 900 }}>
            For successfully completing the{" "}
            <strong style={{ color: "#111827" }}>{workshop}</strong> and demonstrating outstanding commitment to learning and growth.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: 40, width: "100%", padding: "0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, color: "#374151" }}>
        <div>
          <div style={{ fontWeight: 700, color: "#111827" }}>Instructor</div>
          <div>TeenSkool Team</div>
        </div>

        <div style={{ textAlign: "center", color: "#6b7280" }}>
          Certificate Number: {certificateNumber}
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700, color: "#111827" }}>Date</div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
}

export default function CertificateGenerator() {
  const router = useRouter();
  const toast = useToast?.() || { toast: () => { } };
  const searchParams = useSearchParams();

  const certRef = useRef(null);
  const previewWrapperRef = useRef(null);

  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [name, setName] = useState(() => searchParams.get("name") || "");
  const [workshop, setWorkshop] = useState(() => searchParams.get("workshop") || WORKSHOPS[0]);
  const [date, setDate] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [scale, setScale] = useState(1);
  const nameFontSize = useMemo(() => {
    const len = (name || "").length;
    if (len <= 14) return 56;
    if (len <= 22) return 48;
    if (len <= 30) return 40;
    return 34;
  }, [name]);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const userFromSupabase = data?.user ?? null;
        if (!userFromSupabase) {
          router.push("/login");
          return;
        }
        if (!mounted) return;
        setUser(userFromSupabase);

        const initialNameParam = searchParams.get("name");
        if (!initialNameParam && userFromSupabase?.user_metadata?.full_name) {
          setName(userFromSupabase.user_metadata.full_name);
        }

        setCertificateNumber("CERT-" + Math.floor(100000 + Math.random() * 900000));
        setDate(new Date().toLocaleDateString());
      } catch (e) {
        console.error("Auth check error:", e);
      } finally {
        if (mounted) setLoadingAuth(false);
      }
    };
    check();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => {
      mounted = false;
      if (sub && typeof sub.subscription?.unsubscribe === "function") sub.subscription.unsubscribe();
      if (sub && typeof sub.unsubscribe === "function") sub.unsubscribe();
    };
  }, [router, searchParams]); // Now including searchParams is safe

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (name) params.set("name", name); else params.delete("name");
    if (workshop) params.set("workshop", workshop); else params.delete("workshop");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [name, workshop]);

  useEffect(() => {
    const updateScale = () => {
      if (!previewWrapperRef.current) return;
      const { width, height } = previewWrapperRef.current.getBoundingClientRect();
      setScale(Math.min(width / 1100, height / 780, 1));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const caption = useMemo(() => {
    const n = name || "I";
    return `${n} completed the “${workshop}” at TeenSkool!\n\nBuilt real-world skills in idea validation, MVPs, and pitching.\n\nThanks to the TeenSkool team for an awesome learning experience.\n#TeenSkool #Entrepreneurship #AI #Learning #Students`;
  }, [name, workshop]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    toast({ title: "Success!", description: "Caption copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = async (format) => {
    if (!certRef.current) return;
    setIsDownloading(true);

    try {
      if (document?.fonts?.ready) {
        await document.fonts.ready;
        await new Promise((r) => setTimeout(r, 80));
      }

      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fdfcf7",
      });

      const dataUrl = canvas.toDataURL("image/png");
      const fileName = `TeenSkool-Certificate-${(name || "Student").replace(/\s+/g, "_")}`;

      if (format === "png") {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${fileName}.png`;
        link.click();
      } else {
        const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(dataUrl);
        const ratio = Math.min(pageW / imgProps.width, pageH / imgProps.height);
        const w = imgProps.width * ratio;
        const h = imgProps.height * ratio;
        const x = (pageW - w) / 2;
        const y = (pageH - h) / 2;
        pdf.addImage(dataUrl, "PNG", x, y, w, h);
        pdf.save(`${fileName}.pdf`);
      }
    } catch (err) {
      console.error("Export error:", err);
      toast({ title: "Error", description: "Failed to generate certificate. Try again.", variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  };

  const shareOnLinkedIn = () => {
    const shareUrl = window.location.href;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="animate-spin h-8 w-8 text-white" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 md:py-32">
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Generate your <span className="text-primary">TeenSkool Certificate</span>
          </h1>
          <p className="text-foreground/70 mt-2 max-w-2xl mx-auto">
            Enter your name and select your workshop to instantly generate, download, and share your official certificate.
          </p>
        </MotionDiv>

        <div className="mt-12 max-w-4xl mx-auto space-y-12">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface/50 backdrop-blur-lg border border-border rounded-2xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Your Details</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Student Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Priya Sharma"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1">Workshop Attended</label>
                <select
                  value={workshop}
                  onChange={(e) => setWorkshop(e.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {WORKSHOPS.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 pt-3">
                <button onClick={() => downloadFile("png")} disabled={!name.trim() || isDownloading} className="flex items-center justify-center gap-2 rounded-xl bg-primary hover:opacity-90 text-primary-foreground px-4 py-3 font-semibold disabled:opacity-50 transition">
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Download PNG
                </button>
                <button onClick={() => downloadFile("pdf")} disabled={!name.trim() || isDownloading} className="flex items-center justify-center gap-2 rounded-xl bg-foreground hover:bg-foreground/80 text-background px-4 py-3 font-semibold disabled:opacity-50 transition">
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} Download PDF
                </button>
                <button onClick={handleCopy} disabled={!name.trim()} className="flex items-center justify-center gap-2 rounded-xl bg-surface border border-border px-4 py-3 font-semibold hover:bg-border/50 disabled:opacity-50 transition">
                  {copied ? (<><Check className="w-4 h-4 text-green-400" /> Copied!</>) : (<><Copy className="w-4 h-4" /> Copy Caption</>)}
                </button>
                <button onClick={shareOnLinkedIn} className="flex items-center justify-center gap-2 rounded-xl bg-[#0a66c2] hover:bg-[#004182] text-white px-4 py-3 font-semibold transition">
                  <Linkedin className="w-4 h-4" /> Share on LinkedIn
                </button>
              </div>
              <p className="text-xs text-foreground/50 !mt-5 text-center">
                For best LinkedIn results, download the PNG and attach it to your post with the copied caption.
              </p>
            </div>
          </MotionDiv>
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Your Certificate Preview</h2>
            <div ref={previewWrapperRef} className="w-full aspect-[1100/780] rounded-2xl shadow-2xl overflow-hidden bg-surface/30 flex items-center justify-center">
              <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <CertificateContent name={name} workshop={workshop} date={date} certificateNumber={certificateNumber} nameFontSize={nameFontSize} />
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
      <div aria-hidden style={{ position: "absolute", top: -99999, left: -99999, width: 1100, height: 780, overflow: "hidden" }}>
        <div ref={certRef}>
          <CertificateContent name={name} workshop={workshop} date={date} certificateNumber={certificateNumber} nameFontSize={nameFontSize} />
        </div>
      </div>
    </div>
  );
}