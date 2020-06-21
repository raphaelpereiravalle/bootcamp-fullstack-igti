import React, { Component } from 'react';
import InputFullSalary from './components/input/InputFullSalary';
import { calculateSalary } from './helpers/salary';
import InputReadOnly from './components/input/InputReadOnly';
import ProgressBarSalary from './components/bar/ProgressBarSalary';
import { formatMoney } from './helpers/formatters';

// Constantes com as cores
const COLOR_BASE = '#000';
const COLOR_INSS = '#e67e22';
const COLOR_IRPF = '#c0392b';
const COLOR_NET_SALARY = '#16a085';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      valeu: 0
    }
  }

  handleSalaryChange = (valeu) => {
    this.setState({
      valeu
    });
  };

  render() {
    const { valeu } = this.state;

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalary(valeu);

    const salary = valeu;
    const percentINSS = (discountINSS / salary) * 100;
    const percentIRPF = (discountIRPF / salary) * 100;
    const percentNetSalary = 100 - percentINSS - percentIRPF;

    return (
      <div className="container">
        <h1 className="center">React Salário</h1>

        <div className="row">
          <div className="col s12">
            <InputFullSalary
              label="Salário Bruto"
              value={salary}
              onChange={this.handleSalaryChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col s12">
            <InputReadOnly
              label="Base INSS:"
              value={formatMoney(baseINSS)}
              color={COLOR_BASE}
            />
            <InputReadOnly
              label="Desconto INSS:"
              value={formatMoney(discountINSS)}
              percentage={percentINSS}
              color={COLOR_INSS}
            />
            <InputReadOnly
              label="Base IRPF:"
              value={formatMoney(baseIRPF)}
              color={COLOR_BASE}
            />
            <InputReadOnly
              label="Desconto IRPF:"
              value={formatMoney(discountIRPF)}
              percentage={percentIRPF}
              color={COLOR_IRPF}
            />
            <InputReadOnly
              label="Salário Líquido:"
              value={netSalary}
              percentage={percentNetSalary}
              color={COLOR_NET_SALARY}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <ProgressBarSalary
              colorINSS={COLOR_INSS}
              percentINSS={percentINSS}
              colorIRPF={COLOR_IRPF}
              percentIRPF={percentIRPF}
              colorNetSalary={COLOR_NET_SALARY}
              percentNetSalary={percentNetSalary}
            />
          </div>
        </div>
      </div>
    );
  }
}
