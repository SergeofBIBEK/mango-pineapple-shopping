import React, { Component } from 'react';
import CancelIcon from 'mdi-react/CancelIcon';
import CheckboxBlankOutlineIcon from 'mdi-react/CheckboxBlankOutlineIcon';
import CheckboxMarkedIcon from 'mdi-react/CheckboxMarkedIcon';

class EditableItem extends Component {

    render() {

        let { checked, product, quantity, handlers, store, index } = this.props;

        return (
            <div style={styles.container}>
                <div onClick={ (e) => {handlers.toggleCheck(!checked, store, index)} } style={styles.checkbox}>
                    {checked ? <CheckboxMarkedIcon /> : <CheckboxBlankOutlineIcon /> }
                </div>
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
                <div 
                    style={styles.editButton}
                    onClick={ (e) => {handlers.cancelEdit(store, index)} } >
                    <CancelIcon />
                </div>
            </div>
        )
    }

}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around'
    },
    checkbox: {
        margin: '5px',
    },
    product: {
        flexGrow: '30',
        margin: '5px',
        maxWidth: '150px',
        backgroundColor: '#ff6d00',
        border: 'none',
        borderRadius: '0px',
        color: '#64b5f6',
        textAlign: 'center',
    },
    quantity: {
        flexGrow: '1',
        margin: '5px',
        maxWidth: '50px',
        backgroundColor: '#ff6d00',
        border: 'none',
        borderRadius: '0px',
        color: '#64b5f6',
        textAlign: 'center',
    },
    editButton: {
        padding: '2px 5px',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#2979ff'
    }
}

export default EditableItem;