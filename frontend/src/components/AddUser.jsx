import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

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

        // ____________graphql_________________
        // Формирование тела запроса
        const query = `
            mutation {
                createUser(input: {
                    firstName: "${formData.firstName}",
                    lastName: "${formData.lastName}",
                    email: "${formData.email}",
                    password: "${formData.password}", 
                }) {
                    firstName lastName email 
                }
            }
        `;
        try {
            Axios({
                method: 'POST',
                url: 'http://localhost:5000/graphql',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                data: { query },
            }).then((response) => {
                console.log(response.data.data.createUser);
                navigate('/');
            });
            // _______ Вариант с fetch ___________________
            // await fetch('http://localhost:5000/graphql', {
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Accept: 'application/json',
            //     },
            //     body: JSON.stringify({ query }),
            // })
            //     .then((res) => res.json())
            //     .then((response) => {
            //         console.log(response.data.createUser);
            //         navigate('/');
            //     });
        } catch (error) {
            console.log(error);
        }
    }

    // await axios.post('http://localhost:5000/add', {
    //     firstName: formData.firstName,
    //     lastName: formData.lastName,
    //     email: formData.email,
    //     password: formData.password,
    // });
    // navigate('/');

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
