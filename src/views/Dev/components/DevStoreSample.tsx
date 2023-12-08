import { decrement, increment } from "@/store/slices/counterSlice"
import useAppDispatch from "@/utils/hooks/useAppDispatch"
import useAppSelector from "@/utils/hooks/useAppSelector"

export default function DevStoreSample() {
  const counter = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="example">
      <h1 className="example__title">Redux Toolkit</h1>
      <div className="example__section shadow-box">
        <div className="example__option btn-group">
          <button
            className="btn btn--primary"
            onClick={() => {
              dispatch(increment())
            }}
          >
            +
          </button>
          <button
            className="btn btn--secondary"
            onClick={() => {
              dispatch(decrement())
            }}
          >
            -
          </button>
        </div>
        <div className="example__result">Result : {counter}</div>
      </div>
    </div>
  )
}
