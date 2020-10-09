import React from "react";

import Wrapper from "./Wrapper";

function LeftMenuFooter() {
  const projectType = PROJECT_TYPE;

  return (
    <Wrapper>
      <div className="poweredBy">
        <a
          key="website"
          href="https://strapi.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Won Games
        </a>
        &nbsp;
      </div>
    </Wrapper>
  );
}

export default LeftMenuFooter;
