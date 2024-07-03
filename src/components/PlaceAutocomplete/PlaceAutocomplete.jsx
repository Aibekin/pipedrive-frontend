import React, { useRef, useEffect, useState } from 'react';

export function AutocompleteInput({ onPlaceSelect, ...props }) {
    const inputRef = useRef(null);
    const [autocomplete, setAutocomplete] = useState(null);

    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                fields: ['geometry', 'name', 'formatted_address'],
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                onPlaceSelect(place);
            });

            setAutocomplete(autocomplete);
        }
    }, []);

    return (<input {...props} ref={inputRef} />);
};