import React from 'react';

const Footer:React.FC = () => (
  <footer className="footer">
    <div className="footer__container">
      <ul className="footer__container-link">
        <li>
          <a href="https://github.com/anival-github">
            {/* <img src={gitLogo} width="40" alt="gitlogo" /> */}
            anival-github
          </a>
        </li>
        <li>
          <a href="https://github.com/dzianisshupenka">
            {/* <img src={gitLogo} width="40" alt="gitlogo" /> */}
            dzianisshupenka
          </a>
        </li>
        <li>
          <a href="https://github.com/thrvrce">
            {/* <img src={gitLogo} width="40" alt="gitlogo" /> */}
            thrvrce
          </a>
        </li>
        <li>
          <a href="https://github.com/DittmerOk">
            {/* <img src={gitLogo} width="40" alt="gitlogo" /> */}
            DittmerOk
          </a>
        </li>
      </ul>
      <div>2021</div>
      <a href="https://rs.school/js/"><img src="https://rs.school/images/rs_school_js.svg" width="80" height="80" alt="Logokurs" /></a>
    </div>
  </footer>
);

export default Footer;
