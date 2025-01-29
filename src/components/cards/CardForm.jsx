import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import BasicDetails from './form/BasicDetails';
import ContactDetails from './form/ContactDetails';
import AddressDetails from './form/AddressDetails';
import ImageDetails from './form/ImageDetails';


const CardForm = ({ initialData, onSubmit: onSubmitProp }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: initialData || {}
    });

    const handleFormSubmit = (data) => {
        const formattedData = {
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            phone: data.phone,
            email: data.email,
            web: data.web || "",
            image: {
                url: data.imageUrl || '',
                alt: data.imageAlt || 'Profile Image',
            },
            address: {
                state: data.state || "",
                country: data.country,
                city: data.city,
                street: data.street,
                houseNumber: Number(data.houseNumber),
                zip: data.zip || 0
            }
        };
        onSubmitProp(formattedData);
    };

    return (
        <Card className="card-form">
            <Card.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <BasicDetails register={register} errors={errors} />
                    <ContactDetails register={register} errors={errors} />
                    <AddressDetails register={register} errors={errors} />
                    <ImageDetails register={register} errors={errors} />

                    <div className="d-flex justify-content-end gap-2">
                        <Button
                            as={Link}
                            to="/my-cards"
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Card'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CardForm;