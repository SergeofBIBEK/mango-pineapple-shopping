import React, { Component } from 'react';
import firebase from './FirebaseConfig.js';

import './App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import ListView from './components/ListView.js';
import Controls from './components/Controls.js';

let handlers = {};

class App extends Component {

    constructor(props) {
        super(props);

        let defaultState = {
            addError: true,
            addProduct: "",
            addQuantity: 1,
            addStore: "",
            filterValue: "none",
            list: [
                {
                    key: "Wal-Mart",
                    products: [
                        {
                            checked: true,
                            editKey: "",
                            editQuantity: 0,
                            editing: false,
                            key: "Milk",
                            quantity: "1",
                        }
                    ]
                }
            ],
            pFocus: false,
            pListFocus: false,
            products: [
                "Milk"
            ],
            storeNames: true,
            stores: [
                "Wal-Mart"
            ]
        }

        handlers = {
            toggleCheck: this.toggleCheck.bind(this),
            edit: this.edit.bind(this),
            cancelEdit: this.cancelEdit.bind(this),
            changeText: this.changeText.bind(this),
            save: this.save.bind(this),
            bought: this.bought.bind(this),
            add: this.add.bind(this),
            changeAddText: this.changeAddText.bind(this),
            cancelAll: this.cancelAll.bind(this),
            addError: this.addError.bind(this),
            selectChange: this.selectChange.bind(this),
            changeStoreNames: this.changeStoreNames.bind(this),
            checkAll: this.checkAll.bind(this)
        }    

        firebase.database().ref(props.uid + '/state').on('value', (snapshot) => {

            if (!snapshot.val()) {
                firebase.database().ref(props.uid).update({state: defaultState});
                this.state = defaultState;
                this.forceUpdate();
            } else {
                this.state = snapshot.val();
                this.forceUpdate();
            }
        });

    }

    render() {

        if (!this.state) { return null; }

        let { list, stores, products } = this.state;

        //let { displayName, email, emailVerified, photoURL, uid, providerData } = this.props;

        return (
            <div>
                <Header />
                <button 
                    style={styles.signOut}
                    onClick={ (e) => {firebase.database().ref(this.props.uid || "/").off(); firebase.auth().signOut();} }>
                    Sign Out
                </button>
                <div style={styles.appBody}>
                    <ListView 
                        list={list} 
                        handlers={handlers} 
                        addError={this.state.addError} 
                        addStore={this.state.addStore} 
                        addProduct={this.state.addProduct} 
                        addQuantity={this.state.addQuantity}
                        filterValue={this.state.filterValue}
                        storeNames={this.state.storeNames}
                        stores={stores}
                        products={products} />
                </div>
                <Controls handlers={handlers} />
                <Footer />
            </div>
        );
    }

    toggleCheck(currentChecked, store, index) {

        let list = this.state.list;

        list[store].products[index].checked = currentChecked;

        firebase.database().ref(this.props.uid + '/state').update({
            list: list
        });
    }

    edit(store, index) {

        let list = this.state.list;

        list[store].products[index].editing = true;
        list[store].products[index].editKey = list[store].products[index].key;
        list[store].products[index].editQuantity = list[store].products[index].quantity;

        firebase.database().ref(this.props.uid + '/state').update({
            list: list
        });

    }

    cancelEdit(store, index) {

        let list = this.state.list;

        list[store].products[index].editing = false;
        list[store].products[index].editKey = '';
        list[store].products[index].editQuantity = 0;

        firebase.database().ref(this.props.uid + '/state').update({
            list: list
        });

    }

    changeText(newValue, store, index, selector) {

        let list = this.state.list;

        list[store].products[index][selector] = newValue;

        firebase.database().ref(this.props.uid + '/state').update({
            list: list
        });
    }

    save() {

        let list = this.state.list;

        if (!list) { list = [] }

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

        firebase.database().ref(this.props.uid + '/state').update({
            list: list
        });
    }

    bought() {

        let list = this.state.list;

        if (!list) { list = [] }

        list = list.filter( (store) => {
            store.products = store.products.filter( (product) => {return !product.checked} );

            return store.products.length > 0;
        } );

        firebase.database().ref(this.props.uid + '/state').update({
            list: list
        });
    }

    checkAll() {

        let list = this.state.list;

        if (!list) { list = [] }

        for (let i = 0; i < list.length; i++) {
            for(let j = 0; j < list[i].products.length; j++) {
                list[i].products[j].checked = true;
            }
        }

        firebase.database().ref(this.props.uid + '/state').update({
            list: list
        });
    }

    cancelAll() {

        let list = this.state.list;

        if (!list) { list = [] }

        for (let i = 0; i < list.length; i++) {
            for(let j = 0; j < list[i].products.length; j++) {
                list[i].products[j].editing = false;
                list[i].products[j].editKey = '';
                list[i].products[j].editQuantity = 0;
            }
        }

        firebase.database().ref(this.props.uid + '/state').update({
            list: list
        });
    }


    add(newStore, newProduct, newQuantity) {

        let state = this.state;
        let productArray = state.products || [];
        let storeArray = state.stores || [];
        let exists = false;

        for ( let i = 0; i < productArray.length; i++)
        {
            if (productArray[i].toLowerCase() === newProduct.toLowerCase())
            {
                exists = true;
                break;
            }
        }

        if (!exists) {
            productArray.push(newProduct);
            productArray.sort();
        }

        exists = false;

        for ( let i = 0; i < storeArray.length; i++)
        {
            if (storeArray[i].toLowerCase() === newStore.toLowerCase())
            {
                exists = true;
                break;
            }
        }

        if (!exists) {
            storeArray.push(newStore);
            storeArray.sort();
        }

        if (newStore === '') { newStore = 'None'}

        let hasStore = false;
        let storeKey = '';
        let hasProduct = false;

        if (!state.list) {state.list = []}

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

        firebase.database().ref(this.props.uid + '/state').update({
            list: list,
            addError: addError,
            addProduct: '',
            addQuantity: 1,
            addStore: '',
            products: productArray,
            stores: storeArray
        });
    }

    addError() {

        firebase.database().ref(this.props.uid + '/state').update({
            addError: true
        });
    }

    changeAddText(newValue, selector) {

        let state = this.state

        state[selector] = newValue;

        firebase.database().ref(this.props.uid).update({
            state: state
        });

    }

    selectChange(value) {

        firebase.database().ref(this.props.uid + '/state').update({
            filterValue: value
        });
    }

    changeStoreNames() {

        firebase.database().ref(this.props.uid + '/state').update({
            storeNames: !this.state.storeNames
        });
    }

}

const styles = {
    appBody: {
        paddingBottom: "75px",
        paddingTop: "40px",
    },
    signOut: {
        position: "fixed",
        zIndex: "5",
        bottom: "3px",
        right: "5px",
        border: "none",
        outline: "none",
        backgroundColor: "#FF6D00",
        height: "19px",
        padding: "0 5px",
        color: "#2979ff",
        fontWeight: "900"
    }
}

export default App;
