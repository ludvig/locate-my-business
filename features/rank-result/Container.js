import { connect } from "react-redux";

import View from "./View";

import { reset } from "../../model/rank";

const mapStateToProps = (state, ownProps) => {
  return {
    score: state.rank.score,
    specialScore: state.rank.specialScore,
    keywords: state.keywords.selectedKeywords,
    firstTown: state.towns.firstTown,
    secondTown: state.towns.secondTown
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reset: () => dispatch(reset())
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(View);

export default Container;
