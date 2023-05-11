import React from 'react';
import MovingText from 'react-moving-text';

const AnimatedTitle = () => {

    return (
        <h1>
            <MovingText
                type="shadow"
                duration="3000ms"
                delay="0s"
                direction="normal"
                timing="ease"
                iteration="infinite"
                fillMode="none">
                SMA for Athletes
            </MovingText> 
        </h1>
    );
};

export default AnimatedTitle;