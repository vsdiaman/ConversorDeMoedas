import React, { useState } from "react";
import axios from "axios";
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
  const BASE_URL =
    "http://data.fixer.io/api/latest?access_key=d4ccb5b6b46428aa9c4362f9e948d02e";
  const [inputValue, setInputValue] = useState(1);
  const [moedaDe, setMoedaDe] = useState("BRL");
  const [moedaPara, setMoedaPara] = useState("USD");
  const [exibirSpinner, setExibirSpinner] = useState(false);
  const [formValidado, setFormValidado] = useState(false);
  const [exibirModal, setExibirModal] = useState(false);
  const [resultadoConversao, setResultadoConversao] = useState("");
  const [error, setError] = useState(false);
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
      //setExibirModal(true); testando pra ve se o modal esta resentando ps presets

      setExibirSpinner(true);
      axios
        .get(BASE_URL)
        .then((response) => {
          const cotacao = obterCotacao(response.data);
          if (cotacao) {
            setResultadoConversao(
              `${inputValue} ${moedaDe} = ${cotacao}${moedaPara}`
            );
            setExibirModal(true);
            setExibirSpinner(false);
            setError(false);
          } else {
            exibirError();
          }
        })
        .catch((err) => exibirError());
    }
  }
  function obterCotacao(dadosCotacao) {
    if (!dadosCotacao || dadosCotacao.success !== true) {
      return false;
    }
    const cotacaoDe = dadosCotacao.rates[moedaDe];
    const cotacaoPara = dadosCotacao.rates[moedaPara];
    const cotacao = (1 / (cotacaoDe * cotacaoPara)) * inputValue;
    return cotacao.toFixed(2);
  }

  //noValidate validated={formValidado} VALIDAÇÃO VISUAL

  function exibirError() {
    setError(true);
    setExibirSpinner(false);
  }

  return (
    <Container>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={error}>
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
        <Modal
          show={exibirModal}
          onHide={handleFecharModal}
          data-testid="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>{resultadoConversao}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={handleFecharModal}
              data-testid="btn-conversao"
            >
              Nova Conversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </Container>
  );
}

export default App;
