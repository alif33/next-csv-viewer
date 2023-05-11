import React from 'react';
import Popup from 'reactjs-popup';
import ReactPlayer from 'react-player';

const VideoModal = ({ videoUrl }) => {

    return (
        <Popup
            trigger={<a role="button"><img src="/img/play.png" alt="" /></a>}
            modal
            nested
        >
            {close => (
                <div className="video-modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="content">
                        <ReactPlayer url={ videoUrl } playing={ true }/>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default VideoModal;