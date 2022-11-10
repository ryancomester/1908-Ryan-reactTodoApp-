import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

//component for tasks
const Task = ({taskName, todoState}) => {
  if(todoState === false){
    return(
        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardText}>{taskName}</Text>
          </View>
          <Button
              title="Completed"
              onPress={() => console.log("coco")}
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
      /*todo structure*/
      const newTodo = {
        title: inputVal,
        createdDate: date.toUTCString(),
        done:false,
        key: Math.floor(Math.random() * 100)
      };

      const todo = todos.concat(newTodo);

      setTodos(todo);
      setInputVal('');
    }
  }

  function ChangeText(Val) {
    setInputVal(Val);
  }

  //completing a task
  function completeingTodo(todo){
    todo.done
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentPadding}>
        <Text style={styles.title}>Todo</Text>
        <View style={styles.cardColumn}>
          {todos.map((singleTodo) => (
              <View>
                <Task taskName={singleTodo.title} todoState={singleTodo.done}/>
              </View>
          ))}
        </View>
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
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});
