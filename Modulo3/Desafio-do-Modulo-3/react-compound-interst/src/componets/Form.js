import React from 'react'

export default function Form(props) {
    const {
        montanteInicial,
        taxaJurosMensal,
        periodo,
        onChangeMontanteInicial,
        onChangeTaxaJurosMensal,
        onChangePeriodo
    } = props;

    return (
        <div className="row">
            <form className="col s12">
            <div className="row">
                <div className="input-field col s4">
                    <input
                        id="momntante-inicial"
                        type="Number"
                        step="100"
                        value={montanteInicial}
                        onChange={onChangeMontanteInicial}
                    />
                    <label htmlFor="momntante-inicial">
                        Montante inicial:
                    </label>
                </div>
                <div className="input-field col s4">
                    <input
                        id="taxa-juros-mensal"
                        type="Number"
                        step="0.1"
                        value={taxaJurosMensal}
                        onChange={onChangeTaxaJurosMensal}
                    />
                    <label htmlFor="taxa-juros-mensal">
                        Taxa de juros mensal
                    </label>
                </div>
                <div className="input-field col s4">
                    <input
                        id="periodo"
                        type="Number"
                        min="1"
                        value={periodo}
                        onChange={onChangePeriodo}
                        class="validate"
                    />
                    <label htmlFor="periodo">
                        Período (meses):
                    </label>
                </div>
                </div>
            </form>
        </div>
    );
}
