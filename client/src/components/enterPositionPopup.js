import React, { useState } from 'react';
import '../styleSheet/createUpload.css'
import img3 from '../images/28.png'

export default function EnterPositionPopup({ onClose, onSave }) {

    const [jobPosition, setJobPosition] = useState('');
    const [company, setCompany] = useState('');

    const handleSave = () => {
        const data = {
            jobPosition,
            company,
        };
        onSave(data);
        onClose();
    };

    return (
        <div className="homePpopup">
            <div className="popup-content">
            <h2 className='jobHomeHeader'>
                    <img src={img3} className='popupImg' />
                    <span className="close" onClick={onClose}>&times;</span>
                    Add Job Details</h2>
                <div>
                    <label className='jobDetailsInfoLabel'>Job Position:</label>
                    <input
                    className='detailsInfoInput'
                        type="text"
                        value={jobPosition}
                        onChange={(e) => setJobPosition(e.target.value)}
                    />
                </div>
                <div>
                    <label className='jobDetailsInfoLabel'>Company:</label>
                    <input
                    className='detailsInfoInput'
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <button onClick={handleSave} className="savePositionNow">Apply Now</button>
            </div>
        </div>
    );
};


