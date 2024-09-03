import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './user_edit_add.css';

const AddUser = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/add', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    // По идее, эти процедуры должны очищать поля ввода, но почемуто они их очищают раньше, чем данные отправляются
    // https://bobbyhadz.com/blog/javascript-clear-input-field-after-submit
    // window.onload = function () {
    // const formListen = document.getElementById('form_addUser');
    // formListen.addEventListener('submit', () => {
    //     // clear form after submit
    //     formListen.reset();
    // });
    // };

    return (
        <div className="onCenterMyClass">
            <div className="row">
                <h3>Add user</h3>
                <form
                    className="col s9"
                    onSubmit={handleSubmit}
                    id="form_addUser"
                >
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

                        <div className="input-field col s6">
                            <label htmlFor="password">Password:</label>
                            <br />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                value={formData.password}
                                className="validate"
                                required
                                maxLength={15}
                            />
                            <br />
                        </div>

                        <button
                            className="btn btn-primery btnMyClass"
                            type="submit"
                            name="action"
                        >
                            Sing Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
