import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";


const options = [
    {
        name: 'Enable body scrolling',
        scroll: true,
        backdrop: true,
      }];
  
  export default function SideNav({ name, ...props }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
  
    return (
      <>
        <Button variant="primary" onClick={toggleShow} className="me-2">
          Toggle SideNav
        </Button>
        <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }