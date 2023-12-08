import { t } from "i18next"
import { PropsWithChildren, useEffect } from "react"

interface IProps {
  /**
   * document title
   */
  title?: string
}

export const CommonRoute = ({ title, children }: PropsWithChildren<IProps>) => {
  useEffect(() => {
    const i18nKey = title || "__documentTitleDefault"
    document.title = t(i18nKey)
  }, [title])

  return <>{children}</>
}
