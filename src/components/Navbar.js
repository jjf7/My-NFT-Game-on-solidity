import React from "react";
import Identicon from 'react-identicons';

export default function Navbar({account}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid container">
        <a target="_blank" className="navbar-brand" href="https://tupaginaonline.net">
          Colecciona tokens no fungibles <b>NFTs</b>
        </a>
     
      
          <ul className="navbar-nav">
            <li className="nav-item ">
              <a className="nav-link" href="#">
                Mi cuenta: {account} &nbsp;
                <Identicon size="20" string={account} />
              </a>
            </li>
            
          </ul>
        
      </div>
    </nav>
  );
}
