import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../../redux/authSlice/AuthSlice";
import swAlert from "../../../swAlert/swAlert";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { profileURL } from "../../../axiosInstance/axiosInstance";
import "./profile.css" 
const Profile = () => {
  let navigate=useNavigate()
  const { isLoading, error, postValue } = useSelector((state) => state.auth);
  let dispatch = useDispatch();
  console.log("profile user value",postValue)
  let [data, setData] = useState({});
    //  console.log("data",data)
  let [pic,setPic]=useState("")

  useEffect(() => {
    dispatch(profile())
    .then((res) => {
      // console.log("profile fetched", res);
      if (res.payload.status === 200) {
        setData(postValue);
        const image=profileURL(postValue.profile_pic)
        setPic(image)
        swAlert("success", res.payload.message, 700);
      } else {
        swAlert("error", res.payload.message, 700);
      }
    })
    .catch(err=>console.log("axios error for profile",err))

  }, [dispatch]);

  const logOut=()=>{
    window.sessionStorage.clear();
    navigate("/");
    swAlert("success","Log out successfully",400)
  }

  return (
    <>{isLoading && <>Loading...</>}
    <br />
    {error && <>Error : {error}</>}
<section className="profile d-flex justify-content-center mt-5">

    <Card style={{ width: '18rem' }} className="shadow-sm">
    
    <Card.Img variant="top" src={pic} height={280} width={230}/>
    <Card.Body>
      <Card.Title> {data.first_name} {data.last_name}</Card.Title>
      <Card.Text>
      {data.email}
      </Card.Text>
      <Button variant="outline-dark" onClick={logOut} >Log out</Button>
    </Card.Body>
  </Card>
  </section>
  </>
  );
};

export default Profile;
 