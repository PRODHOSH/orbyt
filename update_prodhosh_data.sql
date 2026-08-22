-- ==============================================================================
-- MASTER SEED SCRIPT FOR prodhoshlaptop@gmail.com
-- Run this in your Supabase SQL Editor. It completely populates all features.
-- ==============================================================================

-- 0. Schema updates just in case
ALTER TABLE public.timetable ADD COLUMN IF NOT EXISTS type TEXT;

-- 1. Ensure Profile Exists & Update It
-- This fixes the foreign key constraint error by ensuring your user actually 
-- has a profile row in public.profiles before we try inserting attendance/etc.
INSERT INTO public.profiles (id, full_name, role, department, year_of_study)
SELECT id, COALESCE(raw_user_meta_data->>'full_name', 'Prodhosh'), 'student', 'Computer Science', 3
FROM auth.users 
WHERE email = 'prodhoshlaptop@gmail.com'
ON CONFLICT (id) DO UPDATE 
SET department = 'Computer Science', 
    year_of_study = 3,
    role = 'student';

-- 2. CLEANUP (Prevents duplicate data if you run this multiple times)
DELETE FROM public.timetable WHERE department = 'Computer Science' AND year_of_study = 3;
DELETE FROM public.attendance WHERE student_id = (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com');
DELETE FROM public.leave_requests WHERE student_id = (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com');
DELETE FROM public.complaints WHERE submitted_by = (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com');
DELETE FROM public.hostel_allocations WHERE student_id = (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com');
DELETE FROM public.placement_applications WHERE student_id = (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com');
DELETE FROM public.fees WHERE student_id = (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com');
DELETE FROM public.sos_alerts WHERE triggered_by = (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com');

-- 3. TIMETABLE
INSERT INTO public.timetable (department, year_of_study, subject, type, room, building, day_of_week, start_time, end_time)
VALUES 
('Computer Science', 3, 'Advanced Data Structures', 'Lecture', 'Room 301', 'Block B', 0, '09:00:00', '10:30:00'),
('Computer Science', 3, 'Operating Systems', 'Lecture', 'Room 302', 'Block B', 0, '11:00:00', '12:30:00'),
('Computer Science', 3, 'Data Structures Lab', 'Lab', 'Lab 4', 'Block C', 0, '14:00:00', '16:00:00'),
('Computer Science', 3, 'Computer Networks', 'Lecture', 'Room 301', 'Block B', 1, '09:00:00', '10:30:00'),
('Computer Science', 3, 'Operating Systems', 'Lecture', 'Room 302', 'Block B', 1, '11:00:00', '12:00:00'),
('Computer Science', 3, 'Database Management', 'Lecture', 'Room 305', 'Block B', 2, '09:00:00', '10:00:00'),
('Computer Science', 3, 'Software Engineering', 'Lecture', 'Room 301', 'Block B', 2, '10:00:00', '11:00:00'),
('Computer Science', 3, 'Networks Lab', 'Lab', 'Lab 2', 'Block C', 2, '13:00:00', '15:00:00'),
('Computer Science', 3, 'Advanced Data Structures', 'Lecture', 'Room 301', 'Block B', 3, '10:00:00', '11:30:00'),
('Computer Science', 3, 'Database Management', 'Lecture', 'Room 305', 'Block B', 3, '14:00:00', '15:00:00'),
('Computer Science', 3, 'Software Engineering', 'Lecture', 'Room 301', 'Block B', 4, '09:00:00', '10:30:00'),
('Computer Science', 3, 'Computer Networks', 'Lecture', 'Room 301', 'Block B', 4, '11:00:00', '12:00:00'),
('Computer Science', 3, 'Mini Project', 'Lab', 'Lab 1', 'Block C', 4, '14:00:00', '17:00:00'),
('Computer Science', 3, 'AI Workshop', 'Lab', 'Innovation Center', 'Block A', 5, '09:00:00', '12:00:00'),
('Computer Science', 3, 'Placement Training', 'Lecture', 'Auditorium', 'Main Block', 5, '13:00:00', '15:00:00');

-- 4. ATTENDANCE (75% Overall simulated)
INSERT INTO public.attendance (student_id, subject, date, status)
VALUES 
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Advanced Data Structures', CURRENT_DATE - INTERVAL '1 day', 'present'),
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Advanced Data Structures', CURRENT_DATE - INTERVAL '2 days', 'absent'),
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Advanced Data Structures', CURRENT_DATE - INTERVAL '3 days', 'present'),
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Operating Systems', CURRENT_DATE - INTERVAL '1 day', 'present'),
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Operating Systems', CURRENT_DATE - INTERVAL '2 days', 'present'),
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Computer Networks', CURRENT_DATE - INTERVAL '3 days', 'present'),
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Database Management', CURRENT_DATE - INTERVAL '4 days', 'late');

-- 5. LEAVE REQUESTS
INSERT INTO public.leave_requests (student_id, reason, leave_type, start_date, end_date, status)
VALUES 
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Family function in hometown', 'family', CURRENT_DATE + INTERVAL '5 days', CURRENT_DATE + INTERVAL '7 days', 'pending'),
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'Severe fever', 'sick', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE - INTERVAL '8 days', 'approved');

-- 6. COMPLAINTS
INSERT INTO public.complaints (submitted_by, category, subject, description, status, priority)
VALUES 
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'infrastructure', 'Broken AC in Lab 4', 'The AC is leaking water and not cooling during the Data Structures lab.', 'in_progress', 'medium'),
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'hostel', 'Wi-Fi issues in Block B', 'Unable to connect to campus Wi-Fi from my room since yesterday.', 'open', 'high');

-- 7. PLACEMENTS
WITH inserted_drive AS (
  INSERT INTO public.placement_drives (company_name, role_title, package_lpa, drive_date, status)
  VALUES ('Google', 'Software Engineer Intern', 24.5, CURRENT_DATE + INTERVAL '30 days', 'upcoming')
  RETURNING id
)
INSERT INTO public.placement_applications (drive_id, student_id, status)
SELECT id, (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'applied' FROM inserted_drive;

-- 8. HOSTEL ALLOCATION
WITH inserted_room AS (
  INSERT INTO public.hostel_rooms (hostel_block, room_number, floor, room_type)
  VALUES ('Block B', 'B-304', 3, 'shared')
  ON CONFLICT (hostel_block, room_number) DO UPDATE SET capacity=2
  RETURNING id
)
INSERT INTO public.hostel_allocations (student_id, room_id, academic_year, status)
SELECT (SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), id, '2025-2026', 'active' FROM inserted_room;

-- 9. GLOBAL DATA (Transport, Announcements, Clubs)
-- Check if route exists to avoid duplicates
INSERT INTO public.transport_routes (route_name, bus_number, driver_name, driver_phone, stops)
SELECT 'City Center Route', 'TN-01-AB-1234', 'Ramesh', '+91 9876543210', '[{"name": "Central Station", "time": "07:30"}, {"name": "Campus Gate", "time": "08:15"}]'
WHERE NOT EXISTS (SELECT 1 FROM public.transport_routes WHERE route_name = 'City Center Route');

INSERT INTO public.announcements (title, content, target_role, priority)
SELECT 'Exam Schedule Released', 'The end-semester exam schedule for Year 3 Computer Science has been published.', 'all', 'high'
WHERE NOT EXISTS (SELECT 1 FROM public.announcements WHERE title = 'Exam Schedule Released');

INSERT INTO public.clubs (name, description, category, is_recruiting, recruitment_deadline, recruitment_description)
SELECT 'Microsoft Innovations Club', 'A community of ML engineers and developers building the future.', 'technical', TRUE, CURRENT_DATE + INTERVAL '2 days', 'Looking for ML Engineers'
WHERE NOT EXISTS (SELECT 1 FROM public.clubs WHERE name = 'Microsoft Innovations Club');

INSERT INTO public.clubs (name, description, category, is_recruiting, recruitment_deadline, recruitment_description)
SELECT 'Campus Hackathon 2026', 'Build innovative campus solutions over 48 hours.', 'technical', TRUE, CURRENT_DATE + INTERVAL '30 days', 'Open to All'
WHERE NOT EXISTS (SELECT 1 FROM public.clubs WHERE name = 'Campus Hackathon 2026');

-- 10. FEES
INSERT INTO public.fees (student_id, fee_type, amount, due_date, status)
VALUES
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'tuition', 75000, CURRENT_DATE + INTERVAL '10 days', 'pending');

-- 11. SOS ALERTS
INSERT INTO public.sos_alerts (triggered_by, alert_type, location, description, status)
VALUES
((SELECT id FROM auth.users WHERE email = 'prodhoshlaptop@gmail.com'), 'other', 'Block C Entrance', 'Maintenance work near Block C entrance. Please use alternative route.', 'active');
