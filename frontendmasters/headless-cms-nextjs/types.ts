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
