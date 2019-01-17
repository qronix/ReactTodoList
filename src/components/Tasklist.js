import React, {Component} from 'react';
import Taskitem from './Taskitem';
import tasklist from '../css/tasklist.css';
import taskitem from '../css/taskitem.css';

export default class Tasklist extends Component{
    constructor(props){
        super(props);
        this.state={
            taskitems:[],
            itemRefs:[]
        };
        this.taskInput = React.createRef();
        this.addTask = this.addTask.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.animateItem = this.animateItem.bind(this);
    };
    addTask(){
        let keyValue = this.generateId();
        //onClick={()=>this.completeTask(keyValue)}
        let item = <Taskitem value={keyValue}  text={this.taskInput.current.value}/>;
        this.setState({taskitems:[...this.state.taskitems,item]});
        this.clearInput();
    };
    clearInput(){
        this.taskInput.current.value = '';
    };
    generateId(){
        const keyValues = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz0123456789';
        let key = '';
        for(let i=0; i<8; i++){
            const choice = Math.floor(Math.random()*keyValues.length);
            key += keyValues[choice];
        }
        return key;
    };
    renderItems(){
        if(this.state.taskitems.length > 0){
            return this.state.taskitems.map(item=>{
                return <div className='task-item' key={item.props.value} onClick={()=>this.completeTask(item.props.value)}>{item}</div>;
            });
        }else{
            return(<div className='cta-message'>You have nothing to do! Add a task to get started.</div>);
        }
    };
    animateItem(ref){
        console.log(ref);
        ref.current.classList.add('task-complete');
    };
    completeTask(key){
        const updatedList = this.state.taskitems.filter(item=>item.props.value!==key);
        this.setState({taskitems:updatedList});
    };
    checkEnterKey(e){
        if(e.charCode === 13){
            this.addTask();
        }
    };
    render(){
        return(
            <div className='tasklist-container'>
                <div className='tasklist-controls'>
                    <input type='text' ref={this.taskInput} onKeyPress={(e)=>this.checkEnterKey(e)}></input>
                    <a href='#' onClick={this.addTask}>Add task</a>
                </div>
                <div className='tasklist-items'>
                    {this.renderItems()}
                </div>
            </div>
        );
    };
};