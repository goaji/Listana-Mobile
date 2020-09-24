export const CREATE_LIST = "CREATE_LIST";

export const createList = (list) => {
  return { type: CREATE_LIST, newList: list };
};
