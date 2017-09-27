import React, { Component } from 'react';

class Header extends Component {
    
    render() {
        return (
            <div style={styles.headerNav}>
                <h3>Mango Pineapple Shopping List</h3>
            </div>
        )
    }
    
}

const styles = {
    headerNav: {
        position: 'fixed',
        top: '0px',
        width: '100%',
        backgroundColor: '#000',
        color: '#FFF',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Header;