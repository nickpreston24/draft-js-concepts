import React, { useState } from 'react'
import Head from 'next/head'
import { Elite } from '../components/editors/RichEditor'
import { Hashtags } from '../components/editors/big-byte/HashtagEditor'
import createContainer from '../components/createContainer'

let c = createContainer();
// let SuperElite = c.SuperElite;

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="hero">
      <h1 className="title">Welcome to Draft-js!</h1>
      {/* <Elite /> */}
      {/* <ContentState/> */}
      <Hashtags />
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
)

export default Home


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
