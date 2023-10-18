import React from 'react';

const PotionsRow = () => {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        },
        button: {
            flex: 1,
            height: 'auto',
            padding: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
        },
        image: {
            maxWidth: '100%',
            maxHeight: '100%',
            height: 'auto',
        },
    };
    
    return (
        <div style={styles.container}>
            <button style={styles.button}>
                <img src="/images/dblptsPotion.png" alt="dblpts Potion" style={styles.image} />
            </button>
            <button style={styles.button}>
                <img src="/images/HintPotion.png" alt="Hint Potion" style={styles.image} />
            </button>
            <button style={styles.button}>
                <img src="/images/freezePotion.png" alt="Freeze Potion" style={styles.image} />
            </button>
        </div>
    );
    
    
}

export default PotionsRow;
