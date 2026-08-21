import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-sora">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome back, {user.user_metadata?.name || 'Admin'}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-2">Total Users</h3>
            <p className="text-slate-500 text-sm">1,245 active users on the platform.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-2">System Status</h3>
            <p className="text-green-500 text-sm font-medium">All systems operational.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-2">Recent Reports</h3>
            <p className="text-slate-500 text-sm">3 new support tickets require attention.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
