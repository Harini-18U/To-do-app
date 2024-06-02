import React from "react";
import { Alert, Button, Col, Row, Spinner, Table } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/route";

export const AllTodos = (props) => {

    const navigate = useNavigate();

    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const onAddNewTodoBtnClicked = () => {
        navigate(AppRoutes.addTodo);
    };

    const onEditBtnClicked = (id) => {
        navigate('/editTodo/' + id);
    };

    const onDeleteBtnClicked = (id) => {
        if (window.confirm('Are you sure do you want to delete?')) {
            setIsLoading(true);
            axios.delete('https://664188143d66a67b343417df.mockapi.io/todos/' + id)
                .then(res => {
                    alert('Deleted Successfully!');
                    fetchAllTodos();
                })
                .catch(err => {
                    alert('Something went wrong, Unable to delete.')
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    };

    const fetchAllTodos = () => {
        setIsLoading(true);
        setError(false);
        axios.get('https://664188143d66a67b343417df.mockapi.io/todos')
            .then((response) => {
                // handle success
                setData(response.data);
            })
            .catch((error) => {
                // handle error
                setError(true);
                console.log(error);
            })
            .finally(() => {
                // always executed
                setIsLoading(false);
            });
    }

    const markAsCompleted = (id) => {
        setIsLoading(true);
        axios.put(`https://664188143d66a67b343417df.mockapi.io/todos/${id}`, {
            is_completed: true,
            completed_at: new Date().toString()
        })
        .then((response) => {
            console.log("Todo marked as completed successfully:", response.data);
            fetchAllTodos();
        })
        .catch((error) => {
            console.error("Error marking todo as completed:", error);
            setError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };    

    const undoCompletion = (id) => {
        setIsLoading(true);
        axios.put(`https://664188143d66a67b343417df.mockapi.io/todos/${id}`, {
            is_completed: false,
            completed_at: null
        })
        .then((response) => {
            console.log("Todo completion status undone successfully:", response.data);
            fetchAllTodos();
        })
        .catch((error) => {
            console.error("Error undoing completion status:", error);
            setError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };
    

    React.useEffect(() => {
        fetchAllTodos();
    }, []);

    return <div>

        <Row>
            <Col>
                <h1>All Todos</h1>
            </Col>

            <Col>
                <Button onClick={onAddNewTodoBtnClicked}>Add New Todo</Button>
            </Col>
        </Row>

        {isLoading && <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>}

        {error && <Alert variant={'danger'}>
            Something went wrong, Unable to fetch todos.
        </Alert>}

        {!isLoading && !error && <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Is Completed?</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((todo) => {
                    return (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.date}</td>
                            <td>{todo.is_completed ? "Yes" : "No"}</td>
                            <td>{todo.completed_at ? todo.completed_at : "-"}</td>
                            <td>{todo.created_at}</td>
                            <td>{todo.updated_at}</td>
                            <td>
                                <Button onClick={() => onEditBtnClicked(todo.id)}>Edit</Button>
                                <Button onClick={() => onDeleteBtnClicked(todo.id)} style={{ marginLeft: 8 }} variant="danger">Delete</Button>
                                {!todo.is_completed && <Button onClick={() => markAsCompleted(todo.id)}>Mark as Completed</Button>}
                                {todo.is_completed && <Button onClick={() => undoCompletion(todo.id)}>Undo Completion</Button>}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>}
    </div>
}