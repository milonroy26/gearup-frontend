"use client";

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    type ChartOptions,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import type { ReactNode } from "react";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
);

export type DashboardChartPoint = {
    label: string;
    value: number;
};

type ChartCardProps = {
    title: string;
    description: string;
    data: DashboardChartPoint[];
    valuePrefix?: string;
};

const chartColors = [
    "rgba(52, 211, 153, 0.82)",
    "rgba(56, 189, 248, 0.82)",
    "rgba(245, 158, 11, 0.82)",
    "rgba(168, 85, 247, 0.82)",
    "rgba(248, 113, 113, 0.82)",
    "rgba(148, 163, 184, 0.82)",
];

const chartBorders = [
    "rgb(16, 185, 129)",
    "rgb(14, 165, 233)",
    "rgb(217, 119, 6)",
    "rgb(147, 51, 234)",
    "rgb(239, 68, 68)",
    "rgb(100, 116, 139)",
];

function hasChartData(data: DashboardChartPoint[]) {
    return data.some((item) => item.value > 0);
}

function EmptyChartState() {
    return (
        <div className="flex h-64 flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/30 px-6 text-center">
            <p className="font-heading text-base font-bold">No chart data yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
                New activity will appear here automatically.
            </p>
        </div>
    );
}

function ChartShell({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-md border border-border bg-card p-5 text-card-foreground shadow-sm">
            <div className="mb-5">
                <h2 className="font-heading text-lg font-bold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
            {children}
        </section>
    );
}

const commonPlugins = {
    legend: {
        labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
        },
    },
    tooltip: {
        displayColors: false,
    },
};

function getBarOptions(valuePrefix: string): ChartOptions<"bar"> {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${valuePrefix}${value}`,
                },
            },
        },
        plugins: {
            ...commonPlugins,
            legend: { display: false },
        },
    };
}

function getLineOptions(valuePrefix: string): ChartOptions<"line"> {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${valuePrefix}${value}`,
                },
            },
        },
        plugins: {
            ...commonPlugins,
            legend: { display: false },
        },
    };
}

const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: commonPlugins,
};

export function DashboardBarChart({ title, description, data, valuePrefix = "" }: ChartCardProps) {
    if (!hasChartData(data)) {
        return (
            <ChartShell title={title} description={description}>
                <EmptyChartState />
            </ChartShell>
        );
    }

    return (
        <ChartShell title={title} description={description}>
            <div className="h-64">
                <Bar
                    data={{
                        labels: data.map((item) => item.label),
                        datasets: [
                            {
                                label: title,
                                data: data.map((item) => item.value),
                                backgroundColor: chartColors,
                                borderColor: chartBorders,
                                borderWidth: 1,
                                borderRadius: 6,
                            },
                        ],
                    }}
                    options={getBarOptions(valuePrefix)}
                />
            </div>
        </ChartShell>
    );
}

export function DashboardLineChart({ title, description, data, valuePrefix = "" }: ChartCardProps) {
    if (!hasChartData(data)) {
        return (
            <ChartShell title={title} description={description}>
                <EmptyChartState />
            </ChartShell>
        );
    }

    return (
        <ChartShell title={title} description={description}>
            <div className="h-64">
                <Line
                    data={{
                        labels: data.map((item) => item.label),
                        datasets: [
                            {
                                label: title,
                                data: data.map((item) => item.value),
                                borderColor: "rgb(16, 185, 129)",
                                backgroundColor: "rgba(52, 211, 153, 0.16)",
                                fill: true,
                                tension: 0.35,
                                pointBackgroundColor: "rgb(16, 185, 129)",
                                pointRadius: 4,
                            },
                        ],
                    }}
                    options={getLineOptions(valuePrefix)}
                />
            </div>
        </ChartShell>
    );
}

export function DashboardPieChart({ title, description, data }: ChartCardProps) {
    if (!hasChartData(data)) {
        return (
            <ChartShell title={title} description={description}>
                <EmptyChartState />
            </ChartShell>
        );
    }

    return (
        <ChartShell title={title} description={description}>
            <div className="h-64">
                <Pie
                    data={{
                        labels: data.map((item) => item.label),
                        datasets: [
                            {
                                label: title,
                                data: data.map((item) => item.value),
                                backgroundColor: chartColors,
                                borderColor: "rgba(255, 255, 255, 0.7)",
                                borderWidth: 2,
                            },
                        ],
                    }}
                    options={pieOptions}
                />
            </div>
        </ChartShell>
    );
}
