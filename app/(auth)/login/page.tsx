'use client'

import React, { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { login, signInWithGoogle } from '../actions'
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Column - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 pt-20 pb-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-sm lg:w-96 my-auto"
        >
          <div className="mb-5">
            <h2 className="text-xl sm:text-2xl font-bold font-sora text-slate-900  mb-1.5">Welcome Back</h2>
            <p className="text-slate-500  text-xs">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50  border border-red-200  rounded-xl text-red-600  text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700  mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-slate-200  rounded-lg bg-slate-50  text-slate-900  text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#273E57] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-medium text-slate-700 ">Password</label>
                  <Link href="#" className="text-xs font-medium text-[#273E57]  hover:underline">Forgot?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="block w-full pl-9 pr-3 py-2.5 border border-slate-200  rounded-lg bg-slate-50  text-slate-900  text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#273E57] focus:border-transparent transition-all"
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
                <>Sign In</>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 " />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-slate-50  text-slate-500 font-medium">or</span>
              </div>
            </div>

            <div className="mt-5">
              <form action={signInWithGoogle}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-200  rounded-lg shadow-sm bg-white  text-slate-700  hover:bg-slate-50 :bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273E57] transition-all text-sm font-medium active:scale-[0.98]"
                >
                  <svg className="h-4 w-4 mr-2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </form>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-600 ">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-[#273E57]  hover:underline">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Column - Graphic */}
      <div className="hidden lg:flex flex-1 relative bg-[#273E57]/5  border-l border-slate-200  items-center justify-center p-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#273E57]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#273E57]/10 via-transparent to-transparent pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg w-full text-center"
        >
          <div className="relative aspect-square w-full mb-6 drop-shadow-xl max-w-sm mx-auto">
            <Image 
              src="/undraw_security-on_3ykb.svg" 
              alt="Secure Login" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h3 className="text-xl font-bold text-slate-900  font-sora mb-2">Enterprise-Grade Security</h3>
          <p className="text-slate-600  max-w-sm mx-auto text-sm leading-relaxed">
            Your data is protected with industry-leading encryption and robust access controls.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
