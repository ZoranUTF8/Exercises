import { updateFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        defaultChecked
        onChange={() => dispatch(updateFilter("ALL"))}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(updateFilter("IMPORTANT"))}
      />
      nonimportant
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(updateFilter("NONIMPORTANT"))}
      />
    </div>
  );
};

export default VisibilityFilter;
