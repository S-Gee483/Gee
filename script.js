let recognition;
let listening = false;

function speak(text) {
  const voice = new SpeechSynthesisUtterance(text);
  voice.rate = 1;
  voice.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(voice);

  document.getElementById("status").innerText = "Gee is speaking...";
}

function startListening() {

  if (!("webkitSpeechRecognition" in window)) {
    speak("Sorry boss. Voice recognition is not supported on this browser.");
    return;
  }

  recognition = new webkitSpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function () {
    listening = true;
    document.getElementById("status").innerText =
      "Gee is listening...";
  };

  recognition.onresult = function (event) {

    const command =
      event.results[0][0].transcript.toLowerCase();

    document.getElementById("status").innerText =
      "You said: " + command;

    processCommand(command);
  };

  recognition.onerror = function () {
    listening = false;
    document.getElementById("status").innerText =
      "Gee is ready.";
  };

  recognition.onend = function () {
    listening = false;
  };

  recognition.start();
}

function processCommand(command) {

  if (command.includes("hello") ||
      command.includes("hi")) {

    speak("Hello boss. Gee is online.");
    return;
  }

  if (command.includes("who are you")) {

    speak("I am Gee, your personal AI assistant.");
    return;
  }

  if (command.includes("how are you")) {

    speak("I'm doing great, boss. Ready when you are.");
    return;
  }

  speak(
    "I heard you say " + command +
    ". My AI brain is not connected yet."
  );
}
