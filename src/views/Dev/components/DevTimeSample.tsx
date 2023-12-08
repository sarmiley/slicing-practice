import React from "react"
import { t } from "i18next"
import add from "date-fns/add"
export const DevTimeSample = () => {
  const [time, setTime] = React.useState(new Date(2014, 1, 11))

  const handleAddDays = (days: number) => {
    setTime((prevDate) => {
      return add(prevDate, { days })
    })
  }

  return (
    <div className="example">
      <h1 className="example__title">DevTimeSample</h1>
      <div className="example__section shadow-box">
        <div className="example__option btn-group">
          <button
            className="btn btn--primary"
            onClick={() => {
              setTime(new Date())
            }}
          >
            切換成現在時間
          </button>
          <button
            className="btn btn--primary"
            onClick={() => {
              handleAddDays(3)
            }}
          >
            時間加 3 天
          </button>
        </div>
        <div className="example__result">
          Result : {t("__dateAndTime", { date: time })}
        </div>
      </div>
    </div>
  )
}
