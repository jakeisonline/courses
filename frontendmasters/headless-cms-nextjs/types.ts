export type HeaderNavQuery = {
  navigationCollection: {
    items: {
      linksCollection: {
        items: {
          label: string
          url: string
        }[]
      }
    }[]
  }
}

export type HeroQuery = {
    heroCollection: {
    items: {
      subtitle: string
      preTitle: string
      title: string
      callToActtionsCollection: {
        items: {
          label: string
          url: string
        }[]
      }
    }[]
  }
}

export type ClientTicker = {
  assetCollection: {
    items: {
      width: number
      height: number
      url: string
      title: string
      contentfulMetadata: {
        tags: {
          id: string
          name: string
        }[]
      }
    }[]
  }
}

export type CustomerStorySlugsQuery = {
  customerStoryCollection: {
    items: {
      slug: string
    }[]
  }
}

export type CustomerStoryQuery = {
  customerStoryCollection: {
    items: {
      title: string
      body: {
        json: any
      }
      customer: {
        name: string
        logo: {
          width: number
          height: number
          url: string
          title: string
        }
      }
      slug: string
    }[]
  }
}
