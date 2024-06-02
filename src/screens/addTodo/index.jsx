import axios from "axios";
import React from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/route";

export const AddTodo = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [todoTitle, updateTodoTitle] = React.useState("");
    const [todoDate, updateTodoDate] = React.useState("");
    const [isCompleted, setIsCompleted] = React.useState(false);

    const onFormSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);
        setError(false);
        axios.post('https://664188143d66a67b343417df.mockapi.io/todos', {
            title: todoTitle,
            date: todoDate,
            is_completed: isCompleted,
            completed_at: isCompleted ? new Date().toISOString() : null,
            created_at: new Date().toISOString()
        }).then(res => {
            alert('Todo Created Successfully!!!');
            navigate(AppRoutes.allTodo);
        }).catch(err => {
            setError(true);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const markAsCompleted = () => {
        setIsCompleted(true);
    };

    const undoCompletion = () => {
        setIsCompleted(false);
    };

    return (
        <Container>
            <h1>Add New Todo</h1>

            <Button onClick={markAsCompleted}>Mark as Completed</Button>
            {isCompleted && <Button onClick={undoCompletion}>Undo Completion</Button>}

            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Todo Title</Form.Label>
                    <Form.Control value={todoTitle} onChange={(e) => updateTodoTitle(e.target.value)} required type="text" placeholder="Enter todo title" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Todo Date</Form.Label>
                    <Form.Control value={todoDate} onChange={(e) => updateTodoDate(e.target.value)} required type="date" placeholder="Enter todo date" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Completed At</Form.Label>
                    <Form.Control 
                        value={isCompleted ? new Date().toISOString().split('T')[0] : ''} 
                        disabled 
                        type="text" 
                        placeholder="Completed At" 
                    />
                </Form.Group>

                <Button disabled={isLoading} variant="primary" type="submit">
                    {isLoading ? "Adding Todo...." : "Add Todo"}
                </Button>
            </Form>

            {error && <Alert variant={'danger'}>
                Something went wrong, Unable to add Todo.
            </Alert>}
        </Container>
    );
};