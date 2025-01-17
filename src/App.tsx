import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import Row from './components/Row';
import Button from './components/Button';
import Tab from './components/Tab';
import { onButtonPressed } from './utils/calculator';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Define the ParamList for your navigator
type RootStackParamList = {
  CalculatorApp: undefined;
  ConverterApp: undefined;
};

// type CalculatorAppProps = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'CalculatorApp'>;
// };

// type ConverterProps = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'ConverterApp'>;
// };

const App = () => {
  const [screen, setScreen] = useState<boolean>(false);

  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name='CalculatorApp' options={{ headerShown: false }}>
          {(props) => <CalculatorApp {...props} screen={screen} setScreen={setScreen} />}
        </Stack.Screen>
        <Stack.Screen name='ConverterApp' options={{ headerShown: false }}>
          {(props) => <ConverterApp {...props} screen={screen} setScreen={setScreen} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const CalculatorApp = ({ navigation, screen, setScreen }) => {
  const [currentInput, setCurrentInput] = useState("");
  const [previousInput, setPreviousInput] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleButtonPress = (text: string) => {
    const result = onButtonPressed(text, currentInput, previousInput, operation);
    setCurrentInput(result.currentInput);
    setPreviousInput(result.previousInput);
    setOperation(result.operation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Row>
          <Tab type="first" text="Calculator" color={!screen} onPress={() => {navigation.navigate('CalculatorApp'); setScreen(oldScreen => oldScreen ? !oldScreen : oldScreen);}} />
          <Tab type="last" text="Converter" color={screen} onPress={() => {navigation.navigate('ConverterApp'); setScreen(oldScreen => oldScreen ? oldScreen : !oldScreen);}} />
        </Row>
        <Text style={styles.value}>{currentInput}</Text>
      </View>
      <View style={styles.semiDisplayContainer}>
        <Text style={styles.subContent}>{previousInput} {operation}</Text>
      </View>
      <SafeAreaView style={styles.buttonContainer}>
        <Row>
          <Button theme="secondary top-left-corner" text="AC" onPress={() => handleButtonPress("AC")} />
          <Button theme="secondary" text="+/-" onPress={() => handleButtonPress("+/-")} />
          <Button theme="secondary" text="%" onPress={() => handleButtonPress("%")} />
          <Button theme="primary top-right-corner" text="÷" onPress={() => handleButtonPress("/")} />
        </Row>
        <Row>
          <Button text="7" onPress={() => handleButtonPress("7")} />
          <Button text="8" onPress={() => handleButtonPress("8")} />
          <Button text="9" onPress={() => handleButtonPress("9")} />
          <Button theme="primary" text="×" onPress={() => handleButtonPress("*")} />
        </Row>
        <Row>
          <Button text="4" onPress={() => handleButtonPress("4")} />
          <Button text="5" onPress={() => handleButtonPress("5")} />
          <Button text="6" onPress={() => handleButtonPress("6")} />
          <Button theme="primary" text="−" onPress={() => handleButtonPress("-")} />
        </Row>
        <Row>
          <Button text="1" onPress={() => handleButtonPress("1")} />
          <Button text="2" onPress={() => handleButtonPress("2")} />
          <Button text="3" onPress={() => handleButtonPress("3")} />
          <Button theme="primary" text="+" onPress={() => handleButtonPress("+")} />
        </Row>
        <Row>
          <Button theme="bottom-left-corner" size="double" text="0" onPress={() => handleButtonPress("0")} />
          <Button text="." onPress={() => handleButtonPress(".")} />
          <Button theme="primary bottom-right-corner" text="=" onPress={() => handleButtonPress("=")} />
        </Row>
      </SafeAreaView>
    </View>
  );
};

const ConverterApp = ({ navigation, screen, setScreen }) => {
  const handleButtonPress = (text: string) => {};

  return (
    <View style={styles.container}>
      <Row>
        <Tab type="first" text="Calculator" color={!screen} onPress={() => {navigation.navigate('CalculatorApp'); setScreen(oldScreen => oldScreen ? !oldScreen : oldScreen);}} />
        <Tab type="last" text="Converter" color={screen} onPress={() => {navigation.navigate('ConverterApp'); setScreen(oldScreen => oldScreen ? oldScreen : !oldScreen);}} />
      </Row>
      <View style={styles.displayContainer}>

      </View>
      <SafeAreaView style={styles.buttonContainer}>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#161A20',
  },

  displayContainer: {
    flex: 3,
    justifyContent: 'flex-end',
  },

  semiDisplayContainer: {
    flex: 1,
    backgroundColor: '#20252E',
    justifyContent: 'center',
  },

  buttonContainer: {
    flex: 6,
    marginBottom: '5%',
  },

  value: {
    color: '#fff',
    fontSize: 94,
    textAlign: 'right',
  },

  subContent: {
    textAlign: 'right',
    color: '#CBE1FF',
    fontSize: 28,
    fontWeight: '300',
    padding: 20,
  },
});

export default App;
