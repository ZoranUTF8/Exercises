import { ContentProps } from "../types"
import Part from "./Part"

const Content = ({ courseParts }: ContentProps) => {

  if (courseParts.length === 0) return <h1>Loading</h1>

  return (
    <div>{courseParts.map((part, ind) => <div key={ind}><Part partData={part} /></div>)}</div>
  )
}

export default Content