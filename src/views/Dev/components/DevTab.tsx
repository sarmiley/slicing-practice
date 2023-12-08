import { PropsWithChildren } from "react"

export interface DevTabProps {
  navLabel: string
  value: string
}

export const DevTab = ({ children }: PropsWithChildren<DevTabProps>) => {
  return <div>{children}</div>
}
