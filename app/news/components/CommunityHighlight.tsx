import React from 'react';

const CommunityHighlights: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <img
                src="https://firebasestorage.googleapis.com/v0/b/foundation-fm.firebasestorage.app/o/Foundation_FM_Media%2Fpexels-olly-3768709.jpg?alt=media&token=c23fa750-b11a-4057-abac-e3bb2208c3f6"
                alt="Community Highlights"
                style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                textAlign: 'center',
            }}>
                <h1 style={{ fontSize: '2em', marginBottom: '10px' }}>
                    LATEST UPDATES, STORIES, AND COMMUNITY HIGHLIGHTS
                </h1>
                <p style={{ fontSize: '1em' }}>
                    Stay Connected with The Latest Updates, Stories, And Community Highlights From Across
                    The Globe. Timely, Relevant, And Impactful Information That Matters To You.
                </p>
            </div>
        </div>
    );
};

export default CommunityHighlights;
