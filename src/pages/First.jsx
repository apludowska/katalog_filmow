import React from "react";
import { Link } from "react-router-dom";
import "../css/First.css"

function First() {


  return (
    <div className="all">
      <h1>Filumos</h1>
      <p>Welcome to our movie catalog, where the latest releases are just a few clicks away. Explore the world of cinema, browse the newest premieres, and stay updated with the latest in the film industry.</p>
        <div>
        <Link className="buttonColor" to="/HomePage">
          <button>See more</button>
        </Link>
        
        
        </div>
    </div>
  );
}
export default First;
