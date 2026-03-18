"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Lock, CheckCircle, AlertTriangle, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "invalid" | "form" | "submitting" | "success">(
    token ? "loading" : "invalid"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  // CR5-042: AbortController prevents setting state on unmounted component
  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const controller = new AbortController();

    fetch(`${API_URL}/resetpassword?token=${encodeURIComponent(token)}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setEmail(data.email ?? "");
          setStatus("form");
        } else {
          const data = await res.json().catch(() => null);
          setError(data?.error ?? "Invalid or expired reset link.");
          setStatus("invalid");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Unable to reach the server. Please try again later.");
        setStatus("invalid");
      });

    return () => controller.abort();
  }, [token]);

  function validatePassword(pw: string): string | null {
    if (pw.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(pw)) return "Must contain an uppercase letter.";
    if (!/[a-z]/.test(pw)) return "Must contain a lowercase letter.";
    if (!/[0-9]/.test(pw)) return "Must contain a digit.";
    if (!/[!@#$%^&*()_\-+=]/.test(pw)) return "Must contain a special character.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const pwError = validatePassword(password);
    if (pwError) {
      setError(pwError);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(`${API_URL}/resetpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password, confirm_password: confirmPassword }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Password reset failed. Please try again.");
        setStatus("form");
      }
    } catch {
      setError("Unable to reach the server. Please try again later.");
      setStatus("form");
    }
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-3 border-emerald border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-navy-dark/60">Validating your reset link...</p>
      </div>
    );
  }

  if (status === "invalid") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-display font-bold text-navy-dark mb-3">Invalid Reset Link</h2>
        <p className="text-navy-dark/60 mb-8">
          {error || "This password reset link is invalid, expired, or has already been used."}
        </p>
        <p className="text-sm text-navy-dark/50">
          Open the ArogyaSync app and tap <strong>Forgot Password?</strong> to request a new link.
        </p>
      </motion.div>
    );
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald" />
        </div>
        <h2 className="text-2xl font-display font-bold text-navy-dark mb-3">Password Reset Successfully</h2>
        <p className="text-navy-dark/60 mb-2">Your password has been updated.</p>
        <p className="text-sm text-navy-dark/50">Return to the ArogyaSync mobile app to log in with your new password.</p>
      </motion.div>
    );
  }

  // Form state (status === "form" || "submitting")
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="p-10 rounded-[32px] bg-navy-dark">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-emerald/15 flex items-center justify-center">
            <Lock className="w-5 h-5 text-emerald" />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-white">Set New Password</h2>
            <p className="text-xs text-white/50">{email}</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full h-14 px-6 pr-12 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:border-emerald outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                minLength={8}
                className="w-full h-14 px-6 pr-12 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:border-emerald outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Password requirements */}
          <div className="text-xs text-white/30 space-y-1 px-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li className={password.length >= 8 ? "text-emerald" : ""}>At least 8 characters</li>
              <li className={/[A-Z]/.test(password) ? "text-emerald" : ""}>An uppercase letter</li>
              <li className={/[a-z]/.test(password) ? "text-emerald" : ""}>A lowercase letter</li>
              <li className={/[0-9]/.test(password) ? "text-emerald" : ""}>A digit</li>
              <li className={/[!@#$%^&*()_\-+=]/.test(password) ? "text-emerald" : ""}>A special character</li>
            </ul>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={status === "submitting"}
            className="w-full h-14 rounded-2xl font-bold text-base"
          >
            {status === "submitting" ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-navy-dark/50 hover:text-emerald transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h2 className="text-emerald font-mono text-sm font-bold uppercase tracking-widest mb-4">
            Account Recovery
          </h2>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-navy-dark mb-4">
            Reset Your Password
          </h1>
          <p className="text-lg text-navy-dark/60 max-w-xl leading-relaxed">
            Create a new password for your ArogyaSync account.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-6">
          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-3 border-emerald border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
