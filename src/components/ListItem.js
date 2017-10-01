import React, { Component } from 'react';
import PencilIcon from 'mdi-react/PencilIcon';
import CheckboxBlankOutlineIcon from 'mdi-react/CheckboxBlankOutlineIcon';
import CheckboxMarkedIcon from 'mdi-react/CheckboxMarkedIcon';

class ListItem extends Component {

    render() {

        let { checked, product, quantity, handlers, index, store } = this.props;

        return (
            <div style={styles.container}>
                <div onClick={ (e) => {handlers.toggleCheck(!checked, store, index)} } style={styles.checkbox}>
                    {checked ? <CheckboxMarkedIcon /> : <CheckboxBlankOutlineIcon /> }
                </div>
                <p 
                    style={styles.product} >
                    {product}
                </p>
                <p 
                    style={styles.quantity} >
                    {quantity}
                </p>
                <div 
                    style={styles.editButton}
                    onClick={ (e) => {handlers.edit(store, index)} } >
                    <PencilIcon />
                </div>
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
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#2979ff'
    }
}

export default ListItem;