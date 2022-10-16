import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import { styled, makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate,useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { updateUser, getSingleUser } from '../redux/actions';
import AddUser from './AddUser';

const useStyles = styled((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "45ch",
        }
    },
}));
const EditUser = () => {
    const classes = useStyles();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {id} = useParams();
    const {user} =useSelector(state => state.data);
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    })

    const [error,setError]= useState(" ");
    
    useEffect(() =>{
        dispatch(getSingleUser(id))
    },[]);

    useEffect(() =>{
        if(user){
             setState({...user});
        }
        
    },[user]);
    const { name, email, contact, address } = state;
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !email || !contact){
            setError("Please input all input Field");
        }else{
          dispatch(updateUser(state,id));
          navigate("/");
          setError("")
        }
    };
    return (
        <div>
            <Button style={{ width: "100px", marginTop: "5px" }} onClick={() => navigate("/")} variant="contained" color="secondary" type="submit">Back</Button>
            <h2>Edit User Details</h2>
            {error && <h3 style={{color:"red"}}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" name="name" label="Name" value={name} variant="standard" type="text" onChange={handleInputChange} /><br />
                <TextField id="standard-basic" name="email" label="Email" value={email} variant="standard" type="email" onChange={handleInputChange} /><br />
                <TextField id="standard-basic" name="contact" label="Contact" value={contact} variant="standard" type="number" onChange={handleInputChange} /><br />
                <TextField id="standard-basic" name="address" label="Address" value={address} variant="standard" type="text" onChange={handleInputChange} /><br />

                <Button style={{ width: "100px", marginTop: "5px" }} variant="contained" color="primary" type="submit">Update</Button>
            </form>
        </div>
    )
}

export default EditUser