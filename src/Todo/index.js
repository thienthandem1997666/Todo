import React, { Component } from 'react';
import logo from './images/logo.svg';
import './styles/Todo.css';
import Input from './component/Input.js';
import ListTodo from './component/ListTodo.js';

class Todo extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentTodo : null,
      listTodo : []
    };
    this.initTodo = this.initTodo.bind(this);
    this.submitInput = this.submitInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentWillMount(){
    this.setState({
      listTodo : this.initTodo(),
    })
  }

  componentDidUpdate(){
    this.updateLocalStorage(this.state.listTodo);
  }

  initTodo(){
    if(localStorage){
      let item = localStorage.getItem('listTodo') ? JSON.parse(localStorage.getItem('listTodo')) :[];
      return item;
    }
    else{
      return [];
    }
  }

  updateLocalStorage(listTodo){
    localStorage.setItem('listTodo',JSON.stringify(listTodo));
  }

  submitInput(val){
    this.setState((prevState) => {
      let updatedTodo = [...prevState.listTodo, val];
      return(
        {
          currentTodo : prevState.listTodo.length,
          listTodo : [...prevState.listTodo, val]
        }
      )}
    )
  }

  handleDelete(e,itemIndex){
    this.setState((prevState) => {
      let newListTodo = prevState.listTodo.filter((item,index) => index !== itemIndex);
      return {
      listTodo : newListTodo
      }
    });
  }

  handleEditSubmit(newItem,index){
    this.setState((prevState) =>{
      let newListTodo = prevState.listTodo.map((item,i) => item = (i === index) ? newItem : item);
      return {
        listTodo : newListTodo
      }
    })
  }

  render() {
    return (
      <div className="app-wrapper">
        <Input currentItem={this.state.listTodo[this.state.currentTodo]} submitInput={this.submitInput}/>
        <ListTodo currentItem={this.state.currentTodo} listTodo={this.state.listTodo} handleDelete={this.handleDelete} handleEditSubmit={this.handleEditSubmit}/>
      </div>
    );
  }
}

export default Todo;
