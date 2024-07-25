import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/components/Header';
import Question from './assets/components/Question';
import Results from './assets/components/Results';
import UserForm from './assets/components/UserForm';
import { UserProvider } from './assets/components/UserContext';
import './App.css';

const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    question: "What's your favorite season?",
    options: ["Spring 🌸", "Summer ☀️", "Fall 🍂", "Winter ❄️"],
  },
  {
    question: "What's your preferred time of day?",
    options: ["Morning 🌅", "Afternoon ☀️", "Evening 🌇", "Night 🌙"],
  },
  {
    question: "What's your favorite activity?",
    options: ["Hiking 🏞️", "Reading 📚", "Cooking 🍳", "Gaming 🎮"],
  },
  {
    question: "What's your favorite animal?",
    options: ["Cat 🐱", "Dog 🐶", "Bird 🦜", "Fish 🐟"],
  },
];


const dogBreeds = {
  australian: "australian",
  labrador: "labrador",
  bulldog: "bulldog",
  beagle: "beagle",
};



const elements = {
  "Red 🔴": "australian",
  "Blue 🔵": "labrador",
  "Green 🟢": "bulldog",
  "Yellow 🟡": "beagle",
  "Spring 🌸": "bulldog",
  "Summer ☀️": "australian",
  "Fall 🍂": "beagle",
  "Winter ❄️": "labrador",
  "Morning 🌅": "australian",
  "Afternoon ☀️": "beagle",
  "Evening 🌇": "bulldog",
  "Night 🌙": "labrador",
  "Hiking 🏞️": "bulldog",
  "Reading 📚": "beagle",
  "Cooking 🍳": "australian",
  "Gaming 🎮": "labrador",
  "Cat 🐱": "bulldog",
  "Dog 🐶": "australian",
  "Bird 🦜": "beagle",
  "Fish 🐟": "labrador",
};



function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    const determinedElement = Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });

    console.log('Determined Element:', determinedElement);

    return determinedElement;
  }




  async function fetchDogImage(breed) {
    try {
      console.log(`Fetching image for breed: ${breed}`);
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await response.json();
    

      if (data.status === "success" && data.message) {
        setArtwork(data.message);
      } else {
        setArtwork(null);
      }
    } catch (error) {
      console.error('Error fetching dog image:', error);
      setArtwork(null);
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchDogImage(dogBreeds[selectedElement]);
    }
  }, [currentQuestionIndex]);

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setElement("");
    setArtwork(null);
  }
  
  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <>
                  <Results element={element} artwork={artwork} />
                  <button onClick={resetQuiz} className="reset-button">
                    Restart Quiz
                  </button>
                </>
              )
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;


