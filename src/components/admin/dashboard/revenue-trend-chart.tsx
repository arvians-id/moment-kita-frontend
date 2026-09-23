import type { RevenueTrendPoint } from "@/types";

const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const WIDTH = 480;
const HEIGHT = 160;
const PADDING = 24;

/**
 * A lightweight, dependency-free SVG line chart. The project has no
 * charting library yet, and one month-over-month series does not justify
 * adding one.
 */
export function RevenueTrendChart({ points }: { points: RevenueTrendPoint[] }) {
  const values = points.map((point) => point.amount);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const stepX =
    points.length > 1 ? (WIDTH - PADDING * 2) / (points.length - 1) : 0;

  const coords = points.map((point, index) => ({
    x: PADDING + stepX * index,
    y:
      HEIGHT -
      PADDING -
      ((point.amount - min) / range) * (HEIGHT - PADDING * 2),
    point,
  }));

  const linePath = coords
    .map((coord, index) => `${index === 0 ? "M" : "L"}${coord.x},${coord.y}`)
    .join(" ");
  const lastX = coords[coords.length - 1]?.x ?? 0;
  const firstX = coords[0]?.x ?? 0;
  const areaPath = `${linePath} L${lastX},${HEIGHT - PADDING} L${firstX},${HEIGHT - PADDING} Z`;

  const latest = points[points.length - 1];

  return (
    <section className="flex h-full flex-col gap-5 border border-border bg-surface-lowest p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.2em] text-secondary uppercase">
            Commerce
          </span>
          <h2 className="font-serif text-[20px] leading-7 font-semibold">
            Revenue Trend
          </h2>
        </div>
        {latest ? (
          <span className="text-[13px] leading-5 font-semibold text-on-surface-variant">
            {currencyFormat.format(latest.amount)}{" "}
            <span className="font-normal">this month</span>
          </span>
        ) : null}
      </div>

      {coords.length > 0 ? (
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="Revenue trend over recent months"
        >
          <defs>
            <linearGradient id="admin-revenue-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--secondary)"
                stopOpacity="0.18"
              />
              <stop
                offset="100%"
                stopColor="var(--secondary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#admin-revenue-fill)" stroke="none" />
          <path
            d={linePath}
            fill="none"
            stroke="var(--secondary)"
            strokeWidth="2"
          />
          {coords.map(({ x, y, point }) => (
            <circle
              key={point.label}
              cx={x}
              cy={y}
              r="3"
              fill="var(--secondary)"
            />
          ))}
        </svg>
      ) : null}

      <div className="flex justify-between text-[10px] leading-4 font-semibold tracking-[0.1em] text-on-surface-variant uppercase">
        {points.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </section>
  );
}
