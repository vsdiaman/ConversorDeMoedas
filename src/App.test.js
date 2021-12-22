import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import axios from "axios";

describe("Teste do componente de conversão de moedas", () => {
  it("deve renderizar o componente sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("deve simular uma conversao de moedas", async () => {
    const { findByTestId, getByTestId } = render(<App />);
    axiosMock.get.mockResolvedValueOnce({
      data: { success: true, rates: { BRL: 4.5664292, USD: 1.101049 } },
    });
    fireEvent.click(getByTestId("btn-converter"));
    const modal = await findByTestId("modal");
    expect(axiosMock.get).toHaveBeenCalledTimes(1); //Verifica se o axiosMock.get foi chamado 1 vez
    expect(modal).toHaveTextContent("1 BRL = 0.24 USD"); //verifica se a conversao esta funcionando corretamente
  });
});
