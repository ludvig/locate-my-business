import store from "../store";
import { fetchedTowns } from "../../model/town";
import { fetchedRank, fetchedSpecializedRank } from "../../model/rank";
const url = "https://thelocationapp-1483141796841.appspot.com/communes/";

export const PROCESSING = "PROCESSING";
export function processing() {
  return {
    type: PROCESSING
  };
}

export const DONE = "DONE";
export function done() {
  return {
    type: DONE
  };
}

const jsonGetHeader = () => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  return {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default"
  };
};

export function getSpecializedRank() {
  return function(store, dispatch) {
    let firstTown = store.getState().towns.firstTown.id;
    let secondTown = store.getState().towns.secondTown.id;
    let keywords = store.getState().keywords.selectedKeywords;

    let fullUrl =
      url +
      "rank?id1=" +
      firstTown +
      "&id2=" +
      secondTown +
      "&keyword=" +
      keywords.map(d => d.name).join(",");

    store.dispatch(processing());
    return fetch(fullUrl, jsonGetHeader())
      .then(response => response.json())
      .then(data => {
        store.dispatch(done());
        store.dispatch(fetchedSpecializedRank(data));
      });
  };
}

export function getRank() {
  return function(store, dispatch) {
    let firstTown = store.getState().towns.firstTown.id;
    let secondTown = store.getState().towns.secondTown.id;

    let fullUrl = url + "rank?id1=" + firstTown + "&id2=" + secondTown;
    store.dispatch(processing());
    return fetch(fullUrl, jsonGetHeader())
      .then(response => response.json())
      .then(data => {
        store.dispatch(done());
        store.dispatch(fetchedRank(data));
      });
  };
}

export function getTowns() {
  return function(store, dispatch) {
    store.dispatch(processing());
    return fetch(url, jsonGetHeader())
      .then(response => response.json())
      .then(data => {
        store.dispatch(done());
        store.dispatch(fetchedTowns(data));
      });
  };
}
let initial = {};
function reducer(state = initial, action) {
  switch (action.type) {
    case DONE:
      return { loading: false };
    case PROCESSING:
      return { loading: true };
    default:
      return { loading: false };
  }
}

export default reducer;
