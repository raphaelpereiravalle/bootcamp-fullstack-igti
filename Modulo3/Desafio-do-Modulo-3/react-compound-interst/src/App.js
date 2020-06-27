import React, { useState } from 'react';
import './App.css';
import Form from './componets/Form';
import Installments from './componets/Installments';

function App() {
  // Constantes com estado inicial
  const [montanteInicial, setMontanteInicial] = useState(0);
  const [taxaJurosMensal, setTaxaJurosMensal] = useState(0);
  const [periodo, setPeriodo] = useState(1);

  // Eventos
  const onChangeMontanteInicial = (event) => setMontanteInicial(event.target.value);
  const onChangeTaxaJurosMensal = (event) => setTaxaJurosMensal(event.target.value);
  const onChangePeriodo = (event) => {
    let p = event.target.value;
    if (p >= 1) {
      setPeriodo(p);
    }
  }

  return (
    <div className="container">
      <h1 className="center">React - Juros Compostos</h1>
      <Form
        montanteInicial={montanteInicial}
        taxaJurosMensal={taxaJurosMensal}
        periodo={periodo}
        onChangeMontanteInicial={onChangeMontanteInicial}
        onChangeTaxaJurosMensal={onChangeTaxaJurosMensal}
        onChangePeriodo={onChangePeriodo}
      />
      <Installments
        montanteInicial={montanteInicial}
        taxaJurosMensal={taxaJurosMensal}
        periodo={periodo}
      />
    </div>
  );
}

export default App;
