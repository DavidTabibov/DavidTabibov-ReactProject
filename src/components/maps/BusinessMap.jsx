import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const BusinessMap = ({ address }) => {
    const [mapUrl, setMapUrl] = useState('');

    useEffect(() => {
        if (!address?.street || !address?.city || !address?.country) return;

        const formattedAddress = `${address.street} ${address.houseNumber || ''}, ${address.city}, ${address.country}`;
        const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(formattedAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        setMapUrl(embedUrl);
    }, [address]);

    if (!mapUrl) return null;

    return (
        <div className="map-container">
            <iframe
                width="100%"
                height="400"
                style={{
                    border: 0,
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '10px'
                }}
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Business Location"
            />
            <Button
                variant="outline-primary"
                href={`https://maps.google.com/maps?q=${encodeURIComponent(
                    `${address.street} ${address.houseNumber || ''}, ${address.city}, ${address.country}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-2 mx-auto"
            >
                <FontAwesomeIcon icon={faMapMarkedAlt} />
                Open in Google Maps
            </Button>
        </div>
    );
};

export default BusinessMap;