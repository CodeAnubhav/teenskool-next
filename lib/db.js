import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// We use the client component client for Client-Side requests.
// For Server Components, we would use createServerComponentClient.
const supabase = createClientComponentClient();

// --- USER & PROFILE ---
export async function getProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) console.error("Error fetching profile:", error);
    return data;
}

export async function updateProfile(userId, updates) {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// --- ADMIN ONLY ---
export async function getAllProfiles(searchQuery = '', limit = 50) {
    let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (searchQuery) {
        // Search in full_name OR email
        query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
}

export async function getRecentMembers(limit = 4) {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, created_at, xp, system_role')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching recent members:", error);
        return [];
    }
    return data;
}

export async function updateUserRole(targetUserId, newRole) {
    const { data, error } = await supabase
        .from('profiles')
        .update({ system_role: newRole })
        .eq('id', targetUserId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function adminEnrollUser(targetUserId, courseId) {
    // Admins can force-enroll others
    const { data, error } = await supabase
        .from('enrollments')
        .insert([{ user_id: targetUserId, course_id: courseId }])
        .select()
        .single();

    if (error) {
        if (error.code === '23505') return null; // Already enrolled
        throw error;
    }
    return data;
}

// --- COURSES (Read) ---
export async function getAllCourses(publishedOnly = true) {
    let query = supabase.from('courses').select('*');

    if (publishedOnly) {
        query = query.eq('is_published', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function getCourseById(courseId) {
    const { data, error } = await supabase
        .from('courses')
        .select(`
            *,
            lessons (*)
        `)
        .eq('id', courseId)
        .single();

    if (error) throw error;

    // Sort lessons by order
    if (data?.lessons) {
        data.lessons.sort((a, b) => a.order_index - b.order_index);
    }

    return data;
}

// --- COURSES (Write - Admin) ---
export async function createCourse(courseData) {
    const { data, error } = await supabase
        .from('courses')
        .insert([courseData])
        .select()
        .single();

    if (error) throw error;
    return data;
}

// --- ENROLLMENTS ---
export async function getMyEnrollments(userId) {
    // Fetch courses the user is enrolled in
    const { data, error } = await supabase
        .from('enrollments')
        .select(`
            *,
            course:courses (
                *,
                lessons (id)
            )
        `)
        .eq('user_id', userId);

    if (error) throw error;
    return data;
}

export async function getEnrollment(userId, courseId) {
    const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'not found'
    return data;
}

export async function markLessonComplete(enrollmentId, lessonId) {
    // 1. Get current array
    const { data: current, error: fetchError } = await supabase
        .from('enrollments')
        .select('completed_lesson_ids')
        .eq('id', enrollmentId)
        .single();

    if (fetchError) throw fetchError;

    const existing = current.completed_lesson_ids || [];
    const lessonIdStr = String(lessonId);
    if (existing.includes(lessonIdStr)) return existing; // Already done

    const updated = [...existing, lessonIdStr];

    // 2. Update
    const { data, error } = await supabase
        .from('enrollments')
        .update({ completed_lesson_ids: updated })
        .eq('id', enrollmentId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function enrollInCourse(userId, courseId) {
    const { data, error } = await supabase
        .from('enrollments')
        .insert([{ user_id: userId, course_id: courseId }])
        .select()
        .single();

    if (error) {
        // Ignore unique constraint error if already enrolled
        if (error.code === '23505') return null;
        throw error;
    }
    return data;
}

export async function updateCourse(courseId, updates) {
    const { data, error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', courseId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteCourse(courseId) {
    const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

    if (error) throw error;
    return true;
}
