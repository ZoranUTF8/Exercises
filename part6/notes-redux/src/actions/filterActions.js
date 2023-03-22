export const setFilter = (filterName) => {
  return {
    type: "SET_FILTER",
    payload: filterName,
  };
};
