import React from 'react';

const WaveAnimation = () => {
    /* Wave animation of opponent gamebox which is triggered when they type */
    const styles = {
        waveContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        circle: {
            width: '20px',
            height: '20px',
            margin: '0 10px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            animation: 'wave 0.6s infinite',
        },
        delay1: {
            animationDelay: '0.2s',
        },
        delay2: {
            animationDelay: '0.4s',
        },
        keyframes: `
            @keyframes wave {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
        `,
    };

    return (
        <div style={styles.waveContainer}>
            <style>{styles.keyframes}</style>
            <div style={styles.circle}></div>
            <div style={{ ...styles.circle, ...styles.delay1 }}></div>
            <div style={{ ...styles.circle, ...styles.delay2 }}></div>
        </div>
    );
}

export default WaveAnimation;
