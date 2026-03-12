import { useEffect, useRef, useState } from "react";

// ========== PARTICLES ==========
const PARTICLE_COUNT = 18;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${Math.random() * 95 + 2}%`,
  bottom: `${Math.random() * 40}%`,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 8,
  opacity: Math.random() * 0.3 + 0.25,
}));

// ========== BREATHING PHASES ==========
const BREATHE_PHASES: { label: string; duration: number }[] = [
  { label: "Inhale...", duration: 4000 },
  { label: "Hold...", duration: 2000 },
  { label: "Exhale...", duration: 4000 },
  { label: "Rest...", duration: 2000 },
];

const BREATHE_CSS: Record<string, string> = {
  "Inhale...": "breathe-in 4s ease-in-out forwards",
  "Hold...": "breathe-hold 2s ease-in-out forwards",
  "Exhale...": "breathe-out 4s ease-in-out forwards",
  "Rest...": "breathe-rest 2s ease-in-out forwards",
};

// ========== PACE OPTIONS ==========
const PACE_OPTIONS = [
  "Just sitting side-by-side in silence",
  "Talking about our experiences",
  "Holding hands when I'm ready",
  "Just being in your presence",
];

// ========== SECTION REVEAL HOOK ==========
function useSectionReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ========== LEAF DIVIDER SVG ==========
function LeafDivider() {
  return (
    <div
      className="flex items-center justify-center my-8 gap-3 opacity-60"
      aria-hidden="true"
    >
      <svg
        width="48"
        height="20"
        viewBox="0 0 48 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 10 Q12 2 24 10 Q36 18 46 10"
          stroke="oklch(0.72 0.065 145)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="12"
          cy="8"
          rx="4"
          ry="2.5"
          transform="rotate(-20 12 8)"
          fill="oklch(0.72 0.065 145)"
          opacity="0.6"
        />
        <ellipse
          cx="36"
          cy="12"
          rx="4"
          ry="2.5"
          transform="rotate(20 36 12)"
          fill="oklch(0.72 0.065 145)"
          opacity="0.6"
        />
      </svg>
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <circle cx="6" cy="6" r="3" fill="oklch(0.58 0.14 42)" opacity="0.5" />
      </svg>
      <svg
        width="48"
        height="20"
        viewBox="0 0 48 20"
        fill="none"
        style={{ transform: "scaleX(-1)" }}
        aria-hidden="true"
      >
        <path
          d="M2 10 Q12 2 24 10 Q36 18 46 10"
          stroke="oklch(0.72 0.065 145)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse
          cx="12"
          cy="8"
          rx="4"
          ry="2.5"
          transform="rotate(-20 12 8)"
          fill="oklch(0.72 0.065 145)"
          opacity="0.6"
        />
        <ellipse
          cx="36"
          cy="12"
          rx="4"
          ry="2.5"
          transform="rotate(20 36 12)"
          fill="oklch(0.72 0.065 145)"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

// ========== VILLAGE SILHOUETTE ==========
function VillageSilhouette() {
  return (
    <div className="w-full overflow-hidden" style={{ marginTop: "auto" }}>
      <img
        src="/assets/generated/hami-village-silhouette-transparent.dim_1200x300.png"
        alt="Hami Village at sunset"
        className="w-full object-cover object-bottom"
        style={{ maxHeight: "220px" }}
      />
    </div>
  );
}

// ========== MAIN APP ==========
export default function App() {
  const [selectedPace, setSelectedPace] = useState<number[]>([]);
  const [breathePhaseIndex, setBreathePhaseIndex] = useState(0);
  const [isBreatheActive, setIsBreatheActive] = useState(false);

  const paceRef = useSectionReveal() as React.RefObject<HTMLElement>;
  const promiseRef = useSectionReveal() as React.RefObject<HTMLElement>;
  const breatheRef = useSectionReveal() as React.RefObject<HTMLElement>;

  const currentPhase = BREATHE_PHASES[breathePhaseIndex];

  // Breathing phase timer
  useEffect(() => {
    if (!isBreatheActive) return;
    const timer = setTimeout(() => {
      setBreathePhaseIndex((prev) => (prev + 1) % BREATHE_PHASES.length);
    }, currentPhase.duration);
    return () => clearTimeout(timer);
  }, [isBreatheActive, currentPhase.duration]);

  const togglePace = (index: number) => {
    setSelectedPace((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleBreathe = () => {
    setIsBreatheActive((prev) => {
      if (!prev) setBreathePhaseIndex(0);
      return !prev;
    });
  };

  const hasSelection = selectedPace.length > 0;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.965 0.022 78)" }}
    >
      {/* ===== HERO ===== */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.028 68) 0%, oklch(0.945 0.038 60) 50%, oklch(0.88 0.06 55) 100%)",
        }}
      >
        {/* Ambient particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            aria-hidden="true"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pt-20 pb-8">
          <p
            className="fade-up text-sm tracking-widest uppercase mb-6 font-body"
            style={{ color: "oklch(0.58 0.14 42)", letterSpacing: "0.22em" }}
          >
            ✦ Hami Village ✦
          </p>

          <h1
            className="fade-up-delay-1 font-serif leading-tight mb-6"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "oklch(0.28 0.06 45)",
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontWeight: 400,
            }}
          >
            Welcome Home to Hami Village, Yami.
          </h1>

          <p
            className="fade-up-delay-2 font-serif italic mb-8 text-xl"
            style={{
              color: "oklch(0.58 0.14 42)",
              fontFamily: '"Instrument Serif", Georgia, serif',
            }}
          >
            Your Sukoon has arrived.
          </p>

          <p
            className="fade-up-delay-3 font-body text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "oklch(0.38 0.05 50)" }}
          >
            Harsh is here. No rush, no pressure, just us finally sharing the
            same air. This isn&apos;t a test—it&apos;s just the two of us coming
            home.
          </p>

          <div
            className="fade-up-delay-3 mt-12 w-16 mx-auto"
            style={{ opacity: 0.5 }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 2 L12 28 M6 22 L12 28 L18 22"
                stroke="oklch(0.58 0.14 42)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Village silhouette at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <VillageSilhouette />
        </div>
      </section>

      {/* ===== SECTION 2: OUR PACE ===== */}
      <section
        ref={paceRef as React.RefObject<HTMLElement>}
        className="section-reveal py-24 px-6"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.88 0.06 55) 0%, oklch(0.965 0.022 78) 20%)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-sm tracking-widest uppercase mb-4 font-body"
            style={{ color: "oklch(0.72 0.065 145)", letterSpacing: "0.2em" }}
          >
            ✿ Section Two ✿
          </p>
          <h2
            className="font-serif mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "oklch(0.28 0.06 45)",
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontWeight: 400,
            }}
          >
            Our Pace
          </h2>
          <p
            className="font-body text-lg mb-12"
            style={{ color: "oklch(0.44 0.05 55)" }}
          >
            Tell me where you feel comfortable today, Yami.{" "}
            <em>There&apos;s no wrong answer.</em>
          </p>

          {/* Pace toggle buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {PACE_OPTIONS.map((option, i) => {
              const isActive = selectedPace.includes(i);
              return (
                <button
                  key={option}
                  type="button"
                  data-ocid={`pace.item.${i + 1}`}
                  onClick={() => togglePace(i)}
                  className="px-6 py-3 rounded-full font-body text-base transition-all duration-300"
                  style={{
                    border: isActive
                      ? "1.5px solid oklch(0.58 0.14 42)"
                      : "1.5px solid oklch(0.82 0.045 65)",
                    background: isActive
                      ? "oklch(0.58 0.14 42)"
                      : "oklch(0.955 0.028 72)",
                    color: isActive
                      ? "oklch(0.97 0.015 75)"
                      : "oklch(0.38 0.05 55)",
                    boxShadow: isActive
                      ? "0 4px 20px oklch(0.58 0.14 42 / 0.25)"
                      : "none",
                    transform: isActive ? "translateY(-2px)" : "none",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Response message */}
          {hasSelection && (
            <div
              data-ocid="pace.success_state"
              className="mx-auto max-w-lg px-8 py-6 rounded-2xl"
              style={{
                background: "oklch(0.97 0.025 72)",
                border: "1px solid oklch(0.75 0.12 72 / 0.4)",
                animation: "fade-up 0.6s ease-out forwards",
                boxShadow: "0 4px 40px oklch(0.75 0.12 72 / 0.2)",
              }}
            >
              <p
                className="font-serif italic text-xl leading-relaxed"
                style={{
                  color: "oklch(0.52 0.12 65)",
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  textShadow: "0 0 20px oklch(0.78 0.13 72 / 0.4)",
                }}
              >
                Yami, whatever you choose is perfect. You can never disappoint
                me. I&apos;m just here for the{" "}
                <span
                  style={{
                    color: "oklch(0.48 0.14 50)",
                    fontStyle: "normal",
                    fontWeight: 400,
                  }}
                >
                  Sukoon
                </span>{" "}
                of being near you.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== SECTION 3: HARSH'S PROMISE ===== */}
      <section
        ref={promiseRef as React.RefObject<HTMLElement>}
        className="section-reveal py-24 px-6"
        style={{ background: "oklch(0.965 0.022 78)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm tracking-widest uppercase mb-4 font-body"
              style={{ color: "oklch(0.72 0.065 145)", letterSpacing: "0.2em" }}
            >
              ✦ A Letter ✦
            </p>
            <h2
              className="font-serif"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "oklch(0.28 0.06 45)",
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontWeight: 400,
              }}
            >
              A Promise from Harsh
            </h2>
          </div>

          {/* Letter card */}
          <div
            data-ocid="promise.card"
            className="rounded-3xl px-10 py-12 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, oklch(0.96 0.032 70) 0%, oklch(0.945 0.038 64) 100%)",
              border: "1px solid oklch(0.84 0.05 65)",
              boxShadow:
                "0 8px 48px oklch(0.58 0.14 42 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.6)",
            }}
          >
            {/* Decorative corner flourishes */}
            <div
              className="absolute top-6 right-8 opacity-20"
              aria-hidden="true"
              style={{ fontSize: "3rem", color: "oklch(0.58 0.14 42)" }}
            >
              ✾
            </div>
            <div
              className="absolute bottom-6 left-8 opacity-15"
              aria-hidden="true"
              style={{ fontSize: "2.5rem", color: "oklch(0.72 0.065 145)" }}
            >
              ❧
            </div>

            <div
              className="font-body text-lg leading-loose relative z-10"
              style={{ color: "oklch(0.32 0.05 52)" }}
            >
              <p
                className="mb-6 font-serif italic"
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  color: "oklch(0.38 0.06 48)",
                }}
              >
                My dearest Yami,
              </p>

              <p className="mb-5">
                I see you. Not just the version of you that you think I see — I
                see <em>all of it</em>. The girl who carries her family on her
                shoulders with such quiet grace. The one who shows up, every
                single time, even when it&apos;s hard. That responsibility you
                hold — it doesn&apos;t scare me.{" "}
                <strong
                  style={{ color: "oklch(0.48 0.12 50)", fontWeight: 500 }}
                >
                  It makes me admire you more than I can say.
                </strong>
              </p>

              <p className="mb-5">
                I&apos;m not here to add to your weight.{" "}
                <strong
                  style={{ color: "oklch(0.48 0.12 50)", fontWeight: 500 }}
                >
                  I&apos;m here to stand beside you. Your teammate, always.
                </strong>{" "}
                When the world feels heavy, I want to be the one who makes it a
                little lighter — not by taking anything from you, but just by
                being there.
              </p>

              <p className="mb-5">
                I don&apos;t just love the idea of you.{" "}
                <strong
                  style={{ color: "oklch(0.48 0.12 50)", fontWeight: 500 }}
                >
                  I love the real, responsible, perfect girl you are.
                </strong>{" "}
                The one with the big heart and the quiet worries and the warmth
                that fills every room.
              </p>

              <p className="mb-8">
                <strong
                  style={{ color: "oklch(0.48 0.12 50)", fontWeight: 500 }}
                >
                  We go at your speed. Always.
                </strong>{" "}
                There is nowhere else I&apos;d rather be than right here, in
                Hami Village, with you.
              </p>

              <LeafDivider />

              <p
                className="font-serif italic"
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  color: "oklch(0.38 0.06 48)",
                }}
              >
                Yours,
                <br />
                <span
                  className="text-2xl"
                  style={{ color: "oklch(0.52 0.12 48)" }}
                >
                  Harsh
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: BREATHE ===== */}
      <section
        ref={breatheRef as React.RefObject<HTMLElement>}
        data-ocid="breathe.section"
        className="section-reveal py-24 px-6 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.965 0.022 78) 0%, oklch(0.945 0.035 62) 100%)",
        }}
      >
        <div className="max-w-xl mx-auto">
          <p
            className="text-sm tracking-widest uppercase mb-4 font-body"
            style={{ color: "oklch(0.72 0.065 145)", letterSpacing: "0.2em" }}
          >
            ✿ Breathe ✿
          </p>
          <h2
            className="font-serif mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "oklch(0.28 0.06 45)",
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontWeight: 400,
            }}
          >
            Breathe in Hami Village
          </h2>
          <p
            className="font-body text-lg mb-16"
            style={{ color: "oklch(0.44 0.05 55)" }}
          >
            For when the overthinking starts. <em>Breathe with me, Yami.</em>
          </p>

          {/* Breathing circle */}
          <div className="flex flex-col items-center gap-8">
            <button
              type="button"
              data-ocid="breathe.canvas_target"
              onClick={toggleBreathe}
              aria-label={
                isBreatheActive
                  ? "Pause breathing exercise"
                  : "Start breathing exercise"
              }
              className="cursor-pointer flex items-center justify-center rounded-full select-none border-0"
              style={{
                width: "200px",
                height: "200px",
                background:
                  "radial-gradient(circle, oklch(0.72 0.1 45) 0%, oklch(0.58 0.14 42) 100%)",
                boxShadow: "0 0 40px oklch(0.58 0.14 42 / 0.35)",
                animation: isBreatheActive
                  ? BREATHE_CSS[currentPhase.label]
                  : undefined,
                transition: "box-shadow 0.3s ease",
              }}
            >
              <span
                className="font-serif italic text-lg"
                style={{
                  color: "oklch(0.97 0.015 75)",
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  opacity: isBreatheActive ? 1 : 0.8,
                }}
              >
                {isBreatheActive ? currentPhase.label : "Begin"}
              </span>
            </button>

            {isBreatheActive && (
              <div style={{ animation: "fade-up 0.4s ease-out forwards" }}>
                <p
                  className="font-serif italic text-xl mb-2"
                  style={{
                    color: "oklch(0.52 0.12 50)",
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    minWidth: "180px",
                  }}
                >
                  {currentPhase.label}
                </p>
              </div>
            )}

            <p
              className="font-body text-base"
              style={{ color: "oklch(0.55 0.04 55)", maxWidth: "300px" }}
            >
              {isBreatheActive
                ? "Just follow the circle. Let your breath find its rhythm."
                : "Tap the circle to begin."}
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        data-ocid="footer.section"
        className="py-16 px-6 text-center"
        style={{
          background: "oklch(0.88 0.055 55)",
          borderTop: "1px solid oklch(0.78 0.08 58)",
        }}
      >
        <div className="max-w-xl mx-auto">
          <div className="mb-2 opacity-50 text-2xl" aria-hidden="true">
            ❦
          </div>
          <p
            className="font-serif italic text-2xl mb-3"
            style={{
              color: "oklch(0.28 0.06 45)",
              fontFamily: '"Instrument Serif", Georgia, serif',
            }}
          >
            I am hell sure about us. I&apos;m not going anywhere.
          </p>
          <p
            className="font-serif text-3xl"
            style={{
              color: "oklch(0.48 0.13 45)",
              fontFamily: '"Instrument Serif", Georgia, serif',
            }}
          >
            Love, Harsh.
          </p>

          <div
            className="mt-12 pt-8 font-body text-sm"
            style={{
              color: "oklch(0.52 0.04 55)",
              borderTop: "1px solid oklch(0.78 0.06 58 / 0.5)",
            }}
          >
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="underline"
              style={{ color: "oklch(0.48 0.1 50)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
