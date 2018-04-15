import React from "react";
import { Chip, Selectize } from "react-native-material-selectize";

import {
  StyleSheet,
  Dimensions,
  View,
  Picker,
  TouchableOpacity,
  Text,
  Modal
} from "react-native";

const isDisabled = (firstTown, secondTown) =>
  firstTown !== null && secondTown !== null && firstTown !== secondTown;

const windowWidth = () => Dimensions.get("window").width;

const dialog = component => {};

export default class TownSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondTownDialogVisible: false,
      firstTownDialogVisible: false
    };
  }

  render() {
    const {
      shouldRender,
      towns,
      performRank,
      selectFirstTown,
      selectSecondTown,
      firstTown,
      secondTown,
      addKeyword,
      selectedKeywords,
      initialKeywords,
      performSpecialRank
    } = this.props;
    if (!shouldRender) {
      return null;
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.firstTownDialogVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 0.5 }}>
              <Picker
                selectedValue={firstTown !== null ? firstTown.id : null}
                style={{ marginTop: 50, height: 500, width: windowWidth() }}
                onValueChange={(itemValue, itemIndex) =>
                  selectFirstTown(itemValue)
                }
              >
                <Picker.Item
                  color="#444"
                  label={"- Select a town -"}
                  value={null}
                />

                {towns.map((town, idx) => {
                  return (
                    <Picker.Item key={idx} label={town.name} value={town.id} />
                  );
                })}
              </Picker>
            </View>

            <View style={{ flex: 0.2 }}>
              <TouchableOpacity
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                  marginTop: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#fff"
                }}
                onPress={() => {
                  this.setState({
                    firstTownDialogVisible: false,
                    secondTownDialogVisible: false
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    color: "#000",
                    textAlign: "center",
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.secondTownDialogVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ flex: 0.5 }}>
              <Picker
                selectedValue={secondTown !== null ? secondTown.id : null}
                style={{ marginTop: 50, height: 500, width: windowWidth() }}
                onValueChange={(itemValue, itemIndex) =>
                  selectSecondTown(itemValue)
                }
              >
                <Picker.Item
                  color="#444"
                  label={"- Select a town -"}
                  value={null}
                />

                {towns.map((town, idx) => {
                  return (
                    <Picker.Item key={idx} label={town.name} value={town.id} />
                  );
                })}
              </Picker>
            </View>
            <View style={{ flex: 0.2 }}>
              <TouchableOpacity
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                  marginTop: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#fff"
                }}
                onPress={() => {
                  this.setState({
                    firstTownDialogVisible: false,
                    secondTownDialogVisible: false
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    color: "#000",
                    textAlign: "center",
                    paddingLeft: 10,
                    paddingRight: 10
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{ width: windowWidth() - 100 }}>
          <Selectize
            label="Keywords"
            itemId="name"
            items={initialKeywords}
            selectedItems={selectedKeywords}
            listStyle={styles.list}
            tintColor="#028fb0"
            renderRow={(id, onPress, item) => (
              <TouchableOpacity
                activeOpacity={0.6}
                key={id}
                onPress={onPress}
                style={styles.listRow}
              >
                <View style={styles.listWrapper}>
                  <View>
                    <Text style={styles.listNameText}>{item.name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            renderChip={(id, onClose, item, style, iconStyle) => {
              if (
                selectedKeywords.find(d => d.name == item.name) == undefined
              ) {
                selectedKeywords.push(item);
              }
              return (
                <Chip
                  key={id}
                  iconStyle={iconStyle}
                  onClose={() => {
                    onClose();
                    selectedKeywords.splice(selectedKeywords.indexOf(item), 1);
                  }}
                  text={id}
                  style={style}
                />
              );
            }}
          />
        </View>
        <View style={{ marginTop: 30, flex: 0.1 }}>
          <TouchableOpacity
            style={{
              marginLeft: 40,
              marginRight: 40,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff"
            }}
            onPress={() =>
              this.setState({
                firstTownDialogVisible: true,
                secondTownDialogVisible: false
              })
            }
            underlayColor="#fff"
          >
            <Text
              style={{
                fontSize: 26,
                color: "#666",
                textAlign: "center",
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              {firstTown !== null ? firstTown.name : "- Select a Town -"}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              fontSize: 26,
              color: "#999",
              textAlign: "center",
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            vs
          </Text>
        </View>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            style={{
              marginLeft: 40,
              marginRight: 40,
              marginTop: 35,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff"
            }}
            onPress={() =>
              this.setState({
                firstTownDialogVisible: false,
                secondTownDialogVisible: true
              })
            }
            underlayColor="#fff"
          >
            <Text
              style={{
                fontSize: 26,
                color: "#666",
                textAlign: "center",
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              {secondTown !== null ? secondTown.name : "- Select a Town -"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50, flex: 0.1 }}>
          <TouchableOpacity
            style={{
              width: 300,
              marginLeft: 40,
              marginRight: 40,
              marginTop: 10,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: isDisabled(firstTown, secondTown)
                ? "#1E6738"
                : "#CEC7C8",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff"
            }}
            onPress={() => {
              addKeyword(selectedKeywords);
              performRank();
              if (selectedKeywords.length > 0) performSpecialRank();
            }}
            underlayColor="#fff"
            disabled={!isDisabled(firstTown, secondTown)}
          >
            <Text
              style={{
                fontSize: 26,
                color: "#fff",
                textAlign: "center",
                paddingLeft: 10,
                paddingRight: 10
              }}
            >
              Rank
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  chip: {
    paddingRight: 2
  },
  chipIcon: {
    height: 24,
    width: 24
  },
  list: {
    backgroundColor: "#fff"
  },
  listRow: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  listWrapper: {
    flexDirection: "row"
  },
  listIcon: {
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.38)",
    height: 40,
    width: 40,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  listInitials: {
    fontSize: 20,
    lineHeight: 24,
    color: "#fff"
  },
  listNameText: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 14,
    lineHeight: 21
  }
});
