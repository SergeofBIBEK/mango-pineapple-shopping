import React, { Component } from 'react';

class AddItem extends Component {

    render() {

        let { handlers, store, product, quantity, error } = this.props;

        return (
            <div style={styles.container}>
                <label 
                    style={Object.assign( {}, styles.item, styles.label)}>
                    Store: 
                    <input 
                        style={Object.assign({}, styles.text, error ? styles.error : {})} 
                        type='text' 
                        value={store} 
                        onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addStore')
                        }} />
                </label>
                <label 
                    style={Object.assign( {}, styles.item, styles.label)}>
                    Product: 
                    <input style={Object.assign({}, styles.text, error ? styles.error : {})} 
                        type='text' 
                        value={product} 
                        onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addProduct')
                        }} />
                </label>
                <label 
                    style={Object.assign( {}, styles.item, styles.label)}>
                    Quantity: 
                    <input 
                        style={styles.number} 
                        type='number' 
                        value={quantity} 
                        onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addQuantity')
                        }} />
                </label>
                <button 
                    style={Object.assign({}, styles.button, styles.item)}
                    onClick={ (e) => {
                        if (store !== '' && product !== ''){
                            handlers.add(store, product, quantity);
                        }
                        else {
                            handlers.addError();
                        }
                    } }>
                    Add
                </button>
            </div>
        )
    }
}

const styles = {
    container: {
        display: "flex",
        margin: "10px 0px",
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-evenly',
        height: '30px'
    },
    item: {
        margin: '5px'
    },
    text: {
        width: '90px'
    },
    number: {
        width: '40px'
    },
    button: {
        width: '40px'
    },
    error: {
        border: '1px solid red'
    },
    label: {
        fontSize: '8px'
    }
}

export default AddItem;