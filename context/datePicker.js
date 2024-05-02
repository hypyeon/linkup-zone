import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function DatePicker({ onDateSelected, userZone }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    if (date) {
      setSelectedDate(date);
      onDateSelected(date);
      // console.log(date);
    }
    hideDatePicker();
  };
  return (
    <View>
      <View style={styles.dtPhrase}>
        <Text style={styles.text}>Choose</Text>
        <Pressable onPress={showDatePicker}>
          <Text style={styles.btnText}> date and time </Text>
        </Pressable>
        <Text style={styles.text}>in {userZone} this message will be delivered</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        value={selectedDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="inline"
      />
    </View>
  );
};

const primaryColor = "rgb(68, 164, 186)";
const styles = StyleSheet.create({
  dtPhrase: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
  },
  btnText: {
    color: primaryColor,
    fontFamily: 'Fin-Bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    fontSize: 13,
  },
  text: {
    fontFamily: 'Fin-Reg',
    color: 'dimgray',
    fontSize: 13,
  },
});