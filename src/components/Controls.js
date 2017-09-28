import React, { Component } from 'react';

class Controls extends Component {

    render() {
        
        let { handlers } = this.props;
        
        return (
            <div style={styles.footerNav}>
                <button style={styles.button} onClick={handlers.bought}>Bought</button>
                <button style={styles.button} onClick={handlers.save}>Save</button>
                <button style={styles.button} onClick={handlers.cancelAll}>Cancel All</button>
            </div>
        )
    }

}

const styles = {
    footerNav: {
        position: 'fixed',
        bottom: '25px',
        width: '100%',
        backgroundColor: '#FFF',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: '0px 10px',
        padding: '5px'
    }
}

export default Controls;