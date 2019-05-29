import React from "react";
import { View } from "react-native";
import {
  Action,
  ActionButtons,
  ActionButton,
  ActionButtonText
} from "../components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions";
import { ScrollView } from "react-native-gesture-handler";
import { Input } from "../components";

class NewCardScreen extends React.Component {
  static navigationOptions = {
    title: "New Card"
    //TODO: add back button
  };

  state = {
    question: undefined,
    answer: undefined
  };

  // TODO: get ID from deck here (navigation state)

  handleSaveCard = e => {
    const { question, answer } = this.state;
    const { navigation } = this.props;

    const {
      state: {
        params: { deckId, save }
      }
    } = navigation;

    save(deckId, { question, answer });
    navigation.goBack();
  };

  handleChange = target => e => {
    this.setState({
      [target]: e.nativeEvent.text
    });
  };

  render() {
    const { question, answer } = this.state;
    const fullFilled = !!question && !!answer;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Input
            placeholder="Question"
            onChange={this.handleChange("question")}
          />
          <Input placeholder="Answer" onChange={this.handleChange("answer")} />
        </ScrollView>
        <Action>
          <ActionButtons>
            <ActionButton
              disabled={!fullFilled}
              color="#AA0000"
              onPress={this.handleSaveCard}
            >
              <ActionButtonText>Save Card</ActionButtonText>
            </ActionButton>
          </ActionButtons>
        </Action>
      </View>
    );
  }
}

const mapDispatchProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  undefined,
  mapDispatchProps
)(NewCardScreen);
