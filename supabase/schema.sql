-- ============================================================
-- ORBYT Campus OS — Complete Supabase Schema
-- ============================================================

-- Extension for UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES (core user table)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('student', 'employee', 'admin')),
    department TEXT,
    year_of_study INTEGER,
    skills TEXT[],
    designation TEXT,
    phone_number TEXT,
    avatar_url TEXT,
    is_onboarded BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 2. ATTENDANCE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')),
    marked_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_student ON public.attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);

-- ============================================================
-- 3. TIMETABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.timetable (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department TEXT NOT NULL,
    year_of_study INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Mon
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    subject TEXT NOT NULL,
    faculty_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    room TEXT,
    building TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_timetable_dept ON public.timetable(department, year_of_study);

-- ============================================================
-- 4. COMPLAINTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submitted_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN (
        'academic', 'hostel', 'transport', 'infrastructure',
        'harassment', 'ragging', 'faculty', 'other'
    )),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'dismissed')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    resolution_notes TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_complaints_status ON public.complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_submitted ON public.complaints(submitted_by);

-- ============================================================
-- 5. TRANSPORT
-- ============================================================
CREATE TABLE IF NOT EXISTS public.transport_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_name TEXT NOT NULL,
    bus_number TEXT NOT NULL,
    driver_name TEXT,
    driver_phone TEXT,
    stops JSONB NOT NULL DEFAULT '[]',  -- [{name, time, lat, lng}]
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 6. HOSTEL
-- ============================================================
CREATE TABLE IF NOT EXISTS public.hostel_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hostel_block TEXT NOT NULL,
    room_number TEXT NOT NULL,
    floor INTEGER NOT NULL,
    capacity INTEGER DEFAULT 2,
    room_type TEXT DEFAULT 'shared' CHECK (room_type IN ('single', 'shared', 'triple')),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(hostel_block, room_number)
);

CREATE TABLE IF NOT EXISTS public.hostel_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    room_id UUID REFERENCES public.hostel_rooms(id) ON DELETE SET NULL,
    academic_year TEXT NOT NULL,
    check_in_date DATE,
    check_out_date DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'vacated', 'pending')),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.hostel_complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    room_id UUID REFERENCES public.hostel_rooms(id) ON DELETE SET NULL,
    issue_type TEXT NOT NULL CHECK (issue_type IN (
        'plumbing', 'electrical', 'furniture', 'pest', 'cleaning', 'noise', 'other'
    )),
    description TEXT,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 7. PLACEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.placement_drives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    package_lpa DECIMAL,
    eligibility_criteria JSONB DEFAULT '{}', -- {min_cgpa, departments[], year}
    drive_date DATE,
    registration_deadline DATE,
    description TEXT,
    status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.placement_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drive_id UUID REFERENCES public.placement_drives(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'shortlisted', 'interview', 'selected', 'rejected')),
    applied_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(drive_id, student_id)
);

-- ============================================================
-- 8. VISITORS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visitor_name TEXT NOT NULL,
    visitor_phone TEXT,
    purpose TEXT NOT NULL,
    visiting_whom TEXT,
    department TEXT,
    id_proof_type TEXT,
    id_proof_number TEXT,
    check_in TIMESTAMPTZ DEFAULT now(),
    check_out TIMESTAMPTZ,
    status TEXT DEFAULT 'checked_in' CHECK (status IN ('pending', 'approved', 'checked_in', 'checked_out', 'rejected')),
    approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 9. SOS ALERTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.sos_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    triggered_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    alert_type TEXT DEFAULT 'emergency' CHECK (alert_type IN ('emergency', 'medical', 'fire', 'harassment', 'other')),
    location TEXT,
    latitude DECIMAL,
    longitude DECIMAL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'responding', 'resolved', 'false_alarm')),
    responded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

-- ============================================================
-- 10. SAFETY INCIDENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.safety_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    incident_type TEXT NOT NULL CHECK (incident_type IN (
        'harassment', 'theft', 'vandalism', 'accident', 'fire',
        'medical', 'suspicious_activity', 'infrastructure', 'other'
    )),
    description TEXT,
    location TEXT,
    severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
    is_anonymous BOOLEAN DEFAULT FALSE,
    evidence_urls TEXT[],
    reported_at TIMESTAMPTZ DEFAULT now(),
    resolved_at TIMESTAMPTZ
);

-- ============================================================
-- 11. LEAVE REQUESTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.leave_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    leave_type TEXT NOT NULL CHECK (leave_type IN ('sick', 'personal', 'family', 'event', 'other')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    supporting_doc_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 12. FEES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    fee_type TEXT NOT NULL CHECK (fee_type IN ('tuition', 'hostel', 'transport', 'exam', 'library', 'other')),
    amount DECIMAL NOT NULL,
    due_date DATE NOT NULL,
    paid_amount DECIMAL DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'partial', 'paid', 'overdue')),
    payment_date TIMESTAMPTZ,
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 13. CLUBS & RECRUITMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('technical', 'cultural', 'sports', 'social', 'academic', 'other')),
    logo_url TEXT,
    is_recruiting BOOLEAN DEFAULT FALSE,
    recruitment_deadline DATE,
    recruitment_description TEXT,
    contact_email TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 14. EXAM SCHEDULE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.exam_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department TEXT NOT NULL,
    year_of_study INTEGER NOT NULL,
    subject TEXT NOT NULL,
    exam_type TEXT NOT NULL CHECK (exam_type IN ('internal', 'midterm', 'final', 'practical', 'viva')),
    exam_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    room TEXT,
    building TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 15. ANNOUNCEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    target_role TEXT DEFAULT 'all' CHECK (target_role IN ('all', 'student', 'employee', 'admin')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_pinned BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostel_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hostel_complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_drives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update own profile, admins can read all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Attendance: students see own, employees/admins see all
CREATE POLICY "Students view own attendance" ON public.attendance FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Staff can manage attendance" ON public.attendance FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('employee', 'admin'))
);

-- Timetable: everyone can read
CREATE POLICY "Anyone can view timetable" ON public.timetable FOR SELECT USING (true);
CREATE POLICY "Admins can manage timetable" ON public.timetable FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Complaints: users see own, assigned staff sees assigned, admins see all
CREATE POLICY "Users see own complaints" ON public.complaints FOR SELECT USING (submitted_by = auth.uid());
CREATE POLICY "Users can submit complaints" ON public.complaints FOR INSERT WITH CHECK (submitted_by = auth.uid());
CREATE POLICY "Staff see assigned complaints" ON public.complaints FOR SELECT USING (assigned_to = auth.uid());
CREATE POLICY "Admins manage all complaints" ON public.complaints FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Transport: everyone can read
CREATE POLICY "Anyone can view transport" ON public.transport_routes FOR SELECT USING (true);

-- Hostel: students see own allocation, admins manage all
CREATE POLICY "Students view own hostel" ON public.hostel_allocations FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Anyone can view rooms" ON public.hostel_rooms FOR SELECT USING (true);
CREATE POLICY "Students view own hostel complaints" ON public.hostel_complaints FOR SELECT USING (student_id = auth.uid());
CREATE POLICY "Students can submit hostel complaints" ON public.hostel_complaints FOR INSERT WITH CHECK (student_id = auth.uid());

-- Placements: everyone can view drives, students manage own applications
CREATE POLICY "Anyone can view drives" ON public.placement_drives FOR SELECT USING (true);
CREATE POLICY "Students manage own applications" ON public.placement_applications FOR ALL USING (student_id = auth.uid());

-- Visitors: admins manage
CREATE POLICY "Admins manage visitors" ON public.visitors FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- SOS: users can trigger, admins/employees can view all
CREATE POLICY "Users can trigger SOS" ON public.sos_alerts FOR INSERT WITH CHECK (triggered_by = auth.uid());
CREATE POLICY "Users see own SOS" ON public.sos_alerts FOR SELECT USING (triggered_by = auth.uid());
CREATE POLICY "Staff see all SOS" ON public.sos_alerts FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('employee', 'admin'))
);

-- Safety Incidents: users can report, staff can view all
CREATE POLICY "Users can report incidents" ON public.safety_incidents FOR INSERT WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "Users see own incidents" ON public.safety_incidents FOR SELECT USING (reporter_id = auth.uid());
CREATE POLICY "Staff see all incidents" ON public.safety_incidents FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('employee', 'admin'))
);

-- Leave: students manage own, employees can view/update
CREATE POLICY "Students manage own leaves" ON public.leave_requests FOR ALL USING (student_id = auth.uid());
CREATE POLICY "Staff manage leaves" ON public.leave_requests FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('employee', 'admin'))
);

-- Fees: students see own
CREATE POLICY "Students view own fees" ON public.fees FOR SELECT USING (student_id = auth.uid());

-- Clubs: everyone can view
CREATE POLICY "Anyone can view clubs" ON public.clubs FOR SELECT USING (true);

-- Exams: everyone can view
CREATE POLICY "Anyone can view exams" ON public.exam_schedule FOR SELECT USING (true);

-- Announcements: role-filtered
CREATE POLICY "Users view relevant announcements" ON public.announcements FOR SELECT USING (
    target_role = 'all' OR target_role = (SELECT role FROM public.profiles WHERE id = auth.uid())
);
CREATE POLICY "Staff can create announcements" ON public.announcements FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('employee', 'admin'))
);
