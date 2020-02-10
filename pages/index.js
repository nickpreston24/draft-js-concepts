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

// const myStore = {
//   soups: [
//     "Tomato",
//     "Mushroom",
//     "Cream of Broccoli"
//   ],
//   clothes: undefined,
//   name: "The Soup Store"
// }

// const buttons = {
//   alert1: () => <button onClick={() => alert("No touchy!")}>!</button>,
//   alert2: () => <button onClick={() => alert("Let's be friends!")}>:D</button>,
// }

// const counterMap = {
//   increment: () => setCount(count + 5),
//   decrement: () => setCount(count - 2)
// }

// const Counter = ({ increment, decrement }) => {

//   const [count, setCount] = useState(0);

//   const increment = () => setCount(count + 1)
//   const decrement = () => setCount(count - 1)

//   console.log(increment, decrement);

//   return (
//     <div>
//       <div>{count}</div>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//     </div>
//   )
// }
