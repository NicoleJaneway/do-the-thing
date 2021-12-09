import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  modalView: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    marginTop: 10,
    marginBottom: 20,
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.primary,
    width: "100%",
    textAlign: "center",
  },
  pressable: {
    height: 30,
    width: 100,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
});

const Popup = ({
  sessionLength,
  task,
  displayTime,
  modalVisible,
  setModalVisible,
  logs,
  setLogs,
}) => {
  const [currentTask, setCurrentTask] = useState("");
  const [checkinCount, setCheckinCount] = useState(1);

  let totalCheckins = 3;

  if (sessionLength === 32) {
    totalCheckins = 4;
  } else if (sessionLength === 50) {
    totalCheckins = 6;
  }

  const handlePress = () => {
    setModalVisible(!modalVisible);
    setCheckinCount(checkinCount + 1);
    if (currentTask !== "") {
      const updatedLogs = [...logs, currentTask];
      setLogs(updatedLogs);
    }
    setCurrentTask("");
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 20,
            }}
          >
            <Text>
              Checkin {checkinCount} of {totalCheckins}
            </Text>
            <Text
              style={{
                fontSize: 24,
                color: theme.colors.textSecondary,
              }}
            >
              {displayTime}
            </Text>
          </View>
          {task !== "" ? (
            <Text>Your original task was:</Text>
          ) : (
            <View>
              <Text>&nbsp;</Text>
            </View>
          )}
          <Text style={{ marginTop: 5, marginBottom: 20 }}>{task}</Text>
          <Text>Log what you're currently working on:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setCurrentTask}
            value={currentTask}
          />
          <Pressable style={styles.pressable} onPress={handlePress}>
            <Text
              style={{
                textAlign: "center",
                padding: 6,
                color: "white",
              }}
            >
              Submit
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default Popup;
