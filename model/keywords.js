export const fromJson = jsonData => ({ id: jsonData.id, name: jsonData.namn });

export const CHANGE_KEYWORDS = "CHANGE_KEYWORDS";
export function addKeyword(words) {
  return {
    type: CHANGE_KEYWORDS,
    data: words
  };
}

const initial = {
  initialKeywords: [
    { name: "Restaurang" },
    { name: "Café" },
    { name: "Cykelverkstad" },
    { name: "Bilverkstad" },
    { name: "Turistshop" }
  ],
  selectedKeywords: []
};

function reducer(state = initial, action) {
  switch (action.type) {
    case CHANGE_KEYWORDS:
      return Object.assign({}, state, {
        selectedKeywords: action.data
      });
    default:
      return state;
  }
}

export default reducer;
