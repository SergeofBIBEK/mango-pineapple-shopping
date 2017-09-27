import React, { Component } from 'react';

class Controls extends Component {

    render() {
        
        let { handlers } = this.props;
        
        return (
            <div style={styles.footerNav}>
                <button onClick={handlers.bought}>Bought</button>
                <button onClick={handlers.save}>Save</button>
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
}

export default Controls;