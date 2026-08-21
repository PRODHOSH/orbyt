import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-sora">Student Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, {user.user_metadata?.name || 'Student'}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-2">My Courses</h3>
            <p className="text-slate-500 text-sm">You are enrolled in 4 courses this semester.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-2">Upcoming Assignments</h3>
            <p className="text-slate-500 text-sm">2 assignments due this week.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-2">Grades</h3>
            <p className="text-slate-500 text-sm">Your current GPA is 3.8.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
