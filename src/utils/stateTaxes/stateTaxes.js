import { stateTaxFormulas } from "./stateTaxFormulas";

  const stateTaxes = (state, grossIncome, filingStatus) => {
    const stateFunc = state.toLowerCase() + 'StateTaxes';
    const stateFuncCall = stateTaxFormulas[stateFunc];
    return stateFuncCall(grossIncome, filingStatus);
  };

export {stateTaxes};