(function() {
  // Array containing all questions
  var allQuestions = [{
    question: "What is your favorite type of music?:",
    options: ["Pop 🎤", "Hip/Hop 🎧", "RnB 🎵", "Jazz 🎷"],
    answer: 2
  }, {
    question: "How do you prefer to communicate with others?",
    options: ["Face-to-face conversation", "Phone call 📞", "Text message 📱", "Email 📧"],
    answer: 3
  }, {
    question: "Which animal best represents your personality?",
    options: ["Dog 🐶", "Lion 🦁", "Cat 🐱", "Dolphin 🐬"],
    answer: 1
  }, {
    question: "What type of movies do you enjoy the most?",
    options: ["Action 🎬", "Comedy 😂", "Drama 🎭", "Science Fiction 🚀"],
    answer: 0
  }, {
    question: "What is your favorite season?",
    options: ["Winter ❄️", "Fall 🍁", "Summer ☀️", "Spring 🌸"],
    answer: 1
  }];

  // Array containing personality types
  var personalityTypes = [
    "Type A: The Social Butterfly",
    "Type B: The Adventurer",
    "Type C: The Creative Thinker",
    "Type D: The Intellectual",
    "Type E: The Peaceful Soul"
  ];

  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');

  // Function to create the quiz element
  function createQuizElement(index) {
    var element = $('<div>', { id: 'question' });
    var header = $('<h2>').text('Question No. ' + (index + 1) + ':');
    var question = $('<p>').text(allQuestions[index].question);
    var optionsList = $('<ul>');

    // Create radio buttons for options
    allQuestions[index].options.forEach(function(option, i) {
      var listItem = $('<li>');
      var radioInput = $('<input>', {
        type: 'radio',
        name: 'answer',
        value: i
      });
      var optionLabel = $('<label>').text(option);
      listItem.append(radioInput, optionLabel);
      optionsList.append(listItem);
    });

    element.append(header, question, optionsList);
    return element;
  }

  // Function to handle user selection
  function selectOption() {
    selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
  }

  // Function to display next question
  function nextQuestion() {
    quizSpace.fadeOut(function() {
      $('#question').remove();
      if (quesCounter < allQuestions.length) {
        var nextQuestion = createQuizElement(quesCounter);
        quizSpace.append(nextQuestion).fadeIn();
        if (!isNaN(selectOptions[quesCounter])) {
          $('input[value=' + selectOptions[quesCounter] + ']').prop('checked', true);
        }
      } else {
        var personalityType = getPersonalityType();
        var result = $('<div>', { id: 'result' });
        var header = $('<h2>').text('Personality Type:');
        var body = $('<p>').text(personalityType);
        var shareButton = $('<button>', { id: 'share' }).text('Share Your Result');
        
        result.append(header, body, shareButton);
        quizSpace.append(result).fadeIn();
        $('#next, #prev').hide();
      }
    });
  }

  // Function to determine personality type
  function getPersonalityType() {
    var personalityIndex = selectOptions.reduce((total, value) => total + value, 0) % personalityTypes.length;
    return personalityTypes[personalityIndex];
  }

  // Initial display of first question
  nextQuestion();

  // Event handler for next button click
  $('#next').click(function() {
    selectOption();
    if (isNaN(selectOptions[quesCounter])) {
      alert('Please select an option!');
    } else {
      quesCounter++;
      nextQuestion();
    }
  });

  // Event handler for previous button click
  $('#prev').click(function() {
    selectOption();
    quesCounter--;
    nextQuestion();
  });

  // Event handler for share button click
  $(document).on('click', '#share', function() {
    var personalityType = getPersonalityType();
    var shareText = "My personality type is: " + personalityType;
    var shareUrl = encodeURIComponent(window.location.href);
    var facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl;
    var twitterUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText);
    var whatsappUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText + " " + shareUrl);

    window.open(facebookUrl, "_blank");
    window.open(twitterUrl, "_blank");
    window.open(whatsappUrl, "_blank");
  });
})();


