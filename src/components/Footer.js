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
        backgroundColor: '#000',
        color: '#FFF',
        height: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Footer;