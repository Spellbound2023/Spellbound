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
import next from "next";

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
  const [gameEndMessage, setGameEndMessage] = useState("");
  const { data: session, status } = useSession();
  const { push } = useRouter();

  //Completion score, change if you want
  const completionThreshold = 30;

  const [nextWord, setNextWord] = useState({
    wordData: { definition: [], audioUrl: "" },
    points: 0,
    streak: 0,
  });
  const [opponentsPoints, setOpponentsPoints] = useState(0);
  const [opponentStreak, setOpponentStreak] = useState(0);
  const [opponentIsTyping, setOpponentIsTyping] = useState(false);

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
        console.log(opponentUsername);
      });

      // Listen for incoming messages
      versusSocket.on("opponentReady", () => {
        console.log("The opponent is ready!");
      });

      // Listen for incoming messages
      versusSocket.on("gameStarted", (timerStartTimestamp) => {
        console.log("The game has started at: ", timerStartTimestamp);

        /* versusSocket.emit("typing");
        versusSocket.emit("correctAttempt", 1);
        versusSocket.emit("correctAttempt", 2);
        versusSocket.emit("correctAttempt", 3);
        versusSocket.emit("incorrectAttempt"); */
        //versusSocket.emit("skipWord");
      });

      // Listen for incoming messages
      versusSocket.on("nextWord", (nextWord) => {
        console.log("nextWord: ", nextWord);
        setNextWord(nextWord);
      });

      /*  versusSocket.on("opponentNextWord", (opponentNextWord) => {
        console.log("opponentNextWord: ", opponentNextWord);
        setOpponentNextWord(opponentNextWord)
      }); */

      versusSocket.on("opponentTyping", () => {
        setOpponentIsTyping(true);

        setTimeout(() => {
          setOpponentIsTyping(false);
        }, 800);
      });

      versusSocket.on("redirect", (url) => {
        console.log("Redirecting to :", url);
        push(url, undefined, { shallow: false });
      });

      // versusSocket.on("userWon", () => {
      //   console.log("You have won the game!");
      //   setIsWin(true);
      // });

      // versusSocket.on("opponentWon", () => {
      //   console.log("Your opponent ", opponentUsername, " has won the game!");
      //   setIsWin(false);
      // });

      versusSocket.on("potionsChange", (potions) => {
        console.log("Your potions: ", potions);
        setPotions(potions);
      });

      versusSocket.on("opponentPointsChange", (points, streak) => {
        console.log("Your opponent has ", points, " points");
        console.log("Your opponent streak is ", streak);
        setOpponentsPoints(points);
        setOpponentStreak(streak);
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

      // versusSocket.on("opponentQuit", () => {
      //   console.log("Your opponent has quit");
      // });

      // versusSocket.on("opponentDisconnected", () => {
      //   console.log("Your opponent has disconnected");
      // });

      // versusSocket.on("timerEnded", () => {
      //   console.log("The game timer has ended");
      // });

      versusSocket.on("gameEnded", (gameEndInfo) => {
        console.log("The game has ended");
        console.log(gameEndInfo);

        if (gameEndInfo.winner === session.user.username) {
          setIsWin(true);
        } else if (gameEndInfo.winner === null) {
          // the game is a draw
          setIsWin(null);
        } else {
          setIsWin(false);
        }

        setScore(gameEndInfo.points);
        setOpponentScore(gameEndInfo.opponentPoints);

        let message = "";
        // The possible values of endReason are defined in /back-end/utils/game/enum.js
        switch (gameEndInfo.endReason) {
          case "TIMER_ENDED":
            message = "The timer has ended";
            break;
          case "TARGET_REACHED":
            message = "The points target has been reached";
            break;
          case "USER_QUIT":
            if (gameEndInfo.endingPlayer === session.user.username) {
              message = "You have quit the game";
            } else {
              message = "Your opponent has quit the game";
            }
            break;
          case "USER_DISCONNECTED":
            if (gameEndInfo.endingPlayer === session.user.username) {
              message = "You have disconnected from the game";
            } else {
              message = "Your opponent has disconnected from the game";
            }
            break;
        }
        setGameEndMessage(message);

        setGameEnded(true);
      });

      // console.log("The game has ended");
      versusSocket.emit("userReady");

      // setTimeout(() => {
      //   versusSocket.emit("userQuits");
      // }, 25000);
    }
  }, [status]);

  /* useEffect(() => {
    if (versusSocket) {
      versusSocket.emit("potionUse", potions[0]);
      versusSocket.emit("correctAttempt", 1);
      versusSocket.emit("correctAttempt", 2);
      versusSocket.emit("correctAttempt", 3);
    }
  }, [potions]); */

  if (status === "loading") return null;

  if (status === "unauthenticated") redirect("/");

  const handlePlayAgain = () => {
    // Implement your logic to start a new game
    // setPlayerScore(0);
    // setOpponentScore(0);
    // setGameEnded(false);
  };

  const emitSocketEvent = (eventName, data) => {
    //for passing socket.emits to components
    if (versusSocket) {
      versusSocket.emit(eventName, data);
    }
  };

  return (
    <>
      <SuccessPopup key={isCorrect} isCorrect={isCorrect} />
      <div className={styles.navContainer}>
        <NavBar showDifficultyText={false} TitleText={"Versus"}/>
      </div>
      <div className={styles.versusContainer}>
        <div className={styles.opponentBox}>
          <OpponentBox
            opponentScore={opponentScore}
            completionThreshold={completionThreshold}
            isTyping={opponentIsTyping}
            username={opponentUsername}
            points={opponentsPoints}
            streak={opponentStreak}
          />
        </div>
        <div className={styles.Character}>
          <Image src="/images/opponentCharacter.png" width={250} height={250} />
        </div>
        <div className={styles.Character}>
          <Image src="/images/PlayerCharacter.png" width={300} height={300} />
        </div>
        <div className={styles.playerBox}>
          <PlayerBox
            score={score}
            setScore={setScore}
            setIsCorrect={setIsCorrect}
            nextWord={nextWord}
            emitSocketEvent={emitSocketEvent}
          />
        </div>
        <div className={styles.statusBar}>
          <StatusBox
            nextWord={nextWord}
            completionThreshold={completionThreshold}
            score={score}
          />
        </div>

        {gameEnded && (
          <GameEndDisplay
            isWin={isWin}
            PlayerScore={score}
            opponentScore={opponentScore}
            gameEndMessage={gameEndMessage}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </>
  );
};

export default versusPage;
