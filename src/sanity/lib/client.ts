import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { token } from './token'

// Server-only: the dataset is private, and this client carries the read
// token. Never import this module from a Client Component.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  perspective: 'published',
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
