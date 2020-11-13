import React from "react";
import { Container, Row, Col } from 'reactstrap';

function Footer() {

    return (
        <div className="footer bg-light text-break">
            <Container>
                <Row>
                    <Col>
                        <span>created by <a href="https://github.com/Dindonpingpong">rkina</a> & <a href="https://github.com/NyaMilk">mgrass</a></span>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;
