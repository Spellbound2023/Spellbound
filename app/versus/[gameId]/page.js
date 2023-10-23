"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/versus.module.css";
import Image from "next/image";
import OpponentBox from "./opponentCard";
import PlayerBox from "./playerCard";
import StatusBox from "./statusBar";
import NavBar from "@/components/NavBar";
import GameEndDisplay from "./gameEnd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import { redirect } from "next/navigation";
import SuccessPopup from "../../classic/successPopup";
import GameStart from "./gameStart";

let versusSocket;

const versusPage = ({ params }) => {
  const [gameEnded, setGameEnded] = useState(false);
  const [isWin, setIsWin] = useState(null); // Set to true if you win, false if you lose
  const [score, setScore] = useState(0); // Replace with the actual score
  const [opponentScore, setOpponentScore] = useState(0); // Replace with the actual score
  const [opponentUsername, setOpponentUsername] = useState("");
  const [potions, setPotions] = useState([]);
  const [opponentPotions, setOpponentPotions] = useState([]);
  const [word, setWord] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const { data: session, status } = useSession();
  const { push } = useRouter();

  //Completion score, change if you want
  const completionThreshold = 30;


  //Potions
  const [freezeEffect, setFreezeEffect] = useState("1px solid black");

  

  useEffect(() => {
    console.log(session);
    if (status === "authenticated") {
      console.log("Router query: ", params.gameId);

      // Create a socket connection
      console.log("Connecting web socket");
      versusSocket = io.connect("/versus", {
        forceNew: true,
        query: { username: session.user.username, gameId: params.gameId },
      });

      // 'Get the opponent's username
      versusSocket.on("opponentUsername", (opponentUsername) => {
        console.log("The opponents username is: ", opponentUsername);
        setOpponentUsername(opponentUsername);
      });

      // Listen for incoming messages
      versusSocket.on("opponentReady", () => {
        console.log("The opponent is ready!");
      });

      // Listen for incoming messages
      versusSocket.on("gameStarted", (timerStartTimestamp) => {
        console.log("The game has started at: ", timerStartTimestamp);

        versusSocket.emit("typing");
        versusSocket.emit("correctAttempt", 1);
        versusSocket.emit("correctAttempt", 2);
        versusSocket.emit("correctAttempt", 3);
        versusSocket.emit("incorrectAttempt");
        versusSocket.emit("skipWord");
      });

      // Listen for incoming messages
      versusSocket.on("nextWord", (nextWord) => {
        console.log("nextWord: ", nextWord);
      });

      versusSocket.on("opponentTyping", () => {
        console.log("The opponent is typing!");
      });

      versusSocket.on("redirect", (url) => {
        console.log("Redirecting to :", url);
        push(url, undefined, { shallow: false });
      });

      versusSocket.on("userWon", () => {
        console.log("You have won the game!");
      });

      versusSocket.on("opponentWon", () => {
        console.log("Your opponent ", opponentUsername, " has won the game!");
      });

      versusSocket.on("potionsChange", (potions) => {
        console.log("Your potions: ", potions);
        setPotions(potions);
      });

      versusSocket.on("opponentPointsChange", (points) => {
        // console.log("Your opponent has ", points, " points");
      });

      versusSocket.on("opponentPotionsChange", (potions) => {
        console.log("Your opponent has the following potions: ", potions);
        setOpponentPotions(potions);
      });

      versusSocket.on("potionUseStart", (potion) => {
        console.log("The potion ", potion, " is now in effect");
      });

      versusSocket.on("opponentPotionUseStart", (potion) => {
        console.log("Your opponents potion ", potion, " is now in effect");
      });

      versusSocket.on("potionUseEnd", (potion) => {
        console.log("The potion ", potion, " has worn off");
      });

      versusSocket.on("opponentPotionUseEnd", (potion) => {
        console.log("Your opponents potion ", potion, " has worn off");
      });

      versusSocket.on("opponentQuit", () => {
        console.log("Your opponent has quit");
      });

      versusSocket.on("opponentDisconnected", () => {
        console.log("Your opponent has disconnected");
      });

      versusSocket.on("timerEnded", () => {
        console.log("The game timer has ended");
      });

      versusSocket.on("gameEnded", () => {
        if (score >= 5){
          console.log("The game has ended");
          setGameEnded(true)
        }        
      });    

      // console.log("The game has ended");
      versusSocket.emit("userReady");

      setTimeout(() => {
        if (session.user.username === "bla1") versusSocket.emit("userQuits");
      }, 2000);
    }
  }, [status]);

  useEffect(() => {
    if (versusSocket) {
      versusSocket.emit("potionUse", potions[0]);
      versusSocket.emit("correctAttempt", 1);
      versusSocket.emit("correctAttempt", 2);
      versusSocket.emit("correctAttempt", 3);
    }
  }, [potions]);

  if (status === "loading") return null;

  if (status === "unauthenticated") redirect("/");

  const handlePlayAgain = () => {
    // Implement your logic to start a new game
    setScore(0);
    setOpponentScore(0);
    setGameEnded(false);
  };

  const changeFreezeEffect = () => {
    setFreezeEffect("5px solid blue");
    setTimeout(() => {
      setFreezeEffect("1px solid black");
    }, 5000); // Reset the border after 5 seconds
  };

  return (
    <>
    <GameStart gameId={params.gameId} />
      <SuccessPopup key={isCorrect} isCorrect={isCorrect}/>
      <div className={styles.navContainer}>
        <NavBar showDifficultyText={false} />
      </div>
      <div className={styles.versusContainer}>
        <div className={styles.opponentBox}>
          <OpponentBox opponentScore={opponentScore} completionThreshold={completionThreshold} border={freezeEffect}/>
        </div>
        <div className={styles.Character}>
          <Image src="/images/opponentCharacter.png" width={250} height={250} />
        </div>
        <div className={styles.Character}>
          <Image src="/images/PlayerCharacter.png" width={300} height={300} />
        </div>
        <div className={styles.playerBox}>
          <PlayerBox score={score} setScore={setScore} setIsCorrect={setIsCorrect}/>
        </div>
        <div className={styles.statusBar}>
          <StatusBox score={score} completionThreshold={completionThreshold} freezeEffect={changeFreezeEffect}/>
        </div>
        <button onClick={() => setGameEnded(true)}>End Game</button>

      {gameEnded && (
        <GameEndDisplay
          isWin={isWin}
          PlayerScore={score}
          opponentScore={opponentScore}
          onPlayAgain={handlePlayAgain}
        />
      )}

      </div>
    </>
  );
};

export default versusPage;
