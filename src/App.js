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
                changeText: this.changeText.bind(this)
            },
            stores: [],
            products: []
        }
        
    }
    
    render() {
        
        let { list, handlers, stores, products } = this.state;
        
        return (
            <div style={styles.appBody}>
                <Header />
                <ListView list={list} handlers={handlers} />
                <Controls />
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
