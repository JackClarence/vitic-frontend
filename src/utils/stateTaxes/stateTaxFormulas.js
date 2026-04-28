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
    let taxable;
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
      taxable = grossIncome - 15750;
    } else if(filingStatus === "Married"){
      taxable = grossIncome - 31500;
    } else{
      console.error;
    };

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
    };

    taxAmount = (firstBracket(taxable)+secondBracket(taxable)+thirdBracket(taxable)+fourthBracket(taxable)+fifthBracket(taxable)+sixthBracket(taxable)+seventhBracket(taxable)+eighthBracket(taxable)+ninthBracket(taxable)).toFixed(2);
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

  nyStateTaxes: function (grossIncome, filingStatus, is_nyc_resident){
    let taxable;
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

    let firstNycBracket = () => {
      return 0;
    };
    let secondNycBracket = () => {
      return 0;
    };
    let thirdNycBracket = () => {
      return 0;
    };
    let fourthNycBracket = () => {
      return 0;
    };

    if(filingStatus === "Single"){
      taxable = grossIncome - 8000;
    } else if(filingStatus === "Married"){
      taxable = grossIncome - 16050;
    } else{
      console.error;
    };

    if(is_nyc_resident){

      if(filingStatus === "Single"){
        firstNycBracket = (taxable) => bracket(taxable, 0, 12000, 0.03078);
        secondNycBracket  = (taxable) => bracket(taxable, 12000, 25000, 0.03762);
        thirdNycBracket = (taxable) => bracket(taxable, 25000, 50000, 0.03819);
        fourthNycBracket = (taxable) => bracket(taxable, 50000, Infinity, 0.03876);
      } else if(filingStatus === "Married"){
        firstNycBracket = (taxable) => bracket(taxable, 0, 21600, 0.03078);
        secondNycBracket  = (taxable) => bracket(taxable, 21600, 45000, 0.03762);
        thirdNycBracket = (taxable) => bracket(taxable, 45000, 90000, 0.03819);
        fourthNycBracket = (taxable) => bracket(taxable, 90000, Infinity, 0.03876);
      } else{
        console.error;
      };
    };

    if(filingStatus === "Single"){
      firstBracket = (taxable) => bracket(taxable, 0, 8500, 0.04);
      secondBracket = (taxable) => bracket(taxable, 8500, 11700, 0.045);
      thirdBracket = (taxable) => bracket(taxable, 11700, 13900, 0.0525);
      fourthBracket = (taxable) => bracket(taxable, 13900, 80650, 0.055);
      fifthBracket = (taxable) => bracket(taxable, 80650, 215400, 0.06);
      sixthBracket = (taxable) => bracket(taxable, 215400, 1077550, 0.0685);
      seventhBracket = (taxable) => bracket(taxable, 1077550, 5000000, 0.0965);
      eighthBracket = (taxable) => bracket(taxable, 5000000, 25000000, 0.103);
      ninthBracket = (taxable) => bracket(taxable, 25000000, Infinity, 0.109);
    } else if(filingStatus === "Married"){
      firstBracket = (taxable) => bracket(taxable, 0, 17150, 0.04);
      secondBracket = (taxable) => bracket(taxable, 17150, 23600, 0.045);
      thirdBracket = (taxable) => bracket(taxable, 23600, 27900, 0.0525);
      fourthBracket = (taxable) => bracket(taxable, 27900, 161550, 0.055);
      fifthBracket = (taxable) => bracket(taxable, 161500, 323200, 0.06);
      sixthBracket = (taxable) => bracket(taxable, 323200, 2155350, 0.0685);
      seventhBracket = (taxable) => bracket(taxable, 2155350, 5000000, 0.0965);
      eighthBracket = (taxable) => bracket(taxable, 5000000, 25000000, 0.103);
      ninthBracket = (taxable) => bracket(taxable, 25000000, Infinity, 0.109);
    } else{
      console.error;
    };

    taxAmount = (firstBracket(taxable)+firstNycBracket(taxable)+secondBracket(taxable)+secondNycBracket(taxable)+thirdBracket(taxable)+thirdNycBracket(taxable)+fourthBracket(taxable)+fourthNycBracket(taxable)+fifthBracket(taxable)+sixthBracket(taxable)+seventhBracket(taxable)+eighthBracket(taxable)+ninthBracket(taxable)).toFixed(2);
    return taxAmount;
  },

  okStateTaxes: function (grossIncome, filingStatus){
    let taxable;
    let taxAmount = 0;
    let firstBracket;
    let secondBracket;
    let thirdBracket;
    let fourthBracket;
    let fifthBracket;
    let sixthBracket;

    if(filingStatus === "Single"){
      taxable = grossIncome - 6350;
    } else if(filingStatus === "Married"){
      taxable = grossIncome - 12700
    } else{
      console.error;
    };

    if(filingStatus === "Single"){
      firstBracket = (taxable) => bracket(taxable, 0, 1000, 0.0025);
      secondBracket = (taxable) => bracket(taxable, 1000, 2500, 0.0075);
      thirdBracket = (taxable) => bracket(taxable, 2500, 3750, 0.0175);
      fourthBracket = (taxable) => bracket(taxable, 3750, 4900, 0.0275);
      fifthBracket = (taxable) => bracket(taxable, 4900, 7200, 0.0375);
      sixthBracket = (taxable) => bracket(taxable, 7200, Infinity, 0.0475);
    } else if(filingStatus === "Married"){
      firstBracket = (taxable) => bracket(taxable, 0, 2000, 0.0025);
      secondBracket = (taxable) => bracket(taxable, 2000, 5000, 0.0075);
      thirdBracket = (taxable) => bracket(taxable, 5000, 7500, 0.0175);
      fourthBracket = (taxable) => bracket(taxable, 7500, 9800, 0.0275);
      fifthBracket = (taxable) => bracket(taxable, 9800, 14400, 0.0375);
      sixthBracket = (taxable) => bracket(taxable, 14400, Infinity, 0.0475);
    } else{
      console.error;
    };

    taxAmount = (firstBracket(taxable)+secondBracket(taxable)+thirdBracket(taxable)+fourthBracket(taxable)+fifthBracket(taxable)+sixthBracket(taxable));
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