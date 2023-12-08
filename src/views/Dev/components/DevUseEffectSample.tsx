import React from "react"

export const DevUseEffectSample = () => {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((preCount) => {
        return preCount + 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <div>{count}</div>
}
