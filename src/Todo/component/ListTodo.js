import React,{Component} from 'react';

class TodoItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            item :this.props.item, 
            editting : false,
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }

    handleEdit(e){
        this.setState({
            editting: true,
        })
    }

    handleEditSubmit(e){
        if(e.charCode === 13){
            if(e.target.value === ""){
                this.setState({
                    editting: false
                })
                return false;
            }
            else{
                this.setState({
                    item : e.target.value,
                    editting: false
                })
            }
        }
        this.props.handleEditSubmit(e.target.value,this.props.index);
    }

    render(){
        return(
        <li className={this.props.index === this.props.currentItem ? "current list-item" : "list-item"}>
            <p className={`item-text ${this.state.editting ? "editting" : ""}`}>{this.state.item}</p>
            <span className="item-edit" onClick={(e) => this.handleEdit(e,this.props.index)}>Edit</span>
            <input type="text" className={`edit-input ${this.state.editting ? "enabled" : "disabled"}`} onKeyPress={this.handleEditSubmit} placeholder={this.state.item}/>
            <span className="item-delete" onClick={(e) => this.props.handleDelete(e,this.props.index)}>Delete</span>
        </li>)
    }
}

function ListTodo(props){

    function createTodo(todoList,currentItem){
        let todo = [];
        todoList.map(
                (item,index) => (
                    todo.push(
                    <TodoItem handleDelete={props.handleDelete} key={index} index={index} item={item} currentItem={currentItem} handleEditSubmit={props.handleEditSubmit}/>
                    ))
                );
        return todo;
    }

    return (
        <ul className="list">
            {createTodo(props.listTodo,props.currentItem)}
        </ul>
    )
}

export default ListTodo;