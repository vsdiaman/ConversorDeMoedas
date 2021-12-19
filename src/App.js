import "./App.css";
import React from "react";
import {
  Button,
  Form,
  Col,
  Spinner,
  Jumbotron,
  Alert,
  Modal,
  Container,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import ListarMoedas from "components/List/listar-moedas";

function App() {
  return (
    <Container>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={true}>
        Erro obtendo dados de conversão, tente novamente .
      </Alert>
      <Jumbotron>
        <Form>
          <Row>
            <Col sm="3">
              <Form.Control placeholder="0" value={1} required />
            </Col>
            <Col sm="3">
              <Form.Control as="select">
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="1" className="text-center" style={{ paddingTop: "5px" }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm="3">
              <Form.Control as="select">
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit">
                <Spinner animation="border" size="sm" />
                Converter
              </Button>
            </Col>
          </Row>
        </Form>
        <Modal show={false}>
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>Resultado da conversão aqui...</Modal.Body>
          <Modal.Footer>
            <Button variant="success">Nova Conversão</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </Container>
  );
}

export default App;
