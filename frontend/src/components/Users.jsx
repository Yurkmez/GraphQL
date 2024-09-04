// https://stackoverflow.com/questions/42173786/react-router-pass-data-when-navigating-programmatically
// Переход в другой компонент с передачей параметров
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import styleUsers from './users.module.css';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const [countsUsers, setcountsUsers] = useState();
    // Обновление списка пользователей после удаления одного из пользователей
    const [changeUserCount, setchangeUserCount] = useState(false);

    const [user, setUser] = useState();

    useEffect(() => {
        // запрос всех пользователей
        async function fetchData() {
            // ____________graphql_________________
            // Формирование тела запроса
            const query = `
            query {
                getUsers {
                    rows {
                        id firstName lastName email password 
                    }
                    count
                }
              }
            `;
            // Запрос с использованием Axios
            Axios({
                method: 'POST',
                url: 'http://localhost:5000/graphql',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                data: { query },
            }).then((response) => {
                setUsers(response.data.data.getUsers.rows);
                setcountsUsers(response.data.data.getUsers.count);
                // console.log(response.data.data.getUsers.rows);
            });

            // _______ Вариант с fetch ___________________
            // fetch('http://localhost:5000/graphql', {
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Accept: 'application/json',
            //     },
            //     body: JSON.stringify({ query }),
            // })
            //     .then((res) => res.json())
            //     .then((response) => {
            //         setUsers(response.data.getUsers.rows);
            //         setcountsUsers(response.data.getUsers.count);
            //         console.log(response.data.getUsers.rows);
            //     });
        }
        fetchData();
    }, [changeUserCount]);

    // Переход на стр. user_edit происходит при изменении ~ user,
    // при нажатии кнопки "Edit User" -> "handleUserEdit" (setUser)
    // при этом в location (на странице user) есть свойство state
    // куда мы и передаем данные для отражения на странице
    useEffect(() => {
        if (user) {
            navigate('edit', {
                state: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    id: user.id,
                },
            });
        }
    }, [user]);

    // Запрос одного пользователя
    const handleUserEdit = async (e, id) => {
        e.preventDefault();
        // ____________graphql_________________
        // Формирование тела запроса
        const query = `
            query {
                getOneUser(id_found: ${id}) {
                        id firstName lastName email 
                    }
            }
            `;
        Axios({
            method: 'POST',
            url: 'http://localhost:5000/graphql',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: { query },
        })
            .then((response) => {
                setUser(response.data.data.getOneUser);
                console.log(response.data.data.getOneUser);
            })
            .catch(function (error) {
                alert(error);
            });
    };

    // Удаление пользователя
    const handleDeleteUser = async (e, id) => {
        e.preventDefault();
        // ____________graphql_________________
        // Запрос через Ruru (5000 порт сервера)
        // mutation {
        //     deleteUser(id_found:4)
        //     }

        // Зресь мы не ждем ответа, если даже вставить "пустой" ответ - {}
        // то запись в БД не удаляется!
        const query = `
            mutation {
                deleteUser(id_found: ${id})
            }
        `;
        // При работе с graphql - метод запроса только POST !!!
        Axios({
            method: 'POST',
            url: 'http://localhost:5000/graphql',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            data: { query },
        })
            .then((response) => {
                setchangeUserCount(!changeUserCount);
                alert('User deleted');
            })
            .catch(function (error) {
                alert(error);
            });
    };

    if (users === undefined || users.length === 0)
        return (
            <>
                <h3>No users </h3>
            </>
        );
    return (
        <>
            <h2 className={styleUsers.head}>List of Users</h2>
            <div className={styleUsers.mainBlock}>
                <hr />
                {users.map((item) => {
                    return (
                        <div className={styleUsers.setBlock} key={item.id}>
                            <div className={styleUsers.setBlock1}>
                                <p>{item.firstName}</p>
                                <p>{item.lastName}</p>
                            </div>
                            <div className={styleUsers.setBlock2}>
                                <button
                                    className="btn btn-primery"
                                    onClick={(e) => handleUserEdit(e, item.id)}
                                >
                                    <strong>Edit</strong>
                                </button>
                                <button
                                    className="btn btn-primery"
                                    // className={styleUsers.link}
                                    onClick={(e) =>
                                        handleDeleteUser(e, item.id)
                                    }
                                >
                                    <strong>Delete</strong>
                                </button>
                            </div>
                        </div>
                    );
                })}
                <hr />
                <h5 className={styleUsers.counter}>
                    Total users: {countsUsers}
                </h5>
                <hr />
            </div>
        </>
    );
};

export default Users;
