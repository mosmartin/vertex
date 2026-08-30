import {PlayIcon} from '@sanity/icons/Play'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'A YouTube, Vimeo, or Bunny video URL.',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Display duration, e.g. "12:34".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'freePreview',
      title: 'Free preview',
      type: 'boolean',
      description: 'Label only — does not gate access.',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'blockContent',
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key points',
      description: 'Short bullets for the "in this lesson you will" section.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [defineArrayMember({type: 'resource'})],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'duration', media: 'poster'},
  },
})
