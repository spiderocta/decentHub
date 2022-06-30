// for next.js's <head> tag and rendering images
import Head from 'next/head'
import Image from 'next/image'

// import the web3 library with setup from lib/web3.js
import { web3 } from '../lib/web3';

// import react hooks
import { useState, useEffect } from 'react';

// all from our components folder
import Account from '../components/Account'
import EthName from '../components/EthName'
import Answer from '../components/Answer'
import AnswerForm from '../components/AnswerForm'

export default function Home() {
  

  const [accounts, setAccounts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [answers, setAnswers] = useState([])

  const connect = async function () {
    let a = await window.ethereum.request({ method: "eth_requestAccounts" })
    setAccounts(a)
  }

  useEffect(function () {
    if (accounts.length > 0) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [accounts])

  useEffect(async function () {
    let a = await window.ethereum.request({ method: "eth_accounts" })
    setAccounts(a)

    window.ethereum.on("accountsChanged", function (a) {
      setAccounts(a)
    })


    fetch("/api/answers")
      .then(response => response.json())
      .then(data => { 
        setAnswers(data.answers) 
        setIsLoading(false)
      })
  }, [])


  let answersArea = (
    <div className="loading">Loading the answers...</div>
  )

  if (!isLoading) {
    answersArea = answers.map(function (answer, index) {
      return <Answer number={index + 1} answer={answer} accounts={accounts} isLoggedIn={isLoggedIn} />
    })
  }



  return (
    <main>
      <header>
        <h1>DEQEX - FORUM</h1>

        {/* <form>
          <input type="text" placeholder="Search" />
        </form> */}
        <div></div>

        <Account accounts={accounts} isLoggedIn={isLoggedIn} connect={connect} />
      </header>

      <section className="question">
        <div className="main">
          <h3>DEQEX Feedback Forum</h3>
          <h2>Looking for feedback as a beginner Vendor </h2>
          <p>Hey everyone, I&apos;m a new Vendor on DEQUES, just 4 weeks into my journey, and I&apos;m looking to get some feedback on what I&apos;ve made so far.i really appreciatee opinions about my work I&apos;m particularly interested in turning my entire service to an NFT and sell it and I&apos;d love to know  the best tools to use would be! </p>

          <div className="slides">
            <Image src="/image-1.jpg" width="600" height="800" />
            <Image src="/image-2.jpg" width="600" height="800" />
            <Image src="/image-3.jpg" width="600" height="800" />
            <Image src="/image-4.jpg" width="600" height="800" />
          </div>
        </div>
        <div className="meta">
          
          {/* EthName */}
          <div className="eth-name">
            <img src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?t=st=1656571044~exp=1656571644~hmac=c3d397836e5c0f5a51b91f17a8030dc9af8bc40b27db3868a6f04f576cbeb64e&w=740" alt="Avatar of riklomas.eth" />
            <div className="name">
              <span className="primary">Muhammad.eth</span>
              <span className="secondary">0xb25bf3...aaf4</span>
            </div>
          </div>
          {/* end EthName */}

        </div>
      </section>

      <section className="answers">
        {answersArea}

        <AnswerForm accounts={accounts} setAnswers={setAnswers} isLoggedIn={isLoggedIn} />
      </section>

      <Head>
        <title>Looking for feedback as a beginner – Feedback forum – Potstop </title>
        <meta property="og:title" content="Looking for feedback as a beginner on Potstop" />
        <meta property="og:description" content="decentralized feedback hub for dequex platform" />
        <meta property="og:image" content="/social.png" />
      </Head>
    </main>
  )
}
