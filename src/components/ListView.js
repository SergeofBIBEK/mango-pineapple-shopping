import React, { Component } from 'react';
import ListItem from './ListItem.js';
import EditableItem from './EditableItem.js';
import AddItem from './AddItem.js';

import CheckboxBlankOutlineIcon from 'mdi-react/CheckboxBlankOutlineIcon';
import CheckboxMarkedIcon from 'mdi-react/CheckboxMarkedIcon';

class ListView extends Component {

    render() {

        let { list, handlers, addError, addStore, addQuantity, addProduct, filterValue, storeNames, stores, products } = this.props;

        return (
            <div style={styles.listViewContainer}>
                <AddItem handlers={handlers} store={addStore} product={addProduct} quantity={addQuantity} error={addError} stores={stores} products={products} />
                <div style={{height:' 40px', display:'flex', alignItems: 'center'}}>
                    <select onChange={(e) => {handlers.selectChange(e.currentTarget.value)}} type='text' value={filterValue} style={{fontSize: '12px', margin: '10px', border: 'none', backgroundColor: '#FF6D00', color: '#64b5f6', WebkitAppearance: 'none', padding: '4px'}} >
                        <option value='none'>Store Filter </option>
                        {!!list ? list.map( (store) => {
                            return (
                                <option key={store.key} value={store.key}>{store.key}</option>
                            )
                        } ) : null}
                    </select>
                    <div onClick={ handlers.changeStoreNames } style={{display:'flex', alignItems: 'center'}}>
                        {storeNames ? <CheckboxMarkedIcon /> : <CheckboxBlankOutlineIcon /> }
                        Store Names
                    </div>
                </div>
                <div style={styles.listView}>
                    {/*EACH STORE IN THE LIST*/}
                    {!!list ? list.map( (store, storeIndex) => {
                        if (filterValue !== 'none' && filterValue !== store.key)
                        {
                            return null;
                        }
                        return (
                            <div key={store.key} style={styles.container}>
                                <h3 style={storeNames ? styles.storeHeading : {display: 'none'}}>{store.key}</h3>

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
                    } ) : null}

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
        width: '90%',
        flexShrink: '0'
    },
    storeHeading: {
        width: '100%',
        backgroundColor: '#FF9100',
        color: '#0D47A1',
        textAlign: 'center',
        flexShrink: '0'
    }
}

export default ListView;