"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      let { data, error } = await supabase.from("courses").select("*");
      if (error) console.error(error);
      else setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}
