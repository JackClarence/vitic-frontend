const bracket = (taxable, bottom, top, percent, initial) => {
  if(taxable > top){
    return (initial +((top-bottom)*percent));
  } else if(taxable > bottom && taxable <= top){
    return (initial +((taxable - bottom)*percent))
  } else if(taxable <= bottom){
    return 0;
  } else{
    console.error;
  };
};

export const stateTaxFormulas = {
  maStateTaxes: function (grossIncome, filingStatus) {
    let taxable;
    if(filingStatus === "Single"){
      taxable = grossIncome - 4400;
    } else if(filingStatus === "Married"){
      taxable = grossIncome - 8800;
    } else{
      console.error;
    };

    if (taxable <= 1083150) {
      return taxable * 0.05;
    } else {
      return (1083150 * 0.05 + (taxable - 1083150) * 0.09).toFixed(2);
    }
  },

  moStateTaxes: function (grossIncome, filingStatus){
    let taxable;
    let taxAmount = 0;
    if(filingStatus === "Single"){
      taxable = grossIncome - 15000;
    } else if(filingStatus === "Married"){
      taxable = grossIncome - 31500
    } else{
      console.error;
    };

    const firstBracket = (taxable) => bracket(taxable, 1313, 2626, 0.02, 0);
    const secondBracket = (taxable) => bracket(taxable, 2626, 3939, 0.025, 26.26);
    const thirdBracket = (taxable) => bracket(taxable, 3939, 5252, 0.03, 59.82);
    const fourthBracket = (taxable) => bracket(taxable, 5252, 6565, 0.035, 98);
    const fifthBracket = (taxable) => bracket(taxable, 6565, 7878, 0.04, 144);
    const sixthBracket = (taxable) => bracket(taxable, 7878, 9191, 0.045, 197);
    const seventhBracket = (taxable) => bracket(taxable, 9191, Infinity, 0.047, 256);

    taxAmount = (firstBracket(taxable)+secondBracket(taxable)+thirdBracket(taxable)+fourthBracket(taxable)+fifthBracket(taxable)+sixthBracket(taxable)+seventhBracket(taxable)).toFixed(2);
    return taxAmount;
  },

  vtStateTaxes: function (grossIncome, filingStatus){
    let taxable;
    let taxAmount = 0;
    if(filingStatus === "Single"){
      taxable = grossIncome - 3825;
    } else if(filingStatus === "Married"){
      taxable = grossIncome - 11475;
    } else{
      console.error;
    };

    const firstBracket = (taxable) => bracket(taxable, 3825, 53225, 0.0335, 0);
    const secondBracket = (taxable) => bracket(taxable, 53225, 123525, 0.066, 1654.90);
    const thirdBracket = (taxable) => bracket(taxable, 123525, 253525, 0.076, 2355.05);
    const fourthBracket = (taxable) => bracket(taxable, 253525, Infinity, 0.0875, 9880);

    taxAmount = (firstBracket(taxable)+secondBracket(taxable)+thirdBracket(taxable)+fourthBracket(taxable));
    return taxAmount;
  }
};