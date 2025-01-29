import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/layout/Header';
import adminService from '../../services/adminService';
import CrmUserEdit from './CrmUserEdit';
import { Row, Col } from 'react-bootstrap';

const CrmPage = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(30);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(1);


    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {

        try {
            setIsLoading(true);
            const response = await adminService.getAllUsers();
            console.log("Fetched Users:", response);

            if (response?.users && Array.isArray(response.users)) {
                setUsers(response.users);
                setTotalUsers(response.total || response.users.length);
                setTotalPages(response.totalPages || Math.ceil(response.total / usersPerPage));
            } else if (Array.isArray(response)) {
                setUsers(response);
                setTotalUsers(response.length);
                setTotalPages(Math.ceil(response.length / usersPerPage));
            } else {
                console.error("Unexpected API Response Format:", response);
                setUsers([]);
            }
        } catch (error) {
            console.error("Fetch Users Error:", error);
            toast.error('Failed to fetch users');
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };
    const handleToggleBusinessStatus = async (userId, currentStatus) => {
        try {
            console.log("Toggling business status for user ID:", userId);

            // קריאה ל-API עם `userId` וסטטוס חדש
            const updatedUser = await adminService.updateUserStatus(userId, !currentStatus);
            console.log("Updated User Data:", updatedUser);

            // עדכון הסטטוס ישירות בטבלה
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, isBusiness: updatedUser.isBusiness } : user
                )
            );

            toast.success(
                updatedUser.isBusiness
                    ? 'User successfully updated to Business'
                    : 'User successfully updated to Regular'
            );
        } catch (error) {
            console.error("Error Updating User Status:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to update user status');
        }
    };
    const handleEditUser = (user) => {
        if (!user || !user._id) return; // ✅ Prevents undefined users from causing issues
        // בדיקה אם `user.name` מוגדר
        const firstName = user.name?.first ?? 'Unknown';
        const middleName = user.name?.middle ?? '';
        const lastName = user.name?.last ?? 'No Last Name';

        setSelectedUser(user);
        setFormData({
            name: `${firstName} ${middleName} ${lastName}`.trim(),
            phone: user.phone || '',
            isBusiness: !!user.isBusiness,
            image: user.image || { url: '', alt: '' },
            address: {
                state: user.address?.state || '',
                country: user.address?.country || '',
                city: user.address?.city || '',
                street: user.address?.street || '',
                houseNumber: user.address?.houseNumber || 0,
                zip: user.address?.zip || 0
            }
        });
        setTimeout(() => setShowEditModal(true), 100); // ✅ Small delay prevents UI freezing
    };

    const handleSaveUser = async () => {
        try {
            console.log("Updating user with ID:", selectedUser._id);

            // ✅ Ensure `formData.name` is an object before trying to access properties
            const updatedUser = {
                name: {
                    first: formData.name?.first ? formData.name.first.trim() : '',
                    middle: formData.name?.middle ? formData.name.middle.trim() : '',
                    last: formData.name?.last ? formData.name.last.trim() : 'No Last Name'
                },
                phone: formData.phone || '',
                image: {
                    url: formData.image?.url || '',
                    alt: formData.image?.alt || ''
                },
                address: {
                    state: formData.address?.state || '',
                    country: formData.address?.country || '',
                    city: formData.address?.city || '',
                    street: formData.address?.street || '',
                    houseNumber: formData.address?.houseNumber || 0,
                    zip: formData.address?.zip || 0
                }
            };

            console.log("Updated User Data (Before Sending):", updatedUser);
            const response = await adminService.updateUser(selectedUser._id, updatedUser);
            console.log("Update Response:", response);
            toast.success('User updated successfully');
            setShowEditModal(false);
            fetchUsers();
        } catch (error) {
            console.error("Error Updating User:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to update user');
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            // ✅ Handle nested name fields correctly
            if (name.startsWith("name.")) {
                return {
                    ...prevData,
                    name: {
                        ...prevData.name,
                        [name.split(".")[1]]: value, // ✅ Updates the specific key (first, middle, last)
                    },
                };
            }

            // ✅ For other fields, update as normal
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const handleDeleteUser = async (userId) => {
        console.log("Attempting to delete user with ID:", userId);

        if (!userId) {
            toast.error("Error: User ID is missing!");
            return;
        }

        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await adminService.deleteUser(userId);
                console.log("Delete Response:", response);
                fetchUsers(); // Refresh users list after deletion
                toast.success('User deleted successfully');
            } catch (error) {
                console.error("Error Deleting User:", error.response?.data || error.message);
                toast.error(error.response?.data?.message || 'Admin User Cannot be deleted');
            }
        }
    };


    return (
        <>
            <Header title="User Management" subtitle="Manage all users in the system" />
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xs={12} md={11} lg={10}>
                        <div className="table-responsive">
                            <Table className="table table-hover table-striped align-middle text-center">
                                <thead className="table-light">
                                    <tr>
                                        <th className="align-middle">Name</th>
                                        <th className="align-middle">Email</th>
                                        <th className="align-middle">Phone</th>
                                        <th className="align-middle">Status</th>
                                        <th className="align-middle">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td className="text-break">{`${user.name?.first ?? ''} ${user.name?.last ?? ''}`}</td>
                                            <td className="text-break">{user.email ?? 'N/A'}</td>
                                            <td className="text-break">{user.phone ?? 'N/A'}</td>
                                            <td>
                                                <Badge bg={user.isBusiness ? 'success' : 'secondary'}>
                                                    {user.isBusiness ? 'Business' : 'Regular'}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-1">
                                                    <Button variant="info" size="sm" onClick={() => handleToggleBusinessStatus(user._id, user.isBusiness)}>
                                                        <FontAwesomeIcon icon={faExchangeAlt} />
                                                    </Button>
                                                    <Button variant="light" size="sm" onClick={() => handleEditUser(user)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>


            <CrmUserEdit
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSaveUser={handleSaveUser}
            />
        </>
    );
};

export default CrmPage;
