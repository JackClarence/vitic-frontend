import { useState, useEffect } from "react";
import "./Table.css";

function Table({monthly1, netMax1, monthly2, netMax2, maxRent, grossOrNet1, grossOrNet2, retrievedCalcData}) {
  const defValues = {monthly: monthly1, netMax: netMax1};
  const defValues2 = {monthly: monthly2, netMax: netMax2};
  const defTotal = {maxRent: maxRent};
  const [firstPerson, setFirstPerson] = useState(defValues);
  const [secondPerson, setSecondPerson] = useState(defValues2);
  const [rentTotal, setRentTotal] = useState(defTotal);
  useEffect(() => {
      const retrievedTruthy = (retrievedCalcData !== null && retrievedCalcData !== undefined);
      if(retrievedTruthy){
        setFirstPerson(retrievedCalcData.firstPerson);
        setSecondPerson(retrievedCalcData.secondPerson);
        setRentTotal({maxRent: retrievedCalcData.maxRent});
      };
    }, [retrievedCalcData]);
  return (
    <div className="table">
      <div className="table__group">
        <div className="table__text">
          <p className="table__subtitle">Monthly {grossOrNet1} Income</p>
          <p className="table__amount">${monthly1 ? (monthly1) : (firstPerson.monthly)}</p>
        </div>
        <div className="table__text">
          <p className="table__subtitle">Monthly {grossOrNet2} Income</p>
          <p className="table__amount">${monthly2 ? (monthly2) : (secondPerson.monthly)}</p>
        </div>
      </div>
      <div className="table__group">
        <div className="table__text">
          <p className="table__subtitle">Max Rent Contribution</p>
          <p className="table__amount">${netMax1 ? (netMax1) : (firstPerson.netMax)}</p>
        </div>
        <div className="table__text">
          <p className="table__subtitle">Max Rent Contribution</p>
          <p className="table__amount">${netMax2 ? (netMax2) : (secondPerson.netMax)}</p>
        </div>
      </div>
      <div className="table__group table__total">
        <p className="table__subtitle">Total Rent Contribution</p>
        <p className="table__amount">${maxRent ? (maxRent) : (rentTotal.maxRent)}</p>
      </div>
    </div>
  );
}

export default Table;
