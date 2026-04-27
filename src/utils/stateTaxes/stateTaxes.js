import { stateTaxFormulas } from "./stateTaxFormulas";

  const stateTaxes = (state, grossIncome, filingStatus, is_nyc_resident) => {
    const stateFunc = state.toLowerCase() + 'StateTaxes';
    const stateFuncCall = stateTaxFormulas[stateFunc];
    return stateFuncCall(grossIncome, filingStatus, is_nyc_resident);
  };

export {stateTaxes};