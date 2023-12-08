import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

// 在 React 中當元件的 Props 或 State 改變時，元件會重新渲染包含子元件，因此如果使用將資料定義在和使用 Provider 的元件一起會導致子元件也會重新渲染，因此在使用 Context 時，建議將資料定義在 custom Provider 元件中，並將子元件當成 Props 傳進來（一種 composition 的優化作法），這麼一來可確保當 context 的資料改變時只有使用到的子元件會 re-render

// 定義 Context 的型別
interface ICountContextData {
  count: number
  addCount: () => void
}

// 建立 Context
const countContext = createContext<ICountContextData | undefined>(undefined)

// 建立 Provider 元件
const DevCountProvider = ({
  defaultCunt,
  children,
}: PropsWithChildren<{
  defaultCunt: number
}>) => {
  // 定義 context 的資料
  const [count, setCount] = useState(defaultCunt)

  // 使用 useCallback 確保當 countProvider 元件重新渲染時，addCount 不會重新建立
  const addCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1)
  }, [])

  // 使用 useMemo 確保當 countProvider 元件重新渲染時，countContextData 不會重新建立導致有使用到的子元件也會重新渲染(即使 count 沒有改變)
  const countContextData: ICountContextData = useMemo(() => {
    return {
      count,
      addCount,
    } as ICountContextData
  }, [addCount, count])

  return (
    <countContext.Provider value={countContextData}>
      {children}
    </countContext.Provider>
  )
}

// 由於一開始的 countContext 是 undefined，因此在使用時需要確保不是 undefined，所以自訂一個 hook 使用時確保使用 useContext 時不是 undefined
export function useCounter() {
  const counterContextData = useContext(countContext)

  // 確保 counterContext 不會是空的
  if (counterContextData === undefined) {
    throw new Error("useCounter must be used within a CounterProvider")
  }

  return counterContextData
}

export default DevCountProvider
