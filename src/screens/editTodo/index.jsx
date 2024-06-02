import axios from "axios";
import React from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../../router/route";

export const EditTodo = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [fetching, setFetching] = React.useState(false);
    const [fetchError, setFetchError] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [todoTitle, updateTodoTitle] = React.useState("");
    const [todoDate, updateTodoDate] = React.useState("");

    const onFormSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError(false);
        axios.put('https://664188143d66a67b343417df.mockapi.io/todos/'+id, {
            title: todoTitle,
            date: todoDate,
            is_completed: false,
            updated_at: new Date().toString()
        }).then(res => {
            alert('Todo Updated Successfully!!!');
            navigate(AppRoutes.allTodos);
        }).catch(err => {
            setError(true);
        }).finally(() => {
            setIsLoading(false);
        })
    };

    const fetchTodoById = () => {
        setFetching(true);
        setFetchError(false);
        axios.get('https://664188143d66a67b343417df.mockapi.io/todos/' + id)
            .then(res => {
                updateTodoTitle(res.data.title);
                updateTodoDate(res.data.date)
            })
            .catch(err => {
                setFetchError(true);
            })
            .finally(() => {
                setFetching(false);
            })
    };

    React.useEffect(() => {
        fetchTodoById();
        // eslint-disable-next-line
    }, [id]);

    return <Container>
        <h1>Edit Todo</h1>

        {fetching && <Spinner animation="border" role="status">
            <span className="visually-hidden">Fetching Todo...</span>
        </Spinner>}

        {fetchError && <Alert variant={'danger'}>
            Something went wrong, Unable to get Todo.
        </Alert>}

        {!fetching && !fetchError && <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Todo Title</Form.Label>
                <Form.Control value={todoTitle} onChange={(e) => updateTodoTitle(e.target.value)} required type="text" placeholder="Enter todo title" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Todo Date</Form.Label>
                <Form.Control value={todoDate} onChange={(e) => updateTodoDate(e.target.value)} required type="date" placeholder="Enter todo date" />
            </Form.Group>

            <Button disabled={isLoading} variant="primary" type="submit">
                {isLoading ? "Updating Todo...." : "Update Todo"}
            </Button>
        </Form>}

        {error && <Alert variant={'danger'}>
            Something went wrong, Unable to add Todo.
        </Alert>}
    </Container>
}