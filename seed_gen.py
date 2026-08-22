import uuid
import random

def random_id():
    return str(uuid.uuid4())

roles = ['student', 'employee', 'admin']
departments = ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Administration', 'HR', 'Finance']
sections = ['A', 'B', 'C', 'D']
years = [1, 2, 3, 4]
statuses = ['Active', 'On Leave', 'Graduated']

students = []
for i in range(1, 101):
    id_str = f'00000000-0000-4000-a000-000000000{i:03d}'
    name = f'Student {i}'
    dept = random.choice(departments[:5])
    year = random.choice(years)
    students.append((id_str, name, 'student', dept, year, f'https://api.dicebear.com/7.x/avataaars/svg?seed={name.replace(" ", "")}'))

employees = []
for i in range(1, 31):
    id_str = f'00000000-0000-4000-b000-000000000{i:03d}'
    name = f'Prof. Employee {i}'
    dept = random.choice(departments)
    employees.append((id_str, name, 'employee', dept, 'NULL', f'https://api.dicebear.com/7.x/avataaars/svg?seed={name.replace(" ", "")}'))

admins = []
for i in range(1, 11):
    id_str = f'00000000-0000-4000-c000-000000000{i:03d}'
    name = f'Admin User {i}'
    dept = 'Administration'
    admins.append((id_str, name, 'admin', dept, 'NULL', f'https://api.dicebear.com/7.x/avataaars/svg?seed={name.replace(" ", "")}'))

all_profiles = students + employees + admins

sql_lines = []
sql_lines.append('-- FAKE DATA SEED FOR HACKATHON DEMONSTRATION')

sql_lines.append('-- 0. Insert Dummy Auth Users (to satisfy foreign keys)')
sql_lines.append('INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)')
sql_lines.append('VALUES ')
auth_vals = []
for p in all_profiles:
    email = p[1].lower().replace(" ", "") + "@orbyt.edu"
    auth_vals.append(f"  ('00000000-0000-0000-0000-000000000000', '{p[0]}', 'authenticated', 'authenticated', '{email}', 'dummy_encrypted_password', CURRENT_TIMESTAMP, '{{}}', '{{}}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)")
sql_lines.append(',\n'.join(auth_vals))
sql_lines.append('ON CONFLICT (id) DO NOTHING;\n')

sql_lines.append('-- 1. Insert Dummy Profiles')
sql_lines.append('INSERT INTO public.profiles (id, full_name, role, department, year_of_study, avatar_url, is_onboarded)')
sql_lines.append('VALUES ')
values = []
for p in all_profiles:
    year_str = str(p[4]) if p[4] != 'NULL' else 'NULL'
    values.append(f"  ('{p[0]}', '{p[1]}', '{p[2]}', '{p[3]}', {year_str}, '{p[5]}', true)")
sql_lines.append(',\n'.join(values))
sql_lines.append('ON CONFLICT (id) DO NOTHING;\n')

# 2. Visitors
sql_lines.append('-- 2. Insert Dummy Visitors')
sql_lines.append('INSERT INTO public.visitors (id, visitor_name, purpose, visiting_whom, status)')
sql_lines.append('VALUES ')
v_vals = []
for i in range(45):
    status = random.choice(['checked_in', 'pending', 'checked_out'])
    v_vals.append(f"  ('{random_id()}', 'Visitor {i}', 'Meeting', '{random.choice(employees)[1]}', '{status}')")
sql_lines.append(',\n'.join(v_vals))
sql_lines.append('ON CONFLICT (id) DO NOTHING;\n')

# 3. Complaints
sql_lines.append('-- 3. Insert Dummy Complaints')
sql_lines.append('INSERT INTO public.complaints (id, submitted_by, category, subject, description, status)')
sql_lines.append('VALUES ')
c_vals = []
categories = ['infrastructure', 'hostel', 'other'] # Matching schema categories
for i in range(35):
    user = random.choice(students)[0]
    status = random.choice(['open', 'in_progress', 'resolved']) # Lowercase per schema
    c_vals.append(f"  ('{random_id()}', '{user}', '{random.choice(categories)}', 'Issue {i}', 'Description of issue {i}', '{status}')")
sql_lines.append(',\n'.join(c_vals))
sql_lines.append('ON CONFLICT (id) DO NOTHING;\n')

# 4. SOS Alerts
sql_lines.append('-- 4. Insert Dummy SOS Alerts')
sql_lines.append('INSERT INTO public.sos_alerts (id, triggered_by, alert_type, location, status)')
sql_lines.append('VALUES ')
s_vals = []
for i in range(12):
    user = random.choice(students)[0]
    s_vals.append(f"  ('{random_id()}', '{user}', 'emergency', 'Campus Location {i}', 'active')")
sql_lines.append(',\n'.join(s_vals))
sql_lines.append('ON CONFLICT (id) DO NOTHING;\n')

# 5. Leave Requests
sql_lines.append('-- 5. Insert Dummy Leave Requests')
sql_lines.append('INSERT INTO public.leave_requests (id, student_id, reason, leave_type, start_date, end_date, status)')
sql_lines.append('VALUES ')
l_vals = []
for i in range(50):
    user = random.choice(students)[0]
    status = random.choice(['pending', 'approved', 'rejected'])
    l_vals.append(f"  ('{random_id()}', '{user}', 'Personal reason {i}', 'sick', CURRENT_DATE, CURRENT_DATE + INTERVAL '2 days', '{status}')")
sql_lines.append(',\n'.join(l_vals))
sql_lines.append('ON CONFLICT (id) DO NOTHING;\n')

with open('supabase/seed.sql', 'w') as f:
    f.write('\n'.join(sql_lines))
