import "server-only"
import { ClientTicker, CustomerStoryQuery, CustomerStorySlugsQuery, HeaderNavQuery, HeroQuery } from '@/types'
import { contentGqlFetcher } from './fetch'

export const getHeaderNav = async () => {
  const query = `#graphql
  query NavigationCollection($where: NavigationFilter) {
    navigationCollection(where: $where) {
      items {
        linksCollection {
          items {
            label
            url
          }
        }
      }
    }
  }
  `

  const data = await contentGqlFetcher<HeaderNavQuery>({ query, variables: {
      "where": {
        "name": "Header"
      }
    }
  })

  if (!data) {
    throw new Error('Failed to fetch header nav')
  }

  return data as HeaderNavQuery
}

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

  return data as HeroQuery
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

  return data as ClientTicker
}

export const getCustomerStorySlugs = async () => {
  const query = `#graphql
  query CustomerStorySlugsCollection {
  customerStoryCollection {
      items {
        slug
      }
    }
  }
  `

  const data = await contentGqlFetcher<CustomerStorySlugsQuery>({ query })

  if (!data) {
    throw new Error('Failed to fetch customer stories')
  }

  return data as CustomerStorySlugsQuery
}

export const getCustomerStory = async (slug: string) => {
  const query = `#graphql
  query CustomerStoryCollection($where: CustomerStoryFilter) {
  customerStoryCollection(where: $where) {
      items {
        title
        body {
          json
        }
        customer {
          name
          logo {
            width
            height
            url
            title
          }
        }
        slug
      }
    }
  }
  `

  const data = await contentGqlFetcher<CustomerStoryQuery>({ query, variables: {
      "where": {
        "slug": slug
      }
    }
  })

  if (!data) {
    throw new Error(`Failed to fetch customer story with slug: ${slug}`)
  }

  return data as CustomerStoryQuery
}
