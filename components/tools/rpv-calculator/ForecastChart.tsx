'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

interface ForecastResult {
  cumInvest: number;
  cumProfit: number;
  net: number;
}

interface ForecastChartProps {
  conservativeData: ForecastResult[];
  targetData: ForecastResult[];
  bestData: ForecastResult[];
  isRevenueMode?: boolean;
}

const COLORS = {
  conservative: '#a8aec9', // muted (matches --color-text-inv-muted family)
  target: '#6a48d7', // brand purple
  best: '#ff7a59', // brand warm accent
};

const formatValue = (value: number) => {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (abs >= 1000000) return `${sign}$${(abs / 1000000).toFixed(1)}M`;
  if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(0)}k`;
  return `${sign}$${abs.toFixed(0)}`;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-ink/15 rounded-xl p-4 shadow-lg">
        <p className="text-text font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-text-muted">{entry.name}:</span>
            <span className="text-text font-semibold">{formatValue(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ForecastChart({
  conservativeData,
  targetData,
  bestData,
  isRevenueMode = false,
}: ForecastChartProps) {
  // Cumulative net profit/revenue (after investment) over 12 months.
  // Lines crossing $0 = break-even point. M12 values match the scenario cards.
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    fullMonth: `Month ${i + 1}`,
    conservative: conservativeData[i]?.net || 0,
    target: targetData[i]?.net || 0,
    best: bestData[i]?.net || 0,
  }));

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h4 className="text-sm font-semibold text-text">
          Cumulative net {isRevenueMode ? 'revenue' : 'profit'} after investment
        </h4>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.conservative }} />
            <span className="text-text-muted">Conservative</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.target }} />
            <span className="text-text-muted">Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.best }} />
            <span className="text-text-muted">Best case</span>
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.conservative} stopOpacity={0.25}/>
                <stop offset="95%" stopColor={COLORS.conservative} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.target} stopOpacity={0.25}/>
                <stop offset="95%" stopColor={COLORS.target} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.best} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={COLORS.best} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(20, 23, 42, 0.08)" />
            <ReferenceLine y={0} stroke="#5a5e77" strokeWidth={1.5} strokeDasharray="4 4" label={{ value: 'Break-even', position: 'right', fontSize: 10, fill: '#5a5e77' }} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#5a5e77' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={formatValue}
              tick={{ fontSize: 11, fill: '#5a5e77' }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="conservative"
              stroke={COLORS.conservative}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorConservative)"
              name="Conservative (10%)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke={COLORS.target}
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorTarget)"
              name="Target (20%)"
            />
            <Area
              type="monotone"
              dataKey="best"
              stroke={COLORS.best}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBest)"
              name="Best case (40%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
