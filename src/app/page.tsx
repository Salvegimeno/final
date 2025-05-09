'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 text-gray-900 px-4 py-10">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-100 tracking-tight">
          Welcome to Our Final Project!
        </h1>

        <Card className="bg-white border-2 border-indigo-700 shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6 md:mb-8">
              Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 text-center">
              In this project, we develop a fully responsive web application that showcases proficiency in frontend technologies, API integration, and user authentication. Using Next.js and Tailwind CSS, we created a dynamic app with features like user profiles, post listings with comments, data visualizations using ApexCharts, and a registration/login system.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
