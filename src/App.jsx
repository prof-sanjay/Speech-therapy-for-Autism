import React, { useState } from "react";

function App() {
  const [page, setPage] = useState("home");
  const [levelIndex, setLevelIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");


  const imageLevels = [
    [
      { img: "https://cdn-icons-png.flaticon.com/512/415/415733.png", word: "Apple" },
      { img: "https://cdn-icons-png.flaticon.com/512/3012/3012458.png", word: "Ball" },
    ],
    [
      { img: "https://cdn-icons-png.flaticon.com/512/616/616655.png", word: "Cat" },
      { img: "https://cdn-icons-png.flaticon.com/512/616/616554.png", word: "Dog" },
    ],
    [
      { img: "https://cdn-icons-png.flaticon.com/512/616/616682.png", word: "Umbrella" },
      { img: "https://cdn-icons-png.flaticon.com/512/616/616565.png", word: "Fish" },
    ],
  ];

  const soundLevels = [
    ["Apple", "Ball"],
    ["Cat", "Dog"],
    ["Umbrella", "Fish"],
  ];

  const recordVoice = (targetWord) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    setFeedback("Listening...");

    recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript.toLowerCase();
      const expected = targetWord.toLowerCase();
      if (userSpeech.includes(expected)) {
        setFeedback(`You said "${userSpeech}". Great job!`);
        setScore((prev) => prev + 10);
      } else {
        setFeedback(`You said "${userSpeech}". Try again!`);
      }
    };

  };


  const ImagesToWords = () => {
    const words = imageLevels[levelIndex];

    const nextLevel = () => {
      if (levelIndex < imageLevels.length - 1) {
        setLevelIndex(levelIndex + 1);
        setFeedback("");
      } else {
        setCompleted(true);
      }
    };

    if (completed)
      return (
        <div style={styles.centerPage}>
          <h2 style={styles.heading}>Great Job! You finished all levels!</h2>
          <h3 style={styles.scoreText}>Your Score: {score} / 60</h3>
          <div>
            <button
              style={styles.bigButton}
              onClick={() => {
                setCompleted(false);
                setLevelIndex(0);
                setScore(0);
                setFeedback("");
              }}
            >
              Play Again
            </button>
            <button
              style={styles.bigButton}
              onClick={() => {
                setCompleted(false);
                setLevelIndex(0);
                setScore(0);
                setPage("home");
              }}
            >
              Home
            </button>
          </div>
        </div>
      );

    return (
      <div style={styles.centerPage}>
        <h2 style={styles.heading}>Images to Words (Level {levelIndex + 1})</h2>
        {words.map((item, i) => (
          <div key={i} style={styles.card}>
            <img src={item.img} alt={item.word} style={styles.image} />
            <p style={styles.text}>Say the word: <b>{item.word}</b></p>
            <button style={styles.button} onClick={() => recordVoice(item.word)}>
              Record Voice
            </button>
          </div>
        ))}
        <p style={styles.feedback}>{feedback}</p>
        <button style={styles.nextButton} onClick={nextLevel}>
          Next Level
        </button>
      </div>
    );
  };

  const SoundRepetition = () => {
    const sounds = soundLevels[levelIndex];

    const nextLevel = () => {
      if (levelIndex < soundLevels.length - 1) {
        setLevelIndex(levelIndex + 1);
        setFeedback("");
      } else {
        setCompleted(true);
      }
    };

    if (completed)
      return (
        <div style={styles.centerPage}>
          <h2 style={styles.heading}> Awesome! You completed all levels!</h2>
          <h3 style={styles.scoreText}> Your Score: {score} / 60</h3>
          <div>
            <button
              style={styles.bigButton}
              onClick={() => {
                setCompleted(false);
                setLevelIndex(0);
                setScore(0);
                setFeedback("");
              }}
            >
              Play Again
            </button>
            <button
              style={styles.bigButton}
              onClick={() => {
                setCompleted(false);
                setLevelIndex(0);
                setScore(0);
                setPage("home");
              }}
            >
              Home
            </button>
          </div>
        </div>
      );

    return (
      <div style={styles.centerPage}>
        <h2 style={styles.heading}> Sound Repetition (Level {levelIndex + 1})</h2>
        {sounds.map((sound, i) => (
          <div key={i} style={styles.card}>
            <p style={styles.text}>Listen and repeat: <b>“{sound}”</b></p>
            <button
              style={styles.button}
              onClick={() => {
              const utter = new SpeechSynthesisUtterance(sound);
              utter.lang = "en-US";
              utter.rate = 0.9;
              speechSynthesis.speak(utter);
            }}>
              Play "{sound}"
            </button>
            <button style={styles.button} onClick={() => recordVoice(sound)}>
              Record Voice
            </button>
          </div>
        ))}
        <p style={styles.feedback}>{feedback}</p>
        <button style={styles.nextButton} onClick={nextLevel}>
          Next Level
        </button>
      </div>
    );
  };

  const HomePage=()=>(
    <div style={styles.centerPage}>
      <h1 style={styles.title}>🗣️ Speech Therapy for Kids</h1>
      <p style={styles.subtitle}>Choose an activity to begin!</p>
      <div>
        <button
          style={styles.bigButton}
          onClick={() => {
            setPage("images");
            setLevelIndex(0);
            setCompleted(false);
            setScore(0);
          }}
        >
          Images to Words
        </button>
        <button
          style={styles.bigButton}
          onClick={() => {
            setPage("sound");
            setLevelIndex(0);
            setCompleted(false);
            setScore(0);
          }}
        >
          Sound Repetition
        </button>
      </div>
    </div>
  );

    if (page === "home") return <HomePage />;
    if (page === "images") return <ImagesToWords />;
    if (page === "sound") return <SoundRepetition />;
}

const styles = {
  centerPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#F4F9F9",
    fontFamily: "'Comic Sans MS', sans-serif",
    textAlign: "center",
    color: "#333",
    padding: "20px",
  },
  title: {
    color: "#3B82F6",
    fontSize: "36px",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },
  heading: {
    color: "#10B981",
    marginBottom: "15px",
    fontSize: "24px",
  },
  bigButton: {
    backgroundColor: "#3B82F6",
    color: "white",
    border: "none",
    borderRadius: "15px",
    padding: "15px 30px",
    fontSize: "20px",
    margin: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  nextButton: {
    backgroundColor: "#F59E0B",
    color: "white",
    border: "none",
    borderRadius: "15px",
    padding: "12px 25px",
    fontSize: "18px",
    marginTop: "20px",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    padding: "20px",
    margin: "15px 0",
    width: "320px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100px",
    height: "100px",
  },
  text: {
    fontSize: "18px",
    margin: "10px 0",
  },
  button: {
    backgroundColor: "#10B981",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    margin: "5px",
    cursor: "pointer",
  },
  feedback: {
    fontSize: "18px",
    marginTop: "15px",
    color: "#444",
  },
  scoreText: {
    color: "#3B82F6",
    fontSize: "22px",
  },
};

export default App;
