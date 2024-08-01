import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const YouTubeVideoModal = ( { isOpen, videoId, onClose } ) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="YouTube Video Modal" className="video-modal" overlayClassName="video-modal-overlay" >
            <div className="video-wrapper">
                <button className="close-btn" onClick={onClose}>Close</button>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} frameBorder="0"allowFullScreen ></iframe>
            </div>
        </Modal>
    )
}
export default YouTubeVideoModal;