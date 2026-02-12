import "./Preloader.css";

function Preloader({text}){
    return(
        <div className="circle-preloader">
            <p className="circle-preloader__text">{text}</p>
        </div>
    );
};

export default Preloader;