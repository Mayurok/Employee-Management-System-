import "./updateUser.css";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const { id } = useParams(); 

    useEffect(() => {
        const  fetchEmployeeData= async () => {
            try {
                const response = await fetch(`http://localhost:8082/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
            } catch (error) {
                console.log("Error while fetching employee data:", error.message);
            }
        };

        fetchEmployeeData();
    }, [id]);

   
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(`http://localhost:8082/api/employee/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee Updated:", data);
            navigate("/");
        } catch (error) {
            console.log("Error while updating Employee:", error.message);
        }
    };

    return (
        <div className="center-form">
            <h1>Update Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        value={formData.name}
                        
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                        value={formData.email}
                        
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        onChange={handleChange}
                        value={formData.phone}
                       
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        type="text"
                        name="department"
                        placeholder="Enter Department Name"
                        onChange={handleChange}
                        value={formData.department}
                        
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Update Employee</Button>
            </Form>
        </div>
    );
};

export default UpdateUser;
