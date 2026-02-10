import "./Main.css";
import Calculator from "../Calculator/Calculator";
import Table from "../Table/Table";
import Preloader from "../Preloader/Preloader";

function Main({monthly1, netMax1, monthly2, netMax2, maxRent, grossOrNet1, grossOrNet2, onCalculate, retrievedCalcData, usePreloader}) {
    const ifPreloader = () => {
        if(usePreloader){
            return (<Preloader/>)
        }
    };
    return(
        <div className="main">
            <Calculator 
                onCalculate={onCalculate} 
                retrievedCalcData={retrievedCalcData}
            />
            <Table 
                monthly1={monthly1} 
                netMax1={netMax1} 
                monthly2={monthly2} 
                netMax2={netMax2} 
                maxRent={maxRent} 
                grossOrNet1={grossOrNet1} 
                grossOrNet2={grossOrNet2}
                retrievedCalcData={retrievedCalcData}
            />
            {ifPreloader()}
        </div>
    )
};

export default Main;