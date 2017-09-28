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
                changeAddText: this.changeAddText.bind(this),
                cancelAll: this.cancelAll.bind(this),
                addError: this.addError.bind(this)
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
            <div>
                <Header />
                <div style={styles.appBody}>
                    <ListView 
                        list={list} 
                        handlers={handlers} 
                        addError={this.state.addError} 
                        addStore={this.state.addStore} 
                        addProduct={this.state.addProduct} 
                        addQuantity={this.state.addQuantity} />
                </div>
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
        this.setState( (state, props) => {

            let list = state.list;

            for (let i = 0; i < list.length; i++) {
                for(let j = 0; j < list[i].products.length; j++) {
                    list[i].products[j].editing = false;
                    list[i].products[j].editKey = '';
                    list[i].products[j].editQuantity = 0;
                }
            }

            return {
                list: list
            }
        } );
    }

    add(newStore, newProduct, newQuantity) {

        this.setState( (state, props) => {

            let hasStore = false;
            let storeKey = '';
            let hasProduct = false;

            state.list.forEach( (store, storeIndex) => {
                if (store.key.toLowerCase() === newStore.toLowerCase()) {
                    hasStore = true;
                    storeKey = storeIndex;

                    store.products.forEach( (product, productIndex) => {
                        if (product.key.toLowerCase() === newProduct.toLowerCase()) {
                            hasProduct = true;
                        }
                    } );
                }
            } )

            let list = state.list;
            let addError = state.addError;

            if (hasStore && !hasProduct) {
                list[storeKey].products.push({
                    key: newProduct,
                    quantity: newQuantity,
                    editing: false,
                    checked: false,
                    editKey: '',
                    editQuantity: 0
                });
                addError = false;
            }
            else if (!hasStore) {
                list.push({
                    key: newStore,
                    products: [
                        {
                            key: newProduct,
                            quantity: newQuantity,
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

    addError() {
        this.setState({addError: true});
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
    }
}

export default App;
