import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text,TouchableOpacity , View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(){
    super()
    this.state={
      resultText: '',
      calculationText: ''
    }
    this._onLongPressButton=this._onLongPressButton.bind(this)
  }

  calculateResult(){
    const text=this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }

  validate(){
    let text = this.state.resultText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
      return false
    }
    return true
  }

  onPressButton(data){
    if (data=='='){
      return this.validate() && this.calculateResult()
    }
    else if (data== 'C'){
      let oldTxt=this.state.resultText
      let newTxt= oldTxt.substr(0,oldTxt.length-1)
      this.setState({
        resultText: newTxt
      })
    }else{
      this.setState({
        resultText: this.state.resultText+data
      })
    }
  }

  onPressOperator(op){
    if (this.state.resultText == '') return
    let lastChar=this.state.resultText.split('').pop()
    let operations=['*','/','-','+']
    if (operations.indexOf(lastChar)!= -1) return
    this.setState({
      resultText: this.state.resultText+op
    })

  }

  _onLongPressButton() {
    this.setState({
      resultText: '',
      calculationText: ''
    })
  }
  
  render() {
    let rows=[]
    for(let i=0;i<4;i++){
      let row=[]
      let lastRow=['.',0,'=']
      for (let j=0;j<3;j++){
        let num=((2-i)*3)+j+1
        let elem
        if (num > 0 && num <= 9){
          elem=(
            <TouchableOpacity key={num} onPress={()=>this.onPressButton(num)}>
              <View style={styles.button}> 
                <Text style={styles.buttonText}>
                  {num}
                </Text> 
              </View>
            </TouchableOpacity>
          )
        }
        else{
          elem=(
            <TouchableOpacity key={num} onPress={()=>this.onPressButton(lastRow[num+2])} >
                  <View style={styles.button}> 
                    <Text style={styles.buttonText}>
                      {lastRow[num+2]}
                    </Text> 
                  </View>
                </TouchableOpacity>
          )
        }
        row.push(elem)
      }
      rows.push(<View style={styles.row} key={i}>{row}</View>)
    }

    let operators=['C','*','/','-','+']
    let ops=[]
    ops.push(
      <TouchableOpacity key={operators[0]} style={styles.row}  onPress={()=>this.onPressButton(operators[0])} onLongPress={this._onLongPressButton} >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{operators[0]}</Text> 
        </View>
      </TouchableOpacity>
    )
    for (let i=1;i<operators.length;i++){
      ops.push(
        <TouchableOpacity key={operators[i]} style={styles.row}  onPress={()=>this.onPressOperator(operators[i])} >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{operators[i]}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
           {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 2,
    backgroundColor: 'bisque',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 50,
    paddingLeft: 50,
  },
  calculation: {
    flex: 1,
    backgroundColor: 'olive',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 50,
    paddingRight: 50,
  },
  buttons: {
    flexGrow: 4,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: 'yellowgreen',
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'darkgreen',
  },
  row:{
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRadius: 50,
  },
  buttonText: {
    padding: 20,
    alignSelf: 'stretch',
    fontSize: 40,
    color: 'white',
  },
  resultText:{
    fontSize: 60,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'baseline',

  },
  calculationText: {
    fontSize: 35,
    color: 'white',
  }
});
