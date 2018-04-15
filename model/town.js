export const fromJson = jsonData => ({ id: jsonData.id, name: jsonData.namn });

export const SELECT_FIRST_TOWN = "SELECT_FIRST_TOWN";
export function selectFirstTown(townId) {
  return {
    type: SELECT_FIRST_TOWN,
    data: townId
  };
}

export const SELECT_SECOND_TOWN = "SELECT_SECOND_TOWN";
export function selectSecondTown(townId) {
  return {
    type: SELECT_SECOND_TOWN,
    data: townId
  };
}

export const FETCHED_TOWNS = "FETCHED_TOWNS";
export function fetchedTowns(actionData) {
  return {
    type: FETCHED_TOWNS,
    data: actionData
  };
}

const initial = {
  towns: [],
  firstTown: null,
  secondTown: null
};

function reducer(state = initial, action) {
  switch (action.type) {
    case FETCHED_TOWNS:
      //TODO: normalize data here
      return Object.assign({}, state, {
        towns: action.data.sokdata.map(data => fromJson(data))
      });
    case SELECT_FIRST_TOWN:
      let firstTown = state.towns.find(d => d.id == action.data);
      return Object.assign({}, state, { firstTown: firstTown !== undefined ? firstTown : null });
    case SELECT_SECOND_TOWN:
      let secondTown = state.towns.find(d => d.id == action.data);
      return Object.assign({}, state, { secondTown: secondTown !== undefined ? secondTown : null });
    default:
      return state;
  }
}

export default reducer;
