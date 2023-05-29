import { ContentProps } from "../types"

const Total = ({ courseParts }: ContentProps) => {

  return (
    <div><h1>Total:</h1> {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</div>
  )
}

export default Total