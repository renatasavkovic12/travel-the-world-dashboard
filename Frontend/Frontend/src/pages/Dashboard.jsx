import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  FiDollarSign,
  FiCompass,
  FiMap,
  FiUsers,
  FiCalendar
} from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { getDashboard } from "../services/dashboardApi";
function CountUp({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const numericValue = typeof value === 'number' ? value : parseFloat(value);

    if (isNaN(numericValue)) {
      setDisplay(value);
      return;
    }
    const startTime = performance.now();
    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * numericValue);

      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);
  return (
    <>
      {display !== undefined && display !== null
        ? display.toLocaleString()
        : "0"
      }
    </>
  );
}
export default function Dashboard() {
  const { t, lang } = useLanguage();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDashboard()
      .then(data => {
        console.log("DASHBOARD PODACI:", data);
        console.log("AKTIVNI PUTNICI:", data.activePassengers);

        setDashboard(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Greška pri učitavanju dashboarda:", error);
        setLoading(false);
      });

  }, []);
  if (loading || !dashboard) {
    return (
      <div className="text-customText">
        Loading dashboard...
      </div>
    );
  }
  const continentPieData =
    dashboard.continentChart?.map((item, index) => ({
      name: lang === "bs"
        ? item.continentBs
        : item.continentEn,
      value: item.bookings,
      color: [
        '#4f46e5',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#ec4899'
      ][index % 5]
    })) ?? [];
  const formatPercentage = (value) => {
    if (value === null || value === undefined || value === "") {
      return "0.00%";
    }

    const number = parseFloat(value);

    if (isNaN(number)) {
      return "0.00%";
    }

    return `${number.toFixed(2)}%`;
  };
  const cardsData = [
    {
      id: 1,
      title: t('kpiRevenue'),
      numericValue: dashboard.totalRevenue ?? 0,
      suffix: " BAM",
      change: formatPercentage(dashboard.revenueChange),
      isPositive: !(dashboard.revenueChange ?? "").startsWith("-"),
      icon: FiDollarSign,
      color: 'text-green-500 bg-green-500/10'
    },
    {
      id: 2,
      title: t('kpiBookings'),
      numericValue: dashboard.totalBookings ?? 0,
      suffix: "",
      change: formatPercentage(dashboard.bookingChange),
      isPositive: !(dashboard.bookingChange ?? "").startsWith("-"),
      icon: FiCalendar,
      color: 'text-purple-500 bg-purple-500/10'
    },
    {
      id: 3,
      title: t('kpiPassengers'),
      numericValue: dashboard.totalPassengers ?? 0,
      suffix: "",
      change: null,
      isPositive: true,
      icon: FiUsers,
      color: 'text-orange-500 bg-orange-500/10'
    },
    {
      id: 4,
      title: t('kpiActive'),
      numericValue: dashboard.activePassengers ?? 0,
      suffix: "",
      change: null,
      isPositive: true,
      icon: FiUsers,
      color: 'text-blue-500 bg-blue-500/10'
    }
  ];
  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-customText">
          {t('agencyDashboard')}
        </h1>
        <p className="text-customMuted text-sm mt-1">
          {t('dashboardSubtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-customCard p-4 sm:p-6 rounded-2xl border border-customBorder shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-customMuted">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl ${card.color}`}>
                  <IconComponent size={20} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-customText">
                  <CountUp value={card.numericValue} />
                  {card.suffix}
                </span>
                {card.change && (
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${card.isPositive
                        ? 'text-green-600 bg-green-500/10'
                        : 'text-red-600 bg-red-500/10'
                        }`}
                    >
                      {card.change}
                    </span>
                    <span className="text-xs text-customMuted">
                      {t('fromLastMonth')}
                    </span>

                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-customCard p-4 sm:p-6 rounded-2xl border border-customBorder shadow-sm">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-customText">
            {t('chartRevenueTitle')}
          </h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboard.revenueChart ?? []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f46e5"
                  fillOpacity={0.1}
                  fill="#4f46e5"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-customCard p-4 sm:p-6 rounded-2xl border border-customBorder shadow-sm flex flex-col justify-between">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-customText">
            {t('chartContinentTitle')}
          </h3>
          <div className="h-[200px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={continentPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {continentPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-around gap-3 text-xs mt-4">
            {continentPieData.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-customMuted">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
