import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [setFilteredCards] = useState([]);

    const debouncedSearch = debounce((value) => {
        onSearch(value);
    }, 500);

    useEffect(() => {
        debouncedSearch(searchTerm);
        return () => debouncedSearch.cancel();
    }, [searchTerm]);

    const handleSearch = (searchValue) => {
        setSearchText(searchValue);
        if (!searchValue.trim()) {
            setFilteredCards(cards); // Show all cards when search is empty
            return;
        }

        const filtered = cards.filter((card) =>
            card.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            card.description.toLowerCase().includes(searchValue.toLowerCase()) ||
            card.subtitle.toLowerCase().includes(searchValue.toLowerCase()) ||
            (card.address?.city && card.address.city.toLowerCase().includes(searchValue.toLowerCase()))
        );
        setFilteredCards(filtered);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearch(''); // Call onSearch with empty string
    };

    return (
        <div
            className="search-bar mb-4"
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                transition: 'all 0.3s ease'
            }}
        >
            <SearchBar onSearch={handleSearch} />
            <InputGroup
                style={{
                    borderRadius: '50px',
                    overflow: 'hidden',
                    boxShadow: isFocused
                        ? '0 4px 12px rgba(0,0,0,0.1)'
                        : '0 2px 6px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                }}
            >
                <InputGroup.Text
                    style={{
                        background: 'white',
                        border: 'none',
                        borderRight: 'none',
                        color: isFocused ? '#0d6efd' : '#6c757d',
                        transition: 'color 0.3s ease'
                    }}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Search business cards..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        border: 'none',
                        boxShadow: 'none',
                        fontSize: '1rem',
                        padding: '12px 20px',
                        backgroundColor: 'white'
                    }}
                />
                {searchTerm && (
                    <InputGroup.Text
                        onClick={clearSearch}
                        style={{
                            background: 'white',
                            border: 'none',
                            borderLeft: 'none',
                            cursor: 'pointer',
                            color: '#6c757d',
                            transition: 'color 0.2s ease',
                            padding: '0 15px',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#dc3545'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#6c757d'}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </InputGroup.Text>
                )}
            </InputGroup>
        </div>
    );
};

export default SearchBar;