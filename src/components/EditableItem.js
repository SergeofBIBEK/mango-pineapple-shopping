import React, { Component } from 'react';

class EditableItem extends Component {

    render() {

        let { checked, product, quantity, handlers, store, index } = this.props;

        return (
            <div style={styles.container}>
                <input 
                    style={styles.checkbox} 
                    type='checkbox' 
                    checked={checked}
                    onChange={ (e) => {handlers.toggleCheck(e.currentTarget.checked, store, index)} } />
                <input 
                    style={styles.product} 
                    type='text' 
                    value={product}
                    onChange={ (e) => {handlers.changeText(e.currentTarget.value, store, index, "editKey")} } />
                <input 
                    style={styles.quantity} 
                    type='number' 
                    onChange={ (e) => {handlers.changeText(e.currentTarget.value, store, index, "editQuantity")} }value={quantity}
                     />
                <button 
                    style={styles.editButton}
                    onClick={ (e) => {handlers.cancelEdit(store, index)} } >
                    Cancel
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

export default EditableItem;