import React from "react";

const About = (props) => {
  const name = "ranjit";

  React.useEffect(() => {
    props.rName(name);
  }, []);
  return (
    <div>
      <h5>About Page</h5>
    </div>
  );
};

export default About;
