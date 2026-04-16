import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import About from '../About/About';
import getTaxes from '../../utils/IncomeTaxCalculatorAPI';
import {stateTaxes} from "../../utils/stateTaxes/stateTaxes";

function App() {
  const [loggedEmail, setLoggedEmail] = useState("");
  const [loggedName, setLoggedName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentYear, setCurrentYear] = useState();
  const [monthly1, setMonthly1] = useState(0);
  const [monthly2, setMonthly2] = useState(0);
  const [netMax1, setNetMax1] = useState(0);
  const [netMax2, setNetMax2] = useState(0);
  const [maxRent, setMaxRent] = useState(0);
  const [retrievedCalcData, setRetrievedCalcData] = useState();
  const [grossOrNet1, setGrossOrNet1] = useState("");
  const [grossOrNet2, setGrossOrNet2] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [usePreloader, setUsePreloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [modalMessage, setModalMessage] = useState();

  const ficaTaxes = (grossIncome) => {
    return grossIncome * 0.0765;
  };

  const monthlyNet = (grossIncome, federalTaxes, state, filingStatus) => {
    return ((grossIncome - federalTaxes - ficaTaxes(grossIncome) - stateTaxes(state, grossIncome, filingStatus)) / 12).toFixed(2);
  };
  const netMaxRent= (monthly, percentValue) => {
    if(percentValue === 0.3){
      if(monthly === 0){
        return 0;
      };
      return (monthly * 0.3).toFixed(2);
    }else if(percentValue === 0.25){
      if(monthly === 0){
        return 0;
      }
      return (monthly * 0.25).toFixed(2)
    };
    return console.error();
  };

  const sortMonthly = async (values, percentValue, setGrossOrNet) => {

    if(isLoggedIn && (retrievedCalcData.date !== currentYear || (retrievedCalcData.firstPerson.income !== values.income && retrievedCalcData.secondPerson.income !== values.income) || (retrievedCalcData.firstPerson.filing_status !== values.filing_status && retrievedCalcData.secondPerson.filing_status !== values.filing_status) || retrievedCalcData.firstPerson.region !== values.region || (retrievedCalcData.firstPerson.percentage !== percentValue && retrievedCalcData.secondPerson.percentage !== percentValue))){
      if(percentValue === 0.3){
        setGrossOrNet("Gross");
        return ((values.income/12)).toFixed(2);
      } else if(percentValue === 0.25){
        let taxes;
        setGrossOrNet("Net");
        if(values.income === "" || values.income === 0 || values.income === "0"){
          taxes = 0;
        }else if(values.income > 0){
          taxes = await getTaxes(values)
            .then((res)=> {
              setErrorMessage();
              const sortedMonthly = monthlyNet(values.income, res.federal_taxes_owed, values.region, values.filing_status);
              return sortedMonthly;
            })
            .catch((err) => {
              console.log(err);
              setErrorMessage("Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.");
            });
        }else{
          console.error();
          setErrorMessage("Sorry, something went wrong with the data passed.");
        };
        return taxes;
      } else{
        setErrorMessage("Nothing Found");
        return console.error("Nothing Found");
      };
    } else{
      if(retrievedCalcData.firstPerson.income === values.income && retrievedCalcData.firstPerson.filing_status === values.filing_status && retrievedCalcData.firstPerson.percentage === values.percentage){
        const sortedMonthly = monthly1;
        return sortedMonthly;
      } else{
        const sortedMonthly = monthly2;
        return sortedMonthly;
      }
    }
  };

  const calculateMonthly = async (values, percentValue, setMonth, setNetMax, setGrossOrNet) => {
    const sortedMonthly = await sortMonthly(values, percentValue, setGrossOrNet);
    const netMax = netMaxRent(sortedMonthly, percentValue);
    const calculated = {sortedMonthly, netMax};
    applyStates(calculated, setMonth, setNetMax);
    return calculated;
  };

  const applyStates = (values, setMonth, setNetMax) => {
    setMonth(values.sortedMonthly);
    setNetMax(values.netMax);
  };

  const calcData = (values, values2, percentValues, percentValues2, monthly1, monthly2, rentTotal) => { return {
    firstPerson: {
      income: values.income, 
      filing_status: values.filing_status,
      region: values.region, 
      percentage: percentValues.percentage,
      monthly: monthly1.sortedMonthly,
      netMax: monthly1.netMax,
    }, 
    secondPerson: {
      income: values2.income, 
      filing_status: values2.filing_status,
      region: values2.region, 
      percentage: percentValues2.percentage,
      monthly: monthly2.sortedMonthly,
      netMax: monthly2.netMax
    },
    maxRent: rentTotal,
    date: new Date().getFullYear()
  }};

  const handleCalculate = async (values, values2, percentValues, percentValues2) => {
    setUsePreloader(true);
    const monthly1 = await calculateMonthly(values, percentValues.percentage, setMonthly1, setNetMax1, setGrossOrNet1);
    const monthly2 = await calculateMonthly(values2, percentValues2.percentage, setMonthly2, setNetMax2, setGrossOrNet2);
    const rentTotal = (+monthly1.netMax + +monthly2.netMax).toFixed(2);
    setMaxRent(rentTotal);
    if(isLoggedIn){
      localStorage.setItem(`user-${loggedEmail}-data`, JSON.stringify(calcData(values, values2, percentValues, percentValues2, monthly1, monthly2, rentTotal)));
      setRetrievedCalcData(calcData(values, values2, percentValues, percentValues2, monthly1, monthly2, rentTotal));
    }
    
    setUsePreloader(false);
  };

  const closeModal = () => {
    setModalMessage();
    setActiveModal("");
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up-modal");
  };

  const handleLoginClick = () => {
    setActiveModal("login-modal");
  };

  const retrieveLoginInfo = (email) => {
    return JSON.parse(localStorage.getItem(`user-${email}`))
  };

  const persistEmail = (email) => {
    localStorage.setItem("persistedEmail", email);
  };

  const onSignUpUser = (user) => {
    const emptyUser = user.email === "" || user.name === "" || user.password === "";
    if(user && !emptyUser && user !== null){
      localStorage.setItem(`user-${user.email}`, JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name
      }));
      const retrieved = retrieveLoginInfo(user.email);
      onLoginUser(retrieved);
      closeModal();
    }else{
      setModalMessage("Invalid Data");
    };
  };

  const onLoginUser = (user) => {
    const retrieved = retrieveLoginInfo(user.email);
    if(retrieved && retrieved !== null){
      persistEmail(user.email);
      setIsLoggedIn(true);
      setLoggedEmail(retrieved.email);
      setLoggedName(retrieved.name);
      if(retrieved !== null){
        setRetrievedCalcData(JSON.parse(localStorage.getItem(`user-${retrieved.email}-data`)));
      };
      closeModal();
    }else{
      setModalMessage("Invalid Data");
    };
  };

  const onLogOut = () => {
    localStorage.removeItem("persistedEmail");
    setIsLoggedIn(false);
    setLoggedEmail("");
    setLoggedName("");
    setRetrievedCalcData();
    setMonthly1(0);
    setMonthly2(0);
    setNetMax1(0);
    setNetMax2(0);
    setMaxRent(0);
    setGrossOrNet1("");
    setGrossOrNet2("");
  };
  
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage();
    }, 10000);
  }, [errorMessage]);

  useEffect(() => {
    const persistedEmail = localStorage.getItem("persistedEmail");
    if(persistedEmail !== null){
      setCurrentYear(new Date().getFullYear());
      const retrievedLoginInfo = retrieveLoginInfo(persistedEmail);
      onLoginUser(retrievedLoginInfo);
      setRetrievedCalcData(JSON.parse(localStorage.getItem(`user-${persistedEmail}-data`)));
    };
  }, []);

  useEffect(() => {
    if(typeof(retrievedCalcData) === "object" && retrievedCalcData !== null){
      setMonthly1(retrievedCalcData.firstPerson.monthly);
      setMonthly2(retrievedCalcData.secondPerson.monthly);
      if(retrievedCalcData.firstPerson.percentage === 0.25){
        setGrossOrNet1("Net");
      }else if(retrievedCalcData.firstPerson.percentage === 0.3){
        setGrossOrNet1("Gross");
      }
      if(retrievedCalcData.secondPerson.percentage === 0.25){
        setGrossOrNet2("Net");
      }else if(retrievedCalcData.secondPerson.percentage === 0.3){
        setGrossOrNet2("Gross");
      };
    };
  }, [retrievedCalcData]);

  return (
    <div className="app">
      <div className="app__content">
        <Header isLoggedIn={isLoggedIn} handleLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick} loggedName={loggedName}/>
        <Routes>
          <Route path="/" element={
            <Main 
              monthly1={monthly1} 
              netMax1={netMax1} 
              monthly2={monthly2} 
              netMax2={netMax2} 
              maxRent={maxRent} 
              grossOrNet1={grossOrNet1} 
              grossOrNet2={grossOrNet2} 
              onCalculate={handleCalculate}
              retrievedCalcData={retrievedCalcData}
              usePreloader={usePreloader}
              errorMessage={errorMessage}
            />}
          />
          <Route path="/about" element={
            <About
              isLoggedIn={isLoggedIn}
              loggedName={loggedName}
              loggedEmail={loggedEmail}
              onLogOut={onLogOut}
            />}
          />
        </Routes>
        <Footer />
        <LoginModal onLoginUser={onLoginUser} onCloseModal={closeModal} isOpen={activeModal === "login-modal"} modalMessage={modalMessage}/>
        <SignUpModal onSignUpUser={onSignUpUser} onCloseModal={closeModal} isOpen={activeModal === "sign-up-modal"} modalMessage={modalMessage}/>
      </div>
    </div>
  )
};

export default App;
