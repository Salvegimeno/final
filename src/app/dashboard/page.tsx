'use client';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/users')).json(),
  });

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/posts')).json(),
  });

  const { data: comments } = useQuery({
    queryKey: ['comments'],
    queryFn: async () => (await fetch('https://jsonplaceholder.typicode.com/comments')).json(),
  });

  if (!users || !posts || !comments) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 text-gray-600 text-lg font-medium">
        Loading...
      </div>
    );
  }

  const total = users.length + posts.length + comments.length;

  const chartData: { series: number[]; options: ApexOptions } = {
    series: [users.length, posts.length, comments.length],
    options: {
      labels: ['Users', 'Posts', 'Comments'],
      chart: {
        type: 'pie',
        toolbar: { show: false },
      },
      colors: ['#93C5FD', '#3B82F6', '#1E40AF'],
      dataLabels: {
        enabled: true,
        formatter: (val: number, opts) => {
          const raw = opts.w.config.series[opts.seriesIndex];
          const percentage = ((raw / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          colors: ['#111827'],
        },
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: { colors: ['#111827'] },
        itemMargin: { horizontal: 10, vertical: 5 },
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 text-gray-900 px-4 py-10">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-100 tracking-tight">
          Dashboard Overview
        </h1>

        <Card className="bg-white border-2 border-indigo-700 shadow-2xl rounded-3xl p-6 md:p-10 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-4 md:mb-6">
              User & Content Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="w-full max-w-full sm:max-w-[400px] md:max-w-[600px]">
              <Chart options={chartData.options} series={chartData.series} type="pie" width="100%" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
