import "./About.css";

function About({ isLoggedIn, loggedName, loggedEmail, onLogOut }) {
  return (
    <div className="about">
      {isLoggedIn ? (
        <div className="about__profile">
          <h3 className="about__profile_name">{loggedName}</h3>
          <h3 className="about__profile_email">{loggedEmail}</h3>
          <button className="about__profile_logout" onClick={onLogOut}>Log Out</button>
        </div>
      ) : (
        <div className="about__profile about__profile_sub">
          <h2 className="about__profile_sub_text">VITIC</h2>
        </div>
      )}
      <div className="about__vitic">
        <h3 className="about__vitic_header">About</h3>
        <p className="about__vitic_text">
          VITIC is a calculator that takes the tax-relevant information of two indiduals, and returns their maximum combined total that they could together pay on rent monthly. This is based on either the industry standard of paying no more than 30% of their gross income, or in other circles, of paying no more than 25% of their net income, each option being available to choose from when calculating. Once calculated, in addition to seeing the total combined, the net monthly income and maximum rent contribution of each respective individual is also shown. If logged in, the data in the input fields and in the results are saved to the person's account in local storage. Upon logging out, this data will disappear, and upon logging in again, this data reappears. 
        </p>
      </div>
    </div>
  );
};

export default About;