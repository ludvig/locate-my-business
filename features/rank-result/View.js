import React from "react";
import PopupDialog from "react-native-popup-dialog";

import { Dimensions, View, Picker, Button, Text } from "react-native";
import { StackedBarChart } from "react-native-svg-charts";

const isDisabled = (firstTown, secondTown) =>
  firstTown !== null && secondTown !== null && firstTown !== secondTown;

const windowWidth = () => Dimensions.get("window").width;

export default class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.popupDialog = null;
  }

  dataView(title, subtitle, data, colors, keys) {
    return (
      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: windowWidth()
          }}
        >
          <Text
            style={{
              color: "#999",
              marginTop: 26,
              fontSize: 22
            }}
          >
            {title}
          </Text>
          {subtitle !== null && <Text
            style={{
              color: "#999",
              marginTop: 5,
              fontSize: 12
            }}
          >
            {subtitle}
          </Text>}
        </View>
        <View
          style={{
            margin: 2
          }}
        >
          <StackedBarChart
            horizontal={true}
            style={{ height: 100 }}
            keys={keys}
            colors={colors}
            data={data}
            showGrid={false}
            contentInset={{ top: 30, bottom: 30 }}
          />
        </View>
      </View>
    );
  }

  render() {
    const {
      score,
      specialScore,
      firstTown,
      secondTown,
      reset,
      keywords
    } = this.props;

    if (score !== null) {
      const colors = ["#86e", "#e87"];
      const keys = [firstTown.name, secondTown.name];

      let data = [];
      let townCompetitive = {};
      townCompetitive[firstTown.name] = score[firstTown.id];
      townCompetitive[secondTown.name] = score[secondTown.id];
      data.push(townCompetitive);
      let generalDataView = this.dataView("Recruitment market size", null, data, colors, keys);

      let specificDataView = null;
      if (specialScore !== null) {
        let specialData = [];
        let specialCompetitive = {};
        specialCompetitive[firstTown.name] = specialScore[firstTown.id];
        specialCompetitive[secondTown.name] = specialScore[secondTown.id];
        specialData.push(specialCompetitive);
        specificDataView = this.dataView(
          "Demand for " + keywords.map(d => "#"+d.name).join(", "),
          null,
          specialData,
          colors,
          keys
        );
      }

      let rateData = [];
      let employmentRate = {};
      employmentRate[firstTown.name] = score[firstTown.id]+30;
      employmentRate[secondTown.name] = score[secondTown.id];
      rateData.push(employmentRate);
      let rateDataView = this.dataView("Employment rate", null, rateData, colors, keys);

      let crimeData = [];
      let crimeActivity = {};
      crimeActivity[firstTown.name] = score[firstTown.id];
      crimeActivity[secondTown.name] = score[secondTown.id]+20;
      crimeData.push(crimeActivity);
      let crimeDataView = this.dataView("Neighbourhood safety", null, crimeData, colors, keys);


      return (
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: windowWidth()
            }}
          >
            <Text
              style={{
                marginTop: 26,
                fontSize: 30,
                color: "#999"
              }}
            >
              <Text style={{ color: "#86e", fontSize: 36 }}>
                {firstTown.name}
              </Text>{" "}
              vs{" "}
              <Text style={{ color: "#e87", fontSize: 36 }}>
                {secondTown.name}
              </Text>
            </Text>
          </View>
          {generalDataView}
          {specificDataView}
          {rateDataView}
          {crimeDataView}
          <Button
            style={{ marginTop: 40 }}
            title="X"
            color="#aaa"
            onPress={() => reset()}
          />
        </View>
      );
    }

    return null;
  }
}
