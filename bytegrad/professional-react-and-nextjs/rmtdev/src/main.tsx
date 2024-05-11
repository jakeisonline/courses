import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App.tsx"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import BookmarksContextProvider from "./contexts/BookmarkContextProvider.tsx"
import CurrentJobContextProvider from "./contexts/CurrentJobContextProvider.tsx"
import SearchTextContextProvider from "./contexts/SearchTextContextProvider.tsx"
import JobItemsContextProvider from "./contexts/JobItemsContextProvider.tsx"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <CurrentJobContextProvider>
          <SearchTextContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTextContextProvider>
        </CurrentJobContextProvider>
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
