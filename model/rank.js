export const FETCHED_RANKS = "FETCHED_RANKS";
export function fetchedRank(rank) {
  return {
    type: FETCHED_RANKS,
    data: rank
  };
}

export const FETCHED_SPECIALIZED_RANKS = "FETCHED_SPECIALIZED_RANKS";
export function fetchedSpecializedRank(rank) {
  return {
    type: FETCHED_SPECIALIZED_RANKS,
    data: rank
  };
}

export const RESET = "RESET";
export function reset() {
  return {
    type: RESET
  };
}

const calculateScore = data => data.rank1 / data.rank2;

const initial = {
  score: null,
  specialScore: null
};

function reducer(state = initial, action) {
  switch (action.type) {
    case FETCHED_RANKS:
      return Object.assign({}, state, { score: action.data });
    case FETCHED_SPECIALIZED_RANKS:
      return Object.assign({}, state, { specialScore: action.data });
    case RESET:
      return initial;
    default:
      return state;
  }
}

export default reducer;
