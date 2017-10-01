import React, { Component } from 'react';
import NotePlusIcon from 'mdi-react/NotePlusIcon';

class AddItem extends Component {

    render() {

        let { handlers, store, product, quantity, error, products, stores } = this.props;

        return (
            <div style={styles.container}>
                <label 
                    style={Object.assign( {}, styles.item, styles.label)}>
                    Product: <br />
                    <input className="addInput" style={Object.assign({}, styles.text, error ? styles.error : {})} 
                        type='text' 
                        value={product} 
                        onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addProduct')
                        }} />

                    <div className="dropdown" style={styles.dropdown} >
                        {products.filter( (thing) => {
                            return thing.toLowerCase().includes(product.toLowerCase());
                        }).map( (thing) => {
                            return <div onClick={(e) => {
                                    handlers.changeAddText(thing, 'addProduct')
                                }} key={thing}>{thing}</div>
                        })}
                    </div>

                </label>
                <label 
                    style={Object.assign( {}, styles.item, styles.label)}>
                    Store: <br />
                    <input 
                        style={styles.text} 
                        type='text' 
                        value={store} 
                        onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addStore')
                        }} />

                    <div className="dropdown" style={styles.dropdown} >
                        {stores.filter( (thing) => {
                            return thing.toLowerCase().includes(store.toLowerCase());
                        }).map( (thing) => {
                            return <div onClick={(e) => {
                                    handlers.changeAddText(thing, 'addStore')
                                }} key={thing}>{thing}</div>
                        })}
                    </div>
                </label>
                <label 
                    style={Object.assign( {}, styles.item, styles.label)}>
                    Quantity: <br />
                    <input 
                        style={styles.number} 
                        type='number' 
                        value={quantity} 
                        onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addQuantity')
                        }} />
                </label>
                <div 
                    style={Object.assign({}, styles.item, styles.button)}
                    onClick={ (e) => {
                        if (product !== ''){
                            handlers.add(store, product, quantity);
                        }
                        else {
                            handlers.addError();
                        }
                    } }>
                    <NotePlusIcon />
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: "flex",
        margin: "10px 0px",
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        height: '90px',
        padding: '0px 10px'
    },
    item: {
        margin: '5px'
    },
    text: {
        width: '120px',
        backgroundColor: '#ff6d00',
        border: 'none',
        borderRadius: '0px',
        color: '#64b5f6',
        textAlign: 'center',
    },
    number: {
        width: '40px',
        backgroundColor: '#ff6d00',
        border: 'none',
        borderRadius: '0px',
        color: '#64b5f6',
        textAlign: 'center',
    },
    button: {
        padding: '5px 10px',
        borderRadius: '10px',
        backgroundColor: '#2979FF',
        margin: '15px 0px 0px 0px'
    },
    error: {
        border: '1px solid red'
    },
    label: {
        fontSize: '12px',
        position: 'relative'
    },

    dropdown: {
        position: 'relative',
        left: 0,
        width: '120px',
        fontSize: '13px',
        backgroundColor: '#FFB74D',
        padding: '0px 5px',
        maxHeight: '50px',
        overflowY: 'scroll',
        color: '#0D47A1',
        textAlign: 'center'
    }
}

export default AddItem;