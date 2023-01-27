import {Container} from "react-bootstrap"

import "./Loader.scss"

export default function Loader(props) {
  return (
    <Container className="d-flex justify-content-center">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </Container>
  );
}