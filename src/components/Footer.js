import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <div style={styles.footerNav}>
                <p>by SergeofBIBEK</p>
            </div>
        )
    }

}

const styles = {
    footerNav: {
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        backgroundColor: '#1976D2',
        color: '#FF9800',
        height: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    }
}

export default Footer;