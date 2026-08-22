'use client'

import React, { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { signup, signInWithGoogle } from '../actions'
import { Mail, Lock, User, Briefcase, GraduationCap, Shield, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState('student')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.append('role', role)
    
    startTransition(async () => {
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="flex w-full min-h-screen flex-row-reverse">
      {/* Right Column - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-slate-950 pt-20 pb-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-sm lg:w-96 my-auto"
        >
          <div className="mb-5">
            <h2 className="text-xl sm:text-2xl font-bold font-sora text-slate-900 dark:text-white mb-1.5">Create Account</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Join Orbyt and choose your role.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">I am a...</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all ${
                    role === 'student'
                      ? 'border-[#273E57] bg-[#273E57]/5 text-[#273E57] dark:text-blue-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <GraduationCap className="h-4 w-4 mb-1" />
                  <span className="text-[10px] sm:text-xs font-medium">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all ${
                    role === 'employee'
                      ? 'border-[#273E57] bg-[#273E57]/5 text-[#273E57] dark:text-blue-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="h-4 w-4 mb-1" />
                  <span className="text-[10px] sm:text-xs font-medium">Employee</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border transition-all ${
                    role === 'admin'
                      ? 'border-[#273E57] bg-[#273E57]/5 text-[#273E57] dark:text-blue-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Shield className="h-4 w-4 mb-1" />
                  <span className="text-[10px] sm:text-xs font-medium">Admin</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#273E57] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#273E57] focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#273E57] focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg shadow-sm text-white bg-[#273E57] hover:bg-[#1f3145] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273E57] transition-all disabled:opacity-70 disabled:cursor-not-allowed font-medium text-sm active:scale-[0.98]"
            >
              {isPending ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>Create Account</>
              )}
            </button>
          </form>

          <div className="mt-5">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white dark:bg-slate-950 text-slate-500 font-medium">or</span>
              </div>
            </div>

            <div className="mt-4">
              <form action={signInWithGoogle}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273E57] transition-all font-medium text-sm active:scale-[0.98]"
                >
                  <svg className="h-4 w-4 mr-2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign up with Google
                </button>
              </form>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#273E57] dark:text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Left Column - Graphic */}
      <div className="hidden lg:flex flex-1 relative bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 items-center justify-center p-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#273E57]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#273E57]/10 via-transparent to-transparent pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg w-full text-center"
        >
          <div className="relative aspect-square w-full mb-6 drop-shadow-xl max-w-sm mx-auto">
            <Image 
              src="/undraw_welcome_nk8k.svg" 
              alt="Join Orbyt" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sora mb-2">Welcome to Orbyt</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
            Join the comprehensive campus operating system designed for the modern educational ecosystem.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
