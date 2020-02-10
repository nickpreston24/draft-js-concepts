import React from "react";
import { Elite } from "../components/editors/RichEditor";
import pallete from "../pallete.json";
import { Title } from "../components/Title";

//TODO: Move to theme.js
const styles = {
  head: {
    color: pallete.primary.white,
    "&:hover": {
      color: pallete.hoverColor
    },
    backgroundColor: pallete.primary.blue
  },
  panel: {
    backgroundColor: pallete.primary.grey
  },
  container: {
    height: "100%",
    width: "960px"
  }
};

const Home = () => {
  const { panel, container } = styles;
  return (
    <div style={container}>
      <div style={panel}>
        <Title>Welcome!</Title>
        <Elite />
      </div>
    </div>
  );
};

export default Home;
