import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./postUser.css";
import {useNavigate, useParams } from "react-router-dom";

function PostUser() {
    
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
    }
    const navigate = useNavigate();
    const handelSubmit = async (e) =>{
        
        e.preventDefault();
        console.log(formData);
        try{
            const response = await fetch(`http://localhost:8082/api/addemployee`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            });
            const data = await response.json();
            console.log("Employee Created:",data);
            navigate('/');
        }
        catch(error){
            console.log("Error while Creating Employee:" ,error.message);
        }
    }
    const {id}=useParams();
    useEffect(()=>{
        const fetchemployee= async()=>{
            try{
                const response = await fetch(`http://localhost:8082/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);

            }
            catch(error){
                console.log("Error Occured during the process"+ error.message)
            }
        }
        fetchemployee();
    },[id])
    
    return (
        
        <>
            <div className="center-form">
                <h1>Add New Employee</h1>
                <Form onSubmit={handelSubmit}>
                    <Form.Group>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            placeholder="Enter Name" 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            type="email" 
                            name="email" 
                            placeholder="Enter Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            type="text" 
                            name="phone" 
                            placeholder="Enter Phone Number" 
                            value={formData.phone} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            type="text" 
                            name="department" 
                            placeholder="Enter Department Name" 
                            value={formData.department} 
                            onChange={handleChange} 
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">Add Employee</Button>
                </Form>
            </div>
        </>
    );
}

export default PostUser;
