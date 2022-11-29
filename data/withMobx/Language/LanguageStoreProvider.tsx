import { languageCodes } from '@/data/language/data';
import LanguageDisplay from '@/data/language/LanguageDisplay';
import { LanguageCode } from '@/data/language/type';
import { createContext, useContext } from 'react'

let languageStore: LanguageDisplay;

export const StoreContext = createContext<LanguageDisplay>({} as LanguageDisplay)

export function useLanguageStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return context
}

interface LanguageInitData {
  langCode: LanguageCode
}

function initializeLanguageStore(languageInitData: LanguageInitData | undefined) {
  const _languageStore = languageStore ?? new LanguageDisplay(languageCodes)

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (languageInitData) {
    if (typeof window == 'undefined' || !_languageStore.setLangCodeFromLocalStorage()) {
      _languageStore.setLangCodeFromServer(languageInitData.langCode)
    }
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _languageStore

  // Create the store once in the client
  if (!languageStore) languageStore = _languageStore

  return _languageStore
}

interface LanguageStoreProviderProps {
  children: React.ReactNode,
  languageInitData: LanguageInitData
}

export function LanguageStoreProvider({ children, languageInitData }: LanguageStoreProviderProps) {
  const languageStore = initializeLanguageStore(languageInitData)

  return <StoreContext.Provider value={languageStore}>{children}</StoreContext.Provider>
}