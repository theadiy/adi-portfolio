import React, { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";

/* deterministic blip positions from project id */
function seedPos(id, i, n) {
  let h = 2166136261;
  for (let c of (id + "|" + i)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const rnd = (h >>> 0) / 2 ** 32;
  const angle = (2 * Math.PI * (i + 0.3 * rnd)) / n;
  const r = 0.18 + 0.72 * Math.sqrt(rnd); // 18%..90% (bias toward center)
  return { angle, r };
}

export default function RadarProjects({ projects = [] }) {
  const wrapRef = useRef(null);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [pinnedIdx, setPinnedIdx] = useState(null); // click-to-pin
  const [tip, setTip] = useState(null); // {x, y, side, px, py}

  const blips = useMemo(() => {
    const N = projects.length || 1;
    return projects.map((p, i) => {
      const { angle, r } = seedPos(p.id, i, N);
      const x = 50 + Math.cos(angle) * r * 50;
      const y = 50 + Math.sin(angle) * r * 50;
      return { x, y, p };
    });
  }, [projects]);

  // recompute tooltip on resize while a blip is open/pinned
  useLayoutEffect(() => {
    const onR = () => {
      const idx = pinnedIdx ?? hoverIdx;
      if (idx == null) return;
      const { x, y } = blips[idx];
      positionTip(x, y);
    };
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [hoverIdx, pinnedIdx, blips]);

  // click anywhere outside to unpin
  useEffect(() => {
    function onDocClick(e) {
      if (!pinnedIdx && !hoverIdx) return;
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      const x = e.clientX, y = e.clientY;
      // if click is outside radar AND outside the tooltip area, clear pin
      const inRadar = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      const inTip =
        tip &&
        x >= tip.x &&
        x <= tip.x + 420 &&
        y >= tip.y &&
        y <= tip.y + 220; // approx tooltip box
      if (!inRadar && !inTip) {
        setPinnedIdx(null);
        setHoverIdx(null);
        setTip(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [pinnedIdx, hoverIdx, tip]);

  function positionTip(xPct, yPct) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = r.left + (xPct / 100) * r.width;
    const py = r.top + (yPct / 100) * r.height;

    // try to show card to the right of the blip; flip to left if overflowing
    const side = px + 420 + 24 > r.right ? "left" : "right";
    const offsetX = side === "right" ? 72 : -72;          // further from dot
    const tipX = Math.min(Math.max(px + offsetX, r.left + 8), r.right - 8); // clamp
    const tipY = Math.min(Math.max(py - 140, r.top + 8), r.bottom - 8);     // a bit higher
    setTip({ x: tipX, y: tipY, side, px, py });
  }

  const activeIdx = pinnedIdx ?? hoverIdx;
  const active = activeIdx != null ? blips[activeIdx] : null;

  return (
    <div className="mt-6 relative">
      {/* === RADAR (full section width) ================================== */}
      <div
        ref={wrapRef}
        className="relative w-full aspect-[16/9] min-h-[420px] rounded-2xl border border-emerald-400/30 bg-black/40 overflow-hidden"
      >
        {/* rings */}
        <div className="absolute inset-0 pointer-events-none opacity-80">
		  {/* soft outer glow (clipped to circle) */}
		  <div
			className="absolute inset-0"
			style={{ clipPath: "circle(closest-side at 50% 50%)" }}
		  >
			<div className="absolute inset-0 shadow-[0_0_140px_0_#10b98133]" />
		  </div>

		  {/* rings */}
		  <div
			className="absolute inset-6"
			style={{
			  clipPath: "circle(closest-side at 50% 50%)",
			  background:
				"repeating-radial-gradient(circle at 50% 50%, rgba(16,185,129,.18) 0 1px, transparent 1px 42px)",
			}}
		  />

		  {/* crosshair (not clipped so it spans full rect) */}
		  <div className="absolute left-1/2 top-6 -translate-x-1/2 h-[calc(100%-3rem)] w-px bg-emerald-400/15" />
		  <div className="absolute top-1/2 left-6 -translate-y-1/2 h-px w-[calc(100%-3rem)] bg-emerald-400/15" />
		</div>


        
        {/* rotating sweep (extends full width now) */}
	{/* === BEAM anchored at radar center (rotates from center) === */}
<div className="pointer-events-none absolute inset-0 z-[1]">
  {/* anchor at exact center; must have non-zero size */}
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-px">

    {/* afterglow / trail */}
    <div
      className="absolute animate-[spin_6s_linear_infinite] mix-blend-screen"
      style={{
        width: "200vmax",
        height: "200vmax",
		animationDirection: "reverse",
        transformOrigin: "0 0",                         // rotate around apex
        background:
          "conic-gradient(from 0deg at 0 0, rgba(16,185,129,0) 0deg, rgba(16,185,129,.18) 45deg, rgba(16,185,129,0) 150deg)",
        WebkitMaskImage:
          "radial-gradient(circle at 0 0, #fff 0%, #fff 52%, transparent 80%)",
        maskImage:
          "radial-gradient(circle at 0 0, #fff 0%, #fff 52%, transparent 80%)",
        filter: "blur(8px)",
      }}
    />

    {/* main bright beam */}
    <div
      className="absolute animate-[spin_6s_linear_infinite] mix-blend-screen"
      style={{
        width: "200vmax",
        height: "200vmax",
		animationDirection: "reverse",
        transformOrigin: "0 0",
        background:
          "conic-gradient(from 0deg at 0 0, rgba(16,185,129,0) 0deg, rgba(16,185,129,.45) 22deg, rgba(16,185,129,0) 96deg)",
        WebkitMaskImage:
          "radial-gradient(circle at 0 0, #fff 0%, #fff 55%, transparent 82%)",
        maskImage:
          "radial-gradient(circle at 0 0, #fff 0%, #fff 55%, transparent 82%)",
        filter: "blur(1.2px)",
      }}
    />
  </div>
</div>





        {/* blips */}
        {blips.map(({ x, y, p }, i) => (
          <button
            key={p.id}
            onMouseEnter={() => {
              if (pinnedIdx != null) return; // don't fight the pin
              setHoverIdx(i);
              positionTip(x, y);
            }}
            onMouseMove={() => {
              if (pinnedIdx != null) return;
              positionTip(x, y);
            }}
            onMouseLeave={() => {
              if (pinnedIdx != null) return;
              setHoverIdx(null);
              setTip(null);
            }}
            onClick={() => {
              // pin/unpin on click; always ensure tip is positioned
              if (pinnedIdx === i) {
                setPinnedIdx(null);
                setHoverIdx(null);
                setTip(null);
              } else {
                setPinnedIdx(i);
                setHoverIdx(null);
                positionTip(x, y);
              }
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label={p.title}
          >
            <span
              className={[
                "block h-2.5 w-2.5 rounded-full bg-emerald-400",
                "shadow-[0_0_10px_2px_#10b981AA] ring-2 ring-emerald-300/40",
                "transition-transform duration-150",
                activeIdx === i ? "scale-125 animate-pulse" : "scale-100",
              ].join(" ")}
            />
          </button>
        ))}

        {/* ambient specks */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-emerald-300/30"
              style={{
                left: `${(i * 173) % 100}%`,
                top: `${(i * 97) % 100}%`,
                animation: `ping ${4 + (i % 5)}s linear ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* === TOOLTIP emerging from the blip ================================= */}
      <AnimatePresence>
        {activeIdx != null && tip && (
          <>
            {/* connector line */}
            <motion.div
              key="connector"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none fixed origin-left"
              style={{
                left: tip.side === "right" ? tip.px + 8 : tip.x,
                top: tip.py, // start exactly at blip Y
                width: Math.max(12, Math.abs(tip.x - tip.px) - 6),
                height: 2,
                background:
                  "linear-gradient(90deg, rgba(16,185,129,.2), rgba(16,185,129,.6))",
                boxShadow: "0 0 12px 2px rgba(16,185,129,.25)",
              }}
            />

            {/* card */}
            <motion.div
              key={blips[activeIdx].p.id}
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="fixed z-50 border border-emerald-400/30 bg-black/60 rounded-2xl p-5 shadow-[0_0_40px_-10px_#10b981] backdrop-blur-md font-sans"
              style={{
                left: tip.x,
                top: tip.y,
                transform: `translate(${tip.side === "right" ? 0 : "-100%"}, 0)`,
                width: 420,
              }}
            >
              <div className="absolute -z-10 inset-0 rounded-2xl before:pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] before:bg-[length:100%_2px] before:opacity-20" />
              <div className="font-semibold text-emerald-200">
                {blips[activeIdx].p.title}
              </div>
              <p className="text-sm text-emerald-200/80 mt-1">
                {blips[activeIdx].p.blurb}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
                {blips[activeIdx].p.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded border border-emerald-400/30"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
                {blips[activeIdx].p.actions.map((a) => (
                  <button
                    key={a}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-emerald-400/30 hover:bg-white/5"
                  >
                    <Code2 className="w-3.5 h-3.5" /> {a}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
