import React, { Component } from 'react';
import ListItem from './ListItem.js';
import EditableItem from './EditableItem.js';

class ListView extends Component {

    render() {

        let { list, handlers } = this.props;

        return (
            <div style={styles.listView}>

                {/*EACH STORE IN THE LIST*/}
                {list.map( (store) => {
                    return (
                        <div key={store.key} style={styles.container}>
                            <h3 style={styles.storeHeading}>{store.key}</h3>

                            {/*EACH PRODUCT IN THE STORE*/}
                            {store.products.map( (product) => {

                                if (product.editing) {
                                    return (
                                        <EditableItem 
                                            key={product.key} 
                                            checked={product.checked} 
                                            product={product.key} 
                                            quantity={product.quantity} 
                                            handlers={handlers} />
                                    )
                                }

                                return (
                                    <ListItem 
                                        key={product.key} 
                                        checked={product.checked} 
                                        product={product.key} 
                                        quantity={product.quantity} 
                                        handlers={handlers} />
                                )
                            } )}

                        </div>
                    )
                } )}

            </div>
        )
    }

}

const styles = {
    listView: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '80%'
    },
    storeHeading: {
        width: '100%',
        backgroundColor: 'lightblue',
        textAlign: 'center'
    }
}

export default ListView;