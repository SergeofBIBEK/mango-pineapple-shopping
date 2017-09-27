import React, { Component } from 'react';
import './App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';

import ListView from './components/ListView.js';

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
                            checked: false
                        },
                        {
                            key: "cheese",
                            quantity: 1,
                            editing: false,
                            checked: true
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
                            checked: false
                        }
                    ]
                }
            ],
            handlers: {},
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
                <Footer />
            </div>
        );
    }
}

const styles = {
    appBody: {
        paddingBottom: "25px",
        paddingTop: "40px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'scroll'
    }
}

export default App;
