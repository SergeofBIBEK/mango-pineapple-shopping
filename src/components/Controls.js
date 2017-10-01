import React, { Component } from 'react';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';
import CancelIcon from 'mdi-react/CancelIcon';
import CartIcon from 'mdi-react/CartIcon';
import CheckboxMultipleMarkedIcon from 'mdi-react/CheckboxMultipleMarkedIcon';

class Controls extends Component {

    render() {

        let { handlers } = this.props;

        return (
            <div style={styles.footerNav}>
                <div style={styles.button} onClick={handlers.checkAll}><CheckboxMultipleMarkedIcon /></div>
                <div style={styles.button} onClick={handlers.bought}><CartIcon /></div>
                <div style={styles.button} onClick={handlers.save}><ContentSaveIcon /></div>
                <div style={styles.button} onClick={handlers.cancelAll}><CancelIcon /></div>
            </div>
        )
    }

}

const styles = {
    footerNav: {
        position: 'fixed',
        bottom: '25px',
        width: '100%',
        backgroundColor: '#64B5F6',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    button: {
        margin: '0px 10px',
        padding: '5px 20px',
        borderRadius: '10px',
        backgroundColor: '#2979FF'
    }
}

export default Controls;