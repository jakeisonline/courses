import { create } from "zustand"
import { INITIAL_ITEMS } from "../lib/constants"
import { persist } from "zustand/middleware"

export const useItemStore = create(
  persist(
    (set) => ({
      items: INITIAL_ITEMS,
      removeAllItems: () => {
        set(() => ({ items: [] }))
      },
      resetToInitial: () => {
        set(() => ({ items: INITIAL_ITEMS }))
      },
      addItem: (newItemText) => {
        set((state) => {
          const newItem = {
            id: new Date().getTime(),
            label: newItemText,
            packed: false,
          }
          const newItems = [...state.items, newItem]
          return { items: newItems }
        })
      },
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id)
          return { items: newItems }
        })
      },
      toggleItem: (id) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return { ...item, packed: !item.packed }
            }
            return item
          })
          return { items: newItems }
        })
      },
      markAllAsPacked: () => {
        set((state) => {
          const newItems = state.items.map((item) => ({
            ...item,
            packed: true,
          }))
          return { items: newItems }
        })
      },
      markAllAsUnpacked: () => {
        set((state) => {
          const newItems = state.items.map((item) => ({
            ...item,
            packed: false,
          }))
          return { items: newItems }
        })
      },
    }),
    {
      name: "items",
    },
  ),
)
