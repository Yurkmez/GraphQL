// https://stackoverflow.com/questions/42173786/react-router-pass-data-when-navigating-programmatically
// Об location.state. Переход в другой компонент с передачей параметров
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';

import './user_edit_add.css';

const User = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: location.state.firstName,
        lastName: location.state.lastName,
        email: location.state.email,
        id: location.state.id,
    });

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/edit/${formData.id}`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                id: formData.id,
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="onCenterMyClass">
            <div className="row">
                <h3>Edit user "{formData.firstName}"</h3>
                <form className="col s9" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="first_name">First Name:</label>
                            <br />
                            <input
                                type="text"
                                name="firstName"
                                id="first_name"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        firstName: e.target.value,
                                    })
                                }
                                value={formData.firstName}
                                className="validate"
                                required
                                maxLength={20}
                            />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="last_name">Last Name</label>
                            <br />
                            <input
                                type="text"
                                name="lastName"
                                id="last_name"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        lastName: e.target.value,
                                    })
                                }
                                value={formData.lastName}
                                className="validate"
                                required
                                maxLength={20}
                            />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="email">Email:</label>
                            <br />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                value={formData.email}
                                className="validate"
                                required
                                maxLength={40}
                            />
                            <br />
                        </div>
                        <button
                            className="btn btn-primery btnMyClass"
                            type="submit"
                            name="action"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default User;
