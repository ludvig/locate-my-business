import React from "react";
import PopupDialog from 'react-native-popup-dialog';

import { Dimensions, View, Picker, Button, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
/*
        <Spinner
          visible={loading}
          textContent={"Processing.."}
          textStyle={{ color: "#FFF" }}
        />
        */
const isDisabled = (firstTown, secondTown) =>
  firstTown !== null && secondTown !== null && firstTown !== secondTown;

const windowWidth = () => Dimensions.get("window").width;

export default class TownSelector extends React.Component {
  render() {
    const { loading, children } = this.props;
    return (
      <View>
        <Button
          title="Show Dialog"
          onPress={() => {
            this.popupDialog.show();
          }}
        />
        <PopupDialog
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
        >
          <View>
            <Text>Hello</Text>
          </View>
        </PopupDialog>
      </View>
    );
  }
}
