import { HeaderProps } from "../types";


const Header = ({ name }: HeaderProps) => {
  return (
    <div>Tile: {name}</div>
  )
}

export default Header