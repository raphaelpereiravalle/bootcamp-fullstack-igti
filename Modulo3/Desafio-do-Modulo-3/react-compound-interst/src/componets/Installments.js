import React, { useEffect, useState } from 'react'
import Installment from './Installment';

export default function Installments(props) {

    const { montanteInicial, taxaJurosMensal, periodo } = props;
    const [ installments, setInstallments ] = useState([]);

    useEffect(() => {
        let installments = [];

        for (let i = 1; i <= periodo; i++) {
            installments.push(montanteInicial * (1 + taxaJurosMensal / 100) ** i);
        }

        setInstallments(installments);
    }, [montanteInicial, taxaJurosMensal, periodo]);

    return (
        <div className="row">
            {installments.map((installment, index) => {
                return (
                    <Installment
                        key={index}
                        number={++index}
                        taxa={taxaJurosMensal}
                        presentValue={montanteInicial}
                        currentValue={installment}
                    />
                );
            })}
        </div>
    );
}
