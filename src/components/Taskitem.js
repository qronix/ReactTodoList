import React, {Component} from 'react';

const Taskitem = (props) =>{
    return(
        <div onClick={props.onClick}>{props.text}</div>
    );
};

export default Taskitem;