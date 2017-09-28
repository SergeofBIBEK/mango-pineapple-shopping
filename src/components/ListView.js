import React, { Component } from 'react';
import ListItem from './ListItem.js';
import EditableItem from './EditableItem.js';
import AddItem from './AddItem.js';

class ListView extends Component {

    render() {

        let { list, handlers, addError, addStore, addQuantity, addProduct } = this.props;

        return (
            <div style={styles.listViewContainer}>
                <AddItem handlers={handlers} store={addStore} product={addProduct} quantity={addQuantity} error={addError} />
                <div style={styles.listView}>
                    {/*EACH STORE IN THE LIST*/}
                    {list.map( (store, storeIndex) => {
                        return (
                            <div key={store.key} style={styles.container}>
                                <h3 style={styles.storeHeading}>{store.key}</h3>

                                {/*EACH PRODUCT IN THE STORE*/}
                                {store.products.map( (product, productIndex) => {

                                    if (product.editing) {
                                        return (
                                            <EditableItem 
                                                key={product.key} 
                                                checked={product.checked} 
                                                product={product.editKey} 
                                                quantity={product.editQuantity} 
                                                store={storeIndex}
                                                index={productIndex}
                                                handlers={handlers} />
                                        )
                                    }

                                    return (
                                        <ListItem 
                                            key={product.key} 
                                            checked={product.checked} 
                                            product={product.key} 
                                            quantity={product.quantity}
                                            store={storeIndex} 
                                            index={productIndex}
                                            handlers={handlers} />
                                    )
                                } )}

                            </div>
                        )
                    } )}

                </div>
            </div>
        )
    }

}

const styles = {
    listView: {
        width: '100%',
        display: 'flex',
        justifyContent: 'baseline',
        alignItems: 'center',
        flexDirection: 'column'
    },
    listViewContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'baseline',
        alignItems: 'center',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '80%',
        flexShrink: '0'
    },
    storeHeading: {
        width: '100%',
        backgroundColor: 'lightblue',
        textAlign: 'center',
        flexShrink: '0'
    }
}

export default ListView;