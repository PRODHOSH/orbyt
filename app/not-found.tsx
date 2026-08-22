'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#273E57]/10 blur-[100px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[30%] h-[50%] rounded-full bg-[#273E57]/10 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-2xl text-center flex flex-col items-center"
      >
        <div className="relative w-full max-w-md aspect-video mb-8">
          <Image 
            src="/undraw_page-not-found_6wni (1).svg" 
            alt="404 Page Not Found" 
            fill
            className="object-contain"
          />
        </div>
        
        <h1 className="text-6xl font-bold font-sora text-[#273E57] dark:text-white mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold font-sora text-slate-900 dark:text-slate-100 mb-4">
          We lost this page
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 text-lg">
          We searched everywhere but couldn't find what you're looking for. Let's find a better place for you to go.
        </p>

        <Link href="/" className="inline-flex items-center justify-center py-3.5 px-6 rounded-xl shadow-md text-white bg-[#273E57] hover:bg-[#1f3145] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#273E57] transition-all font-medium text-base active:scale-[0.98]">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  )
}
