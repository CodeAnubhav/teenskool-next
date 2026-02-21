import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

// --- PUBLIC BLOGS (Read) ---
export async function getAllBlogs(publishedOnly = true) {
    let query = supabase.from('blogs').select('*, author:profiles(id, full_name, avatar_url)');

    if (publishedOnly) {
        query = query.eq('is_published', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

export async function getBlogBySlug(slug, publishedOnly = true) {
    let query = supabase.from('blogs').select('*, author:profiles(id, full_name, avatar_url)').eq('slug', slug);

    if (publishedOnly) {
        query = query.eq('is_published', true);
    }

    const { data, error } = await query.single();
    if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
    }
    return data;
}

// --- ADMIN BLOGS (Read / Write) ---
export async function getBlogById(id) {
    const { data, error } = await supabase.from('blogs').select('*, author:profiles(id, full_name, avatar_url)').eq('id', id).single();
    if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
    }
    return data;
}

export async function createBlog(blogData) {
    const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateBlog(id, updates) {
    const { data, error } = await supabase
        .from('blogs')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteBlog(id) {
    const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

    if (error) throw error;
    return true;
}
