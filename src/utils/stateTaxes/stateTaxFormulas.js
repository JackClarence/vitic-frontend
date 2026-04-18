const bracket = (taxable, bottom, top, percent) => {
  if(taxable > top){
    return ((top-bottom)*percent);
  } else if(taxable > bottom && taxable <= top){
    return ((taxable - bottom)*percent)
  } else if(taxable <= bottom){
    return 0;
  } else{
    console.error;
  };
};

export const stateTaxFormulas = {
  caStateTaxes: function (grossIncome, filingStatus) {
    let taxAmount = 0;
    let firstBracket;
    let secondBracket;
    let thirdBracket;
    let fourthBracket;
    let fifthBracket;
    let sixthBracket;
    let seventhBracket;
    let eighthBracket;
    let ninthBracket;

    if(filingStatus === "Single"){
      firstBracket = (taxable) => bracket(taxable, 0, 11079, 0.01);
      secondBracket = (taxable) => bracket(taxable, 11079, 26264, 0.02);
      thirdBracket = (taxable) => bracket(taxable, 26264, 41452, 0.04);
      fourthBracket = (taxable) => bracket(taxable, 41452, 57542, 0.06);
      fifthBracket = (taxable) => bracket(taxable, 57542, 72724, 0.08);
      sixthBracket = (taxable) => bracket(taxable, 72724, 371479, 0.093);
      seventhBracket = (taxable) => bracket(taxable, 371479, 445771, 0.103);
      eighthBracket = (taxable) => bracket(taxable, 445771, 742953, 0.113);
      ninthBracket = (taxable) => bracket(taxable, 742953, Infinity, 0.123);
    } else if(filingStatus === "Married"){
      firstBracket = (taxable) => bracket(taxable, 0, 22158, 0.01);
      secondBracket = (taxable) => bracket(taxable, 22158, 52528, 0.02);
      thirdBracket = (taxable) => bracket(taxable, 52528, 82904, 0.04);
      fourthBracket = (taxable) => bracket(taxable, 82904, 115084, 0.06);
      fifthBracket = (taxable) => bracket(taxable, 115084, 145448, 0.08);
      sixthBracket = (taxable) => bracket(taxable, 145448, 742958, 0.093);
      seventhBracket = (taxable) => bracket(taxable, 742958, 891542, 0.103);
      eighthBracket = (taxable) => bracket(taxable, 891542, 1485906, 0.113);
      ninthBracket = (taxable) => bracket(taxable, 1485906, Infinity, 0.123);
    } else{
      console.error;
    }

    taxAmount = (firstBracket(grossIncome)+secondBracket(grossIncome)+thirdBracket(grossIncome)+fourthBracket(grossIncome)+fifthBracket(grossIncome)+sixthBracket(grossIncome)+seventhBracket(grossIncome)+eighthBracket(grossIncome)+ninthBracket(grossIncome)).toFixed(2);
    return taxAmount;
  },

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

    const firstBracket = (taxable) => bracket(taxable, 1313, 2626, 0.02);
    const secondBracket = (taxable) => bracket(taxable, 2626, 3939, 0.025);
    const thirdBracket = (taxable) => bracket(taxable, 3939, 5252, 0.03);
    const fourthBracket = (taxable) => bracket(taxable, 5252, 6565, 0.035);
    const fifthBracket = (taxable) => bracket(taxable, 6565, 7878, 0.04);
    const sixthBracket = (taxable) => bracket(taxable, 7878, 9191, 0.045);
    const seventhBracket = (taxable) => bracket(taxable, 9191, Infinity, 0.047);

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

    const firstBracket = (taxable) => bracket(taxable, 3825, 53225, 0.0335);
    const secondBracket = (taxable) => bracket(taxable, 53225, 123525, 0.066);
    const thirdBracket = (taxable) => bracket(taxable, 123525, 253525, 0.076);
    const fourthBracket = (taxable) => bracket(taxable, 253525, Infinity, 0.0875);

    taxAmount = (firstBracket(taxable)+secondBracket(taxable)+thirdBracket(taxable)+fourthBracket(taxable));
    return taxAmount;
  }
};