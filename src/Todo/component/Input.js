import React, { Component } from 'react';

class Input extends Component{

    constructor(props){
        super(props);
        this.submitTodo = this.submitTodo.bind(this);
        this.state = {
            inputVal : this.props.currentItem
        }
    }

    submitTodo(e){
        if(e.charCode === 13){
            this.props.submitInput(e.target.value);
            e.target.value = "";
        }
        this.setState({
            inputVal : '',
        })
    }

    render(){
        return <input className="input" placeholder={this.state.inputVal} onKeyPress={this.submitTodo}/>
    }
}
export default Input;