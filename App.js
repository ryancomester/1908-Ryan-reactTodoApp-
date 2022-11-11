import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, Platform} from 'react-native';

//component for tasks
const Task = ({taskName, todoState, clearFunction, stateKey}) => {
  if(todoState === false){
    return(
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardText}>{taskName}  {stateKey}</Text>
          </View>
          <Button
              title="Completed"
              onPress={() => clearFunction(stateKey)}
              style={styles.square}
          />
        </View>
    )
  }
}

export default function App() {
  //Array which the data is stored
  const [todos, setTodos] = useState([]);
  //takes the todo item which the user writes
  const [inputVal, setInputVal] = useState('');

  //clear all function
  function ClearAll(){
    setTodos([])
  }

  function addTodo() {
    if(inputVal !== '') {
      //date
      const unixTime = Date.now();
      const date = new Date(unixTime * 1000)

      /*todo object*/
      const newTodo = {
        title: inputVal,
        createdDate: date.toUTCString(),
        done:false
      };

      const todo = todos.concat(newTodo);

      setTodos(todo);
      setInputVal(null);
    }
  }

  function ChangeText(Val) {
    setInputVal(Val);
  }

  //completing a task
  function completingTodo(todo){
    console.log(todo);
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentPadding}>
        <Text style={styles.title}>Todo</Text>
        <View style={styles.cardColumn}>
          {todos.map((singleTodo, key) => (
              <View>
                <Task taskName={singleTodo.title} todoState={singleTodo.done} stateKey={key}/>
              </View>
          ))}
        </View>

        </View>
        <View style={styles.textContainer}>

          <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.writeTaskWrapper}
          >
            <TextInput
                style={styles.input}
                onSubmitEditing={addTodo}
                onChangeText = {ChangeText}
                placeholder="Add Todo"
                autoCapitalize="sentences"
                returnKeyType="done"
                blurOnSubmit={true}
                value={setInputVal}
                multiline = {true}
                maxLength={30}
            />
          </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9'
  },
  /*adds padding to the title*/
  contentPadding:{
    paddingTop: 80,
    paddingHorizontal:20
  },
  /*title's css */
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  cardColumn:{
    marginTop: 30,
  },

  //todo components
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    // marginRight: 15,
  },
  cardText: {
    maxWidth: '100%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  textContainer:{
    position:"absolute",
    bottom:50
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
