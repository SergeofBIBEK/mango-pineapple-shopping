import React, { Component } from 'react';

class AddItem extends Component {
    
    render() {

        let { handlers, store, product, quantity, error } = this.props;
        
        return (
            <div style={styles.container}>
                <label style={styles.item}>Store: <input style={styles.text} type='text' value={store} onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addStore')
                        }} /></label>
                <label style={styles.item}>Product: <input style={styles.text} type='text' value={product} onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addProduct')
                        }} /></label>
                <label style={styles.item}>Quantity: <input style={styles.number} type='number' value={quantity} onChange={(e) => {
                            handlers.changeAddText(e.currentTarget.value, 'addQuantity')
                        }} /></label>
                <button 
                    style={Object.assign(styles.button, styles.item)}
                    onClick={ (e) => {
                        handlers.add(store, product, quantity);
                    } }>Add</button>
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
        justifyContent: 'space-evenly'
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
    }
}

export default AddItem;