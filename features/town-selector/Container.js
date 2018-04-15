import { connect } from "react-redux";
import View from "./View";
import { selectFirstTown, selectSecondTown } from "../../model/town";
import { addKeyword, removeKeyword } from "../../model/keywords";
import { getRank, getTowns, getSpecializedRank } from "../../service/remote/backend";

const mapStateToProps = (state, ownProps) => {
  return {
    towns: state.towns.towns,
    firstTown: state.towns.firstTown,
    secondTown: state.towns.secondTown,
    shouldRender: state.rank.score === null,
    selectedKeywords: state.keywords.selectedKeywords,
    initialKeywords: state.keywords.initialKeywords
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(getTowns());
  return {
    initState: () => {},
    selectFirstTown: town => dispatch(selectFirstTown(town)),
    selectSecondTown: town => dispatch(selectSecondTown(town)),
    performRank: () => dispatch(getRank()),
    performSpecialRank: () => dispatch(getSpecializedRank()),
    addKeyword: words => dispatch(addKeyword(words))
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(View);

export default Container;
