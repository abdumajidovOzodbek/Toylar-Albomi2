import { useState, FormEvent } from "react";

const VALID_USERNAME = "maftuna2004";
const VALID_PASSWORD = "maftuna2004";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem("wedding_auth", "true");
        onLogin();
      } else {
        setError("Login yoki parol noto'g'ri. Qayta urinib ko'ring.");
        setLoading(false);
      }
    }, 600);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#080300" }}
    >
      {/* Ambient orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,100,20,0.09) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,160,80,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,80,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top ornament */}
      <div className="text-center mb-12" style={{ animation: "fadeInDown 0.9s cubic-bezier(0.16,1,0.3,1) both" }}>
        <div className="flex items-center justify-center gap-5 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-700/50" />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "rgba(212,160,80,0.5)",
            }}
          >
            MAXSUS KIRISH
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-700/50" />
        </div>

        <h1
          className="font-thin"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
            color: "rgba(255,235,180,0.88)",
            lineHeight: 1.15,
          }}
        >
          Samandar <span style={{ color: "rgba(212,160,80,0.7)", fontStyle: "italic" }}>&</span> Maftunabonu
        </h1>

        <p
          className="mt-2"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1rem",
            color: "rgba(212,160,80,0.4)",
            letterSpacing: "0.1em",
          }}
        >
          To'y xotiralari
        </p>
      </div>

      {/* Login card */}
      <div
        className="w-full max-w-sm mx-4"
        style={{ animation: "fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(22,9,1,0.95) 0%, rgba(14,5,0,0.98) 100%)",
            border: "1px solid rgba(212,160,80,0.15)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,160,80,0.05)",
          }}
        >
          {/* Card header stripe */}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(212,160,80,0.35), transparent)" }}
          />

          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
            {/* Username field */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "11px",
                  letterSpacing: "0.35em",
                  color: "rgba(212,160,80,0.55)",
                  textTransform: "uppercase",
                }}
              >
                Foydalanuvchi nomi
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                autoComplete="username"
                placeholder="nomingizni kiriting"
                required
                className="w-full outline-none transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(212,160,80,0.15)",
                  borderRadius: "12px",
                  padding: "13px 16px",
                  color: "rgba(255,235,180,0.85)",
                  fontSize: "0.95rem",
                  fontFamily: "Inter, sans-serif",
                  caretColor: "rgba(212,160,80,0.8)",
                }}
                onFocus={(e) => { e.target.style.border = "1px solid rgba(212,160,80,0.45)"; e.target.style.background = "rgba(212,160,80,0.04)"; }}
                onBlur={(e) => { e.target.style.border = "1px solid rgba(212,160,80,0.15)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-2">
              <label
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "11px",
                  letterSpacing: "0.35em",
                  color: "rgba(212,160,80,0.55)",
                  textTransform: "uppercase",
                }}
              >
                Parol
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className="w-full outline-none transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(212,160,80,0.15)",
                    borderRadius: "12px",
                    padding: "13px 48px 13px 16px",
                    color: "rgba(255,235,180,0.85)",
                    fontSize: "0.95rem",
                    fontFamily: "Inter, sans-serif",
                    caretColor: "rgba(212,160,80,0.8)",
                    width: "100%",
                  }}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(212,160,80,0.45)"; e.target.style.background = "rgba(212,160,80,0.04)"; }}
                  onBlur={(e) => { e.target.style.border = "1px solid rgba(212,160,80,0.15)"; e.target.style.background = "rgba(255,255,255,0.03)"; }}
                />
                {/* Show/hide toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,1)" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,1)" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="text-center text-sm py-2.5 px-4 rounded-xl"
                style={{
                  background: "rgba(180,40,20,0.12)",
                  border: "1px solid rgba(180,40,20,0.25)",
                  color: "rgba(255,140,100,0.85)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.82rem",
                  letterSpacing: "0.01em",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden w-full rounded-2xl transition-all duration-400 mt-1"
              style={{
                padding: "14px",
                background: loading
                  ? "rgba(120,80,20,0.25)"
                  : "linear-gradient(135deg, rgba(180,110,20,0.6) 0%, rgba(212,160,80,0.45) 50%, rgba(160,95,10,0.6) 100%)",
                border: "1px solid rgba(212,160,80,0.4)",
                color: loading ? "rgba(212,160,80,0.4)" : "rgba(255,235,180,0.92)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 4px 30px rgba(180,100,10,0.2)",
              }}
            >
              {/* Shimmer sweep */}
              {!loading && (
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 35%, rgba(255,235,180,0.1) 50%, transparent 65%)",
                    animation: "shimmer 2.8s infinite linear",
                    backgroundSize: "200% 100%",
                  }}
                />
              )}

              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(212,160,80,0.5)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0110 10" strokeOpacity="0.9" />
                  </svg>
                  Tekshirilmoqda…
                </span>
              ) : (
                "Kirish"
              )}
            </button>
          </form>

          {/* Card footer stripe */}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(to right, transparent, rgba(212,160,80,0.15), transparent)" }}
          />
        </div>

        {/* Bottom note */}
        <p
          className="text-center mt-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "rgba(212,160,80,0.25)",
          }}
        >
          22 · NOYABR · 2024
        </p>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        input::placeholder { color: rgba(212,160,80,0.2); }
      `}</style>
    </div>
  );
}
