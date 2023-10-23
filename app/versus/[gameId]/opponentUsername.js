import React from 'react';

const OpponentUsername = ({ username }) => {
    const usernameStyle = {
        color: "#FFD700",
        paddingLeft: "1rem"
    };

    return (
        <div style={usernameStyle}>
            {username || 'DEBUG USERNAME'}
        </div>
    );
}

export default OpponentUsername;
