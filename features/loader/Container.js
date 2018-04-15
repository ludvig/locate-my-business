import { connect } from "react-redux";

import View from "./View";

import { reset } from "../../model/rank";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    reset: () => dispatch(reset())
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(View);

export default Container;
