import { ContentProps } from "../types"

const Content = ({ courseParts }: ContentProps) => {

  if (courseParts.length === 0) return <h1>Loading</h1>

  return (
    <div>{courseParts.map((obj, ind) => <div key={ind}>Name:{obj.name}{" "} Exercise Count: {obj.exerciseCount}</div>)}</div>
  )
}

export default Content