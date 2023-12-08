import { RootState } from "@/store"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useSelector } from "react-redux"

/**
 * 自訂 APP 使用的 useSelector，讓 useSelector 有 RootState type，就不用每次使用時都要再寫一次
 */
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default useAppSelector
