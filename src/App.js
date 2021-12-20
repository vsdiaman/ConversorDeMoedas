import React, { useState } from "react";
import "./App.css";
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
  const [inputValue, setInputValue] = useState(1);
  const [moedaDe, setMoedaDe] = useState("BRL");
  const [moedaPara, setMoedaPara] = useState("USD");
  const [exibirSpinner, setExibirSpinner] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [resultadoConversao, setResultadoConversao] = useState("");
  //const [fecharModal, setFecharModal] = useState(true);

  function handleValue(event) {
    setInputValue(event.target.value.replace(/\D/g, ""));
  }

  function handleMoedaDe(event) {
    setMoedaDe(event.target.value);
  }

  function handleMoedaPara(event) {
    setMoedaPara(event.target.value);
  }

  function handleFecharModal(event) {
    setInputValue("1");
    setMoedaDe("BRL");
    setMoedaPara("USD");
    setFormValidado(false);
    setExibirModal(false);
  }

  function converter(event) {
    event.preventDefault(); //evita da pagina seja att
    setFormValidado(true);
    if (event.currentTarget.checkValidity() === true) {
      //alert("CORRETO");
      //TODO implementar a chamada do fixer.io
      setExibirModal(true);
    }
  }

  //noValidate validated={formValidado} VALIDAÇÃO VISUAL

  return (
    <Container>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={false}>
        Erro obtendo dados de conversão, tente novamente .
      </Alert>
      <Jumbotron>
        <Form onSubmit={converter} noValidate validated={formValidado}>
          <Row>
            <Col sm="3">
              <Form.Control
                placeholder="0"
                value={inputValue}
                onChange={handleValue}
                required
              />
            </Col>
            <Col sm="3">
              <Form.Control
                as="select"
                value={moedaDe}
                onChange={handleMoedaDe}
              >
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="1" className="text-center" style={{ paddingTop: "5px" }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm="3">
              <Form.Control
                as="select"
                value={moedaPara}
                onChange={handleMoedaPara}
              >
                <ListarMoedas />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit">
                <span className={exibirSpinner ? null : "hidden"}>
                  <Spinner animation="border" size="sm" />
                </span>
                <span className={exibirSpinner ? "hidden" : null}>
                  Converter
                </span>
              </Button>
            </Col>
          </Row>
        </Form>
        <Modal show={exibirModal} onHide={handleFecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>{resultadoConversao}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Nova Conversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </Container>
  );
}

export default App;
