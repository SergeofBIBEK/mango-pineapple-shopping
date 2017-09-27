import React, { Component } from 'react';

class ListItem extends Component {

    render() {

        let { checked, product, quantity, handlers, index, store } = this.props;

        return (
            <div style={styles.container}>
                <input style={styles.checkbox} 
                    type='checkbox' 
                    checked={checked} 
                    onChange={ (e) => {handlers.toggleCheck(e.currentTarget.checked, store, index)} } />
                <p 
                    style={styles.product} >
                    {product}
                </p>
                <p 
                    style={styles.quantity} >
                    {quantity}
                </p>
                <button 
                    style={styles.editButton}
                    onClick={ (e) => {handlers.edit(store, index)} } >
                    Edit
                </button>
            </div>
        )
    }

}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    checkbox: {
        flexGrow: '1',
        margin: '5px',
    },
    product: {
        flexGrow: '30',
        margin: '5px',
        maxWidth: '350px'
    },
    quantity: {
        flexGrow: '1',
        margin: '5px',
    },
    editButton: {
        flexGrow: '1',
        margin: '5px',
    }
}

export default ListItem;