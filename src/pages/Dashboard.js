import { useState, useEffect, useContext} from "react";
import UserContext from "../UserContext";
import {Container} from "react-bootstrap"

export default function Dashboard(props){

    const { user } = useContext(UserContext);
    return <Container>
        <h1>Dashboard for admin</h1>
        <ul><strong>You place</strong>
            <li>Chart</li>
            <li>Top Selling Item</li>
            <li>Low Stock Level</li>
        </ul>        
    </Container>
}