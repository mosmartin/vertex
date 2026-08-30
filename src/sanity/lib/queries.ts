import { defineQuery } from 'next-sanity'

// ---- Catalog ----

export const COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    instructor->{name, "slug": slug.current, photo},
    category->{title, "slug": slug.current},
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)]{"slug": slug.current}
`)

// ---- Course detail ----

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    learningOutcomes[]{_key, icon, title, description},
    instructor->{_id, name, "slug": slug.current, photo, expertise, bio},
    category->{_id, title, "slug": slug.current},
    modules[]{
      _key,
      title,
      summary,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        freePreview,
        studentCount,
        poster,
      },
    },
  }
`)

// ---- Lesson detail ----

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    poster,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[]{_key, type, title, description, url},
  }
`)

export const LESSON_SLUGS_QUERY = defineQuery(`
  *[_type == "lesson" && defined(slug.current)]{"slug": slug.current}
`)

// A lesson does not store its parent course, so the course (and the
// module/lesson each lesson belongs to) is derived with a reverse
// reference lookup. Module/lesson numbering is derived from array order
// in the frontend, not queried.
export const COURSE_FOR_LESSON_QUERY = defineQuery(`
  *[_type == "course" && references($lessonId)][0]{
    _id,
    title,
    "slug": slug.current,
    modules[]{
      _key,
      title,
      lessons[]->{_id, "slug": slug.current},
    },
  }
`)

// ---- Instructors ----

export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
  }
`)

export const INSTRUCTOR_SLUGS_QUERY = defineQuery(`
  *[_type == "instructor" && defined(slug.current)]{"slug": slug.current}
`)

export const COURSES_BY_INSTRUCTOR_QUERY = defineQuery(`
  *[_type == "course" && instructor._ref == $instructorId] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    coverImage,
    level,
    studentCount,
  }
`)

// ---- Categories ----

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
  }
`)
