import { AppDispatch } from "@/store"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch } from "react-redux"

/**
 * 自訂 APP 使用的 useDispatch，讓 useDispatch 可以使用 AppDispatch type，就不用每次使用時都要再寫一次
 */
const useAppDispatch: () => AppDispatch = useDispatch
export default useAppDispatch
