import "./Calculator.css";
import "../../utils/useInput";
import { useEffect } from "react";
import { useInput } from "../../utils/useInput";

function Calculator({onCalculate, retrievedCalcData}) {
  const defValues1 = { country: "US", region: "MA", income: "", filing_status: "Single" };
  const defValues2 = { country: "US", region: "MA", income: "", filing_status: "Single" };
  const defPercent1 = { percentage: 0.25 };
  const defPercent2 = { percentage: 0.25 };
  
  const { values, setValues, handleChange } = useInput(defValues1);
  const { values: values2, setValues: setValues2, handleChange: handleChange2 } = useInput(defValues2);
  const { values: percentValues, setValues: setPercent, handleChange: handlePercentChange } = useInput(defPercent1);
  const { values: percentValues2, setValues: setPercent2, handleChange: handlePercentChange2 } = useInput(defPercent2);
  
  const handleStateChange = (evt) => {
    handleChange(evt);
    handleChange2(evt);
  };

  const calcSubmit = (evt) => {
    evt.preventDefault();
    onCalculate(values, values2, percentValues, percentValues2);
  };

  useEffect(() => {
    const retrievedTruthy = (retrievedCalcData !== null && retrievedCalcData !== undefined);
    if(retrievedTruthy){
      setValues(retrievedCalcData.firstPerson);
      setValues2(retrievedCalcData.secondPerson);
      const retrievedPercent1 = { percentage: retrievedCalcData.firstPerson.percentage};
      setPercent(retrievedPercent1);
      const retrievedPercent2 = { percentage: retrievedCalcData.secondPerson.percentage};
      setPercent2(retrievedPercent2);
    };
  }, [retrievedCalcData]);

  return (
    <div className="calculator">
      <form onSubmit={calcSubmit} className="calculator__form">
        <p className="calculator__title">Calculate Maximum Rent</p>
        <div className="calculator__group">
          <label htmlFor="salary-first" className="calculator__label">
            Gross Annual Salary
            <input
              type="number"
              name="income"
              id="salary-first"
              placeholder="Salary"
              className="calculator__input"
              onChange={handleChange}
              value={ values.income }
            />
          </label>
          <label htmlFor="salary-second" className="calculator__label">
            Gross Annual Salary
            <input
              type="number"
              name="income"
              id="salary-second"
              placeholder="Salary"
              className="calculator__input"
              onChange={handleChange2}
              value={values2.income}
            />
          </label>
        </div>
        <div className="calculator__group">
          <label htmlFor="marital-first" className="calculator__label">
            Filing Status
            <select
              className="calculator__dropdown calculator__dropdown_alt"
              id="marital-first"
              name="filing_status"
              onChange={handleChange}
              value={values.filing_status}
            >
              <option value="Single" name="single">
                Single
              </option>
              <option value="Married" name="married-joint">
                Married Joint
              </option>
            </select>
          </label>
          <label htmlFor="marital-second" className="calculator__label">
            Filing Status
            <select
              className="calculator__dropdown calculator__dropdown_alt"
              id="marital-second"
              name="filing_status"
              onChange={handleChange2}
              value={values2.filing_status}
            >
              <option value="Single" name="single">
                Single
              </option>
              <option value="Married" name="married-joint">
                Married Joint
              </option>
            </select>
          </label>
        </div>
        <div className="calculator__group">
          <label
            htmlFor="state"
            className="calculator__label calculator__label_state"
          >
            State
            <select className="calculator__dropdown" id="state" name="region" onChange={handleStateChange} value={values.region}>
              <option value="MA" name="MA">
                MA
              </option>
              <option value="MO" name="MO">
                MO
              </option>
            </select>
          </label>
        </div>
        <div className="calculator__group">
          <label htmlFor="percentage-first" className="calculator__label">
            Percentage of Income
            <select
              className="calculator__dropdown calculator__dropdown_alt"
              id="percentage-first"
              name="percentage"
              onChange={handlePercentChange}
              value={percentValues.percentage}
            >
              <option value={0.25} name="25-net">
                25% Net
              </option>
              <option value={0.3} name="30-gross">
                30% Gross
              </option>
            </select>
          </label>
          <label htmlFor="percentage-second" className="calculator__label">
            Percentage of Income
            <select
              className="calculator__dropdown calculator__dropdown_alt"
              id="percentage-second"
              name="percentage"
              onChange={handlePercentChange2}
              value={percentValues2.percentage}
            >
              <option value={0.25} name="25-net">
                25% Net
              </option>
              <option value={0.3} name="30-gross">
                30% Gross
              </option>
            </select>
          </label>
        </div>
        <button className="calculator__submit_btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Calculator;
