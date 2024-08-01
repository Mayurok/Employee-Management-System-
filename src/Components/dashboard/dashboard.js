import { useState, useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch("http://localhost:8082/api/employees");
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.log("There was some issue while fetching the data: " + error.message);
            }
        }
        fetchEmployee();
    }, []);

    const handledelete=async(id)=>{
        try{
            const response = await fetch(`http://localhost:8082/api/employee/${id}`, {
                method: 'DELETE',
        }) ;
        if (response.ok) {
            setEmployee((previousEmployees) => 
                previousEmployees.filter((emp) => emp.id !== id)
            );
}
        
    }
    catch(error){
        console.log(error.message);
    }
}

    const handleUpdate=(id)=>{
        navigate(`/employee/${id}`)
    }

    return (
        <>
            <h1 className="text-center mt-5">Employee Details</h1>
            <Container className="mt-5">
                <Row>
                    <Col>
                        <h1 className="text-center">Employees</h1>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.name}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.phone}</td>
                                        <td>{emp.department}</td>
                                        <td>
                                            <Button variant="outline-secondary" className="mr-2" onClick={()=>handleUpdate(emp.id)}>Update</Button>
                                            <Button variant="outline-danger" onClick={()=>handledelete(emp.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
