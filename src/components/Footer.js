import { Container, Row, Col } from "react-bootstrap"

export default function Footer() {
    return (
        <div>
            <footer className="mb-2 footer">
                <Container fluid>
                    <Row style={{ color: "gray" }}>
                    <Col className="text-end" md="6">
                        <p>Copyright &copy; 2023</p>
                    </Col>
                    <Col className="text-start" md="6">
                        <p className="float-md-right">
                        Designed and developed by Diyana Ivanova
                        </p>
                    </Col>
                    </Row>
                </Container>
            </footer>
      </div>
    )
}