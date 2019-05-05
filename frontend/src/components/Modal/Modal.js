import React from "react";
import './Modal.css';
const modal = (props) => {

    return (<div className="modal">
        <header className="modal_header">
            <h1>{props.title}</h1>
        </header>
        <section className="modal_content">{props.children}</section>
        <section className="modal_abilities">
            <button className="btn" onClick={props.onCancel}>Cancel</button>
            {props.affirmAvailable && <button 
                className="btn"
                onClick={props.onConfirm}
                >{props.affirmText}</button>}
        </section>
    </div>);

};

export default modal;