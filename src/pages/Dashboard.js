import { useState, useEffect, useContext} from "react";
import UserContext from "../UserContext";
import {Container} from "react-bootstrap"

export default function Dashboard(props){

    const { user } = useContext(UserContext);
    return <Container>
        <h1>Dashboard for admin</h1>
    </Container>
}