# ORBYT - The Intelligent Campus OS

## The Problem

Educational institutions struggle with fragmentation. Core operations run on dozens of disconnected systems—from attendance and fee portals to hostel management, placement trackers, and scattered communication channels like emails and WhatsApp groups. 

Simultaneously, campuses require strict safety measures, including emergency communication, women's safety protocols, incident reporting, and visitor management. Currently, these safety and operational layers are isolated from one another, leading to delayed emergency responses, inaccessible administrative information, and a poor experience for students, faculty, and administrators.

## Proposed Solution

**ORBYT** is a unified, AI-powered Smart College ERP & Campus Safety Platform. It replaces disjointed portals with a single intelligence layer that brings academics, campus services, and institutional safety into a unified operating system.

Instead of navigating multiple systems, students and staff can manage their campus life from one centralized platform:
- **Unified Academic & Operational Dashboards:** Centralized role-based portals for students, employees, and administrators to manage attendance, timetables, exams, fees, and clubs.
- **Integrated Campus Safety Layer:** Real-time incident reporting, SOS alerts, and emergency response workflows directly connected to campus administration and security.
- **AI-Powered Discovery & Assistance:** A context-aware intelligence layer that parses official institutional handbooks, matches students to relevant opportunities, and provides instant answers backed by official citations.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Frontend:** React 19, [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) (Animations)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Authentication)
- **State Management:** Zustand
- **AI Integration:** Google Generative AI (Gemini)

## System Architecture

ORBYT leverages a modern, server-first architecture tailored for security and speed:

1. **Next.js App Router:** Powers the application with hybrid rendering (Server & Client Components) for optimal performance and SEO on public pages.
2. **Role-Based Dashboards:** The application routing (`/dashboard/student`, `/dashboard/employee`, `/dashboard/admin`) is intrinsically linked to the user's role. 
3. **Supabase & Row Level Security (RLS):** Data access is strictly controlled at the database level. Students only ever fetch their own records (attendance, grades, complaints), while faculty and administration have elevated access based on RLS policies.
4. **Server-Side Data Aggregation:** The Admin Command Center uses secure server-side fetching with the `SERVICE_ROLE_KEY` to bypass client-side RLS safely. This allows for complex macro-analytics and campus-wide reporting without exposing sensitive keys to the browser.
5. **Localization Context:** A central `LanguageContext` drives the multilingual interface (English, Hindi, Tamil) without needing heavy third-party i18n libraries, keeping the bundle size small.

## Team: Black Squad

- **Prodhosh V S** - Lead
  - Software Engineer Intern at Annexra
  - Ex-intern at Sindra and Enlighted (Developer)
  - CTO of BSPrep - IITM BS Community
- **Mohamed Nawaz**
