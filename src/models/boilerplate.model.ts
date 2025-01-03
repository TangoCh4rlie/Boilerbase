import type { User } from '@/models/user.model'
import type { Like } from '@/models/like.model'

export interface Boilerplate {
  id: number
  name: string
  githubName: string
  description: string
  gitUrl: string
  languages: string[]
  features: string[]
  logo: string
  likesCounter: number
  usesCounter: number
  authorId: string
  author?: User
  likes?: Like[]
  createdAt: Date
  liked?: boolean
  defaultBranch: string
}

export interface CreateBoilerplate {
  name: string;
  description: string;
  gitUrl: string;
  languages: string[];
  features: string[];
  likesCounter?: number;
  usesCounter?: number;
  authorId: string;
  logo?: string;
  defaultBranch: string;
  githubName: string;
}
