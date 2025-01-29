import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

const CrmUserEdit = ({ show, onClose, formData, handleInputChange, handleSaveUser }) => {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await handleSaveUser();
        } finally {
            setIsSaving(false);
        }
    };

    const formControlStyle = {
        backgroundColor: '#ffffffff', // ✅ Ensures white background for text visibility
        color: '#000000', // ✅ Ensures black text for visibility
        border: '1px solid #4682B4', // ✅ Slight blue border for better UI
        padding: '8px',
        borderRadius: '5px',

    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg" dialogClassName="modal-90w">
            <Modal.Header
                closeButton
                style={{
                    backgroundColor: 'var(--bs-primary, #4682B4)',
                    color: '#FFFFFF'
                }}
            >
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    backgroundColor: '#F8F9FA',
                    color: '#000000',
                    maxHeight: 'calc(100vh - 210px)',
                    overflowY: 'auto'
                }}
            >
                <Form>
                    <Row xs={1} sm={1} md={2} className="g-4">
                        {/* Personal Information Section */}
                        <Col xs={12}>
                            <h6 className="border-bottom pb-2">Personal Information</h6>
                        </Col>
                        {/* Name Fields */}
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name.first"
                                    value={formData.name?.first || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name.middle"
                                    value={formData.name?.middle || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name.last"
                                    value={formData.name?.last || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>

                        {/* Contact Information Section */}
                        <Col xs={12}>
                            <h6 className="border-bottom pb-2 mt-3">Contact Information</h6>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={formData.phone || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>

                        {/* Image Fields */}
                        <Col>
                            <Form.Group>
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image.url"
                                    value={formData.image?.url || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>

                        {/* Address Section */}
                        <Col xs={12}>
                            <h6 className="border-bottom pb-2 mt-3">Address Information</h6>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.country"
                                    value={formData.address?.country || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.city"
                                    value={formData.address?.city || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address.street"
                                    value={formData.address?.street || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>House Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="address.houseNumber"
                                    value={formData.address?.houseNumber || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>ZIP</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="address.zip"
                                    value={formData.address?.zip || ''}
                                    onChange={handleInputChange}
                                    style={formControlStyle}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer
                style={{
                    backgroundColor: 'var(--bs-primary, #4682B4)',
                    borderTop: 'none',
                    padding: '1rem',
                }}
            >
                <div className="d-flex gap-2">
                    <Button
                        variant="light"
                        onClick={onClose}
                        size="sm"
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="dark"
                        onClick={handleSave}
                        size="sm"
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default CrmUserEdit;