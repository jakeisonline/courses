import { ClientTicker, HeroQuery } from '@/types'
import { contentGqlFetcher } from './fetch'

export const getHero = async () => {
  const query = `#graphql
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

export const getClientTicker = async () => {
  const query = `#graphql
  query AssetCollection($where: AssetFilter) {
    assetCollection(where: $where) {
      items {
        width
        height
        url
        title
        contentfulMetadata {
          tags {
            id
            name
          }
        }
      }
    }
  }
  `

  const data = await contentGqlFetcher<ClientTicker>({ query, variables: {
    "where": {
      "contentfulMetadata": {
        "tags": {
          "id_contains_all": "clientTicker"
        }
      }
    }
  }})

  if (!data) {
    throw new Error('Failed to fetch client ticker')
  }

  return data
}
