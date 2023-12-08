import { PropsWithChildren, memo, useRef } from "react"
import DevCountProvider, { useCounter } from "./DevCountProvider"

export const DevUseContextSample = () => {
  const renderCount = useRef(0)
  renderCount.current += 1
  return (
    <DevCountProvider defaultCunt={0}>
      <div className="example">
        <h1 className="example__title">Use Context</h1>
        <div>This page ({renderCount.current})</div>
        <button className="btn"></button>
        <div className="d-flex">
          <Wrapper>
            <Counter name="first(has count)" isMemoOther={false} />
          </Wrapper>
          <Wrapper>
            <Counter name="second(has count)" isMemoOther={true} />
          </Wrapper>
          <Wrapper>
            <OtherPage />
            <div>name : third (no count)</div>
          </Wrapper>
        </div>
      </div>
    </DevCountProvider>
  )
}

const OtherPage = () => {
  const renderCount = useRef(0)
  renderCount.current += 1
  return <div>OtherPage ({renderCount.current})</div>
}

const Wrapper = ({ children }: PropsWithChildren) => {
  const renderCount = useRef(0)
  renderCount.current += 1
  return (
    <div className="flex-1 example__section shadow-box">
      <h3>
        <p>Wrapper ({renderCount.current})</p>
      </h3>

      {children}
    </div>
  )
}

const MemoOtherComponent = memo(OtherPage)

const Counter = ({
  name,
  isMemoOther,
}: PropsWithChildren<{ name: string; isMemoOther: boolean }>) => {
  const { count, addCount } = useCounter()
  const renderCount = useRef(0)

  renderCount.current += 1
  return (
    <div>
      {isMemoOther ? (
        <div className="d-flex">
          memo : <MemoOtherComponent />
        </div>
      ) : (
        <div className="d-flex">
          not memo : <OtherPage />
        </div>
      )}
      <p>name : {name}</p>
      <p>count : {count} </p>
      <p>renderCount : {renderCount.current}</p>
      <button type="button" onClick={addCount}>
        +
      </button>
    </div>
  )
}
