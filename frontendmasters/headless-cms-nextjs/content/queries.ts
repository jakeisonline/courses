import { HeroQuery } from '@/types'
import { contentGqlFetcher } from './fetch'

export const getHero = async () => {
  const query = `#queryql
  query HeroCollection {
    heroCollection {
      items {
        subtitle
        preTitle
        title
        callToActtionsCollection {
          items {
            label
            url
          }
        }
      }
    }
  }
  `

  const data = await contentGqlFetcher<HeroQuery>({ query })

  if (!data) {
    throw new Error('Failed to fetch hero')
  }

  return data
}
