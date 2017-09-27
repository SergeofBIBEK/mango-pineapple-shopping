import React, { Component } from 'react';
import './App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import ListView from './components/ListView.js';
import Controls from './components/Controls.js';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    key: "Wal-Mart",
                    products: [
                        {
                            key: "bread",
                            quantity: 1,
                            editing: false,
                            checked: false,
                            editKey: '',
                            editQuantity: 0
                        },
                        {
                            key: "cheese",
                            quantity: 1,
                            editing: false,
                            checked: true,
                            editKey: '',
                            editQuantity: 0
                        }
                    ]
                },
                {
                    key: "Publix",
                    products: [
                        {
                            key: "milk",
                            quantity: 1,
                            editing: true,
                            checked: false,
                            editKey: '',
                            editQuantity: 0
                        }
                    ]
                }
            ],
            handlers: {
                toggleCheck: this.toggleCheck.bind(this),
                edit: this.edit.bind(this),
                cancelEdit: this.cancelEdit.bind(this),
                changeText: this.changeText.bind(this),
                save: this.save.bind(this),
                bought: this.bought.bind(this),
                add: this.add.bind(this),
                changeAddText: this.changeAddText.bind(this)
            },
            stores: [],
            products: [],
            addError: false,
            addStore: '',
            addProduct: '',
            addQuantity: 0
        }

    }

    render() {

        let { list, handlers, stores, products } = this.state;

        return (
            <div style={styles.appBody}>
                <Header />
                <ListView 
                    list={list} 
                    handlers={handlers} 
                    addError={this.state.addError} 
                    addStore={this.state.addStore} 
                    addProduct={this.state.addProduct} 
                    addQuantity={this.state.addQuantity} />
                <Controls handlers={handlers} />
                <Footer />
            </div>
        );
    }

    toggleCheck(currentChecked, store, index) {
        this.setState( (state, props) => {

            state.list[store].products[index].checked = currentChecked;

            return {
                list: state.list
            }
        } );
    }

    edit(store, index) {

        this.setState( (state, props) => {

            state.list[store].products[index].editing = true;
            state.list[store].products[index].editKey = state.list[store].products[index].key;
            state.list[store].products[index].editQuantity = state.list[store].products[index].quantity;

            return {
                list: state.list
            }
        } );

    }

    cancelEdit(store, index) {

        this.setState( (state, props) => {

            state.list[store].products[index].editing = false;
            state.list[store].products[index].editKey = '';
            state.list[store].products[index].editQuantity = 0;

            return {
                list: state.list
            }
        } );

    }

    changeText(newValue, store, index, selector) {
        this.setState( (state, props) => {

            state.list[store].products[index][selector] = newValue;

            return {
                list: state.list
            }
        } );
    }

    save() {
        this.setState( (state, props) => {

            let list = state.list;

            list.forEach( (store) => {
                store.products.forEach( (product) => {
                    if (product.editing) {
                        product.key = product.editKey;
                        product.quantity = product.editQuantity;
                        product.editing = false;
                        product.editKey = '';
                        product.editQuantity = 0;
                    }
                } )
            } );

            return {
                list: list
            }
        } );
    }

    bought() {
        this.setState( (state, props) => {

            let list = state.list;

            list = list.filter( (store) => {
                store.products = store.products.filter( (product) => {return !product.checked} );

                return store.products.length > 0;

            } );

            return {
                list: list
            }
        } );
    }

    cancelAll() {
        //cancel all
    }

    add(store, product, quantity) {

        this.setState( (state, props) => {

            let hasStore = false;
            let storeKey = '';
            let hasProduct = false;
            let productKey = '';

            state.list.forEach( (store) => {
                if (store.key.toLowerCase() === store.toLowerCase()) {
                    hasStore = true;
                    storeKey = store.key;

                    store.products.forEach( (product) => {
                        if (product.key.toLowerCase() === product.toLowerCase()) {
                            hasProduct = true;
                            productKey = product.key;
                        }
                    } );
                }
            } )

            let list = state.list;
            let addError = state.addError;

            if (hasStore && !hasProduct) {
                list[storeKey].products.push({
                    key: product,
                    quantity: quantity,
                    editing: false,
                    checked: false,
                    editKey: '',
                    editQuantity: 0
                });
                addError = false;
            }
            else if (!hasStore) {
                list.push({
                    key: store,
                    products: [
                        {
                            key: product,
                            quantity: quantity,
                            editing: false,
                            checked: false,
                            editKey: '',
                            editQuantity: 0
                        }
                    ]
                })
                addError = false;
            }
            else if (hasStore && hasProduct) {
                addError = true;
            }

            return {
                list: list,
                addError: addError
            }
        } );
    }
    
    changeAddText(newValue, selector) {
        //
        this.setState( (state, props) => {
            
            state[selector] = newValue;
            
            return {
                state: state
            }
            
        } )
        
    }
}

const styles = {
    appBody: {
        paddingBottom: "75px",
        paddingTop: "40px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        height: '-webkit-fill-available'
    }
}

export default App;
