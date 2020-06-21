//const numberFormatter = Intl.NumberFormat('pt-BR');
const moneyFormatter = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', });

export function formatMoney(number) {
  return moneyFormatter.format(number);
}

export function formatPercentage(number) {
 // let format =  numberFormatter.format(number.toFixed(2));
  //return `(${format}%)`;
  return `(${number.toFixed(2).replace('.', ',')}%)`;
}
