import React, { Component } from 'react';

class EditableItem extends Component {

    render() {
        
        let { checked, product, quantity, handlers } = this.props;
        
        return (
            <div style={styles.container}>
                <input style={styles.checkbox} type='checkbox' checked={checked} />
                <input style={styles.product} type='text' value={product} />
                <input style={styles.quantity} type='number' value={quantity} />
                <button style={styles.editButton} >Cancel</button>
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