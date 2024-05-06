import { create } from "zustand"
import { TFeedbackItem } from "../lib/types"
import { FEEDBACK_ENDPOINT } from "../lib/constants"

type Store = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  selectedCompany: string
  selectCompany: (company: string) => void
  getCompanyList: () => string[]
  getFilteredFeedbackItems: () => TFeedbackItem[]
  addItemToList: (text: string) => void
  fetchFeedbackItems: () => void
}

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index
      })
  },
  getFilteredFeedbackItems: () => {
    const selectedCompany = get().selectedCompany
    return get().selectedCompany
      ? get().feedbackItems.filter((item) => item.company === selectedCompany)
      : get().feedbackItems
  },
  selectCompany: (company: string) => set({ selectedCompany: company }),
  addItemToList: (text: string) => {
    const companyName = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1)
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.charAt(0).toUpperCase(),
    }

    set((state) => ({ feedbackItems: [newItem, ...state.feedbackItems] }))

    fetch(FEEDBACK_ENDPOINT, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
  },
  fetchFeedbackItems: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch(FEEDBACK_ENDPOINT)
      const data = await response.json()
      if (!response.ok) {
        throw new Error("There was an error when fetching the feedbacks.")
      }
      set({ feedbackItems: data.feedbacks })
    } catch (error) {
      set({ errorMessage: "Bad things happened." })
    } finally {
      set({ isLoading: false })
    }
  },
}))
