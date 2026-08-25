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
    speak("Sorry boss. Voice recognition is not supported here.");
    return;
  }

  recognition = new webkitSpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function () {
    listening = true;

    document.querySelector(".arc").classList.add("listening");

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

    document.querySelector(".arc").classList.remove("listening");

    speak("Sorry boss, I couldn't hear that.");
  };

  recognition.onend = function () {
    listening = false;

    document.querySelector(".arc").classList.remove("listening");
  };

  recognition.start();
}

function processCommand(command) {

  // Greetings
  if (
    command.includes("hello") ||
    command.includes("hi") ||
    command.includes("hey gee")
  ) {
    speak("Hello boss. Gee is online and ready.");
    return;
  }

  // Identity
  if (
    command.includes("who are you") ||
    command.includes("what are you")
  ) {
    speak("I am Gee, your personal voice assistant.");
    return;
  }

  // How are you
  if (command.includes("how are you")) {
    speak("I'm doing great, boss. Systems are ready.");
    return;
  }

  // Time
  if (
    command.includes("what time") ||
    command.includes("current time")
  ) {
    const now = new Date();

    speak(
      "The time is " +
      now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      })
    );

    return;
  }

  // Date
  if (
    command.includes("what date") ||
    command.includes("today's date") ||
    command.includes("what day")
  ) {
    const now = new Date();

    speak(
      "Today is " +
      now.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    );

    return;
  }
// Open Contacts
if (
  command.includes("open contacts") ||
  command.includes("show contacts")
) {
  speak("Opening your contacts.");

  setTimeout(function () {
    window.open(
      "contacts.html",
      "_blank"
    );
  }, 1000);

  return;
}
  // WhatsApp
  if (
    command.includes("open whatsapp") ||
    command.includes("launch whatsapp")
  ) {
    speak("Opening WhatsApp.");

    setTimeout(function () {
      window.open(
        "https://web.whatsapp.com",
        "_blank"
      );
    }, 1000);

    return;
  }

  // Gmail
  if (
    command.includes("open gmail") ||
    command.includes("launch gmail")
  ) {
    speak("Opening Gmail.");

    setTimeout(function () {
      window.open(
        "https://mail.google.com",
        "_blank"
      );
    }, 1000);

    return;
  }

  // YouTube
  if (
    command.includes("open youtube") ||
    command.includes("launch youtube")
  ) {
    speak("Opening YouTube.");

    setTimeout(function () {
      window.open(
        "https://www.youtube.com",
        "_blank"
      );
    }, 1000);

    return;
  }

  // Google
  if (
    command.includes("open google") ||
    command.includes("launch google")
  ) {
    speak("Opening Google.");

    setTimeout(function () {
      window.open(
        "https://www.google.com",
        "_blank"
      );
    }, 1000);

    return;
  }

  // Search
  if (command.startsWith("search for")) {

    const search =
      command.replace("search for", "").trim();

    if (search === "") {
      speak("What would you like me to search for?");
      return;
    }

    speak("Searching for " + search);

    setTimeout(function () {
      window.open(
        "https://www.google.com/search?q=" +
        encodeURIComponent(search),
        "_blank"
      );
    }, 1000);

    return;
  }

  // Calculator
  if (command.startsWith("calculate")) {

    const expression =
      command.replace("calculate", "").trim();

    try {

      const cleaned =
        expression.replace(
          /[^0-9+\-*/(). ]/g,
          ""
        );

      const result =
        Function(
          '"use strict"; return (' +
          cleaned +
          ")"
        )();

      speak("The answer is " + result);

    } catch {

      speak("Sorry boss, I couldn't calculate that.");

    }

    return;
  }

  // Help
  if (
    command.includes("what can you do") ||
    command.includes("help me")
  ) {
    speak(
      "I can tell you the time and date, " +
      "open WhatsApp, Gmail, YouTube and Google, " +
      "search the web, and perform calculations."
    );

    return;
  }

  // Unknown command
  speak(
    "I heard you say " +
    command +
    ". I don't know how to do that yet, boss."
  );
}
