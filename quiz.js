(function() {
  var allQuestions = [{
    question: "What is your favorite type of music?:",
    options: ["Pop", "Hip/Hop", "RnB", "Jazz"],
    answer: 2
  }, {
    question: "How do you prefer to communicate with others?",
    options: ["Face-to-face conversation", "Phone call", "Text message", "Email"],
    answer: 3
  }, {
    question: "Which animal best represents your personality?",
    options: ["Dog", "Lion", "Cat", "Dolphin"],
    answer: 1
  }, {
    question: "What type of movies do you enjoy the most?",
    options: ["Action", "Comedy", "Drama", "Science Fiction"],
    answer: 0
  }, {
    question: "What is your favorite season?",
    options: ["Winter", "Fall", "Summer", "Spring"],
    answer: 1
  }];

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

  nextQuestion();

  $('#next').click(function() {
    chooseOption();
    if (isNaN(selectOptions[quesCounter])) {
      alert('Please select an option !');
    } else {
      quesCounter++;
      nextQuestion();
    }
  });

  $('#prev').click(function() {
    chooseOption();
    quesCounter--;
    nextQuestion();
  });

  function createElement(index) {
    var element = $('<div>', {
      id: 'question'
    });
    var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
    element.append(header);

    var question = $('<p>').append(allQuestions[index].question);
    element.append(question);

    var radio = radioButtons(index);
    element.append(radio);

    return element;
  }

  function radioButtons(index) {
    var radioItems = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < allQuestions[index].options.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += allQuestions[index].options[i];
      item.append(input);
      radioItems.append(item);
    }
    return radioItems;
  }

  function chooseOption() {
    selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
  }

  function nextQuestion() {
    quizSpace.fadeOut(function() {
      $('#question').remove();
      if (quesCounter < allQuestions.length) {
        var nextQuestion = createElement(quesCounter);
        quizSpace.append(nextQuestion).fadeIn();
        if (!(isNaN(selectOptions[quesCounter]))) {
          $('input[value=' + selectOptions[quesCounter] + ']').prop('checked', true);
        }
        if (quesCounter === 1) {
          $('#prev').show();
        } else if (quesCounter === 0) {
          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var personalityType = getPersonalityType();
        var result = $('<div>', {
          id: 'result'
        });
        var header = $('<h2>').text('Personality Type:');
        var body = $('<p>').text(personalityType);
        result.append(header);
        result.append(body);
        quizSpace.append(result).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#share').show(); // Show share button on results page
      }
    });
  }

  $('#share').click(function() {
    // Placeholder for sharing functionality
    alert("Share your personality type!");
  });

  function getPersonalityType() {
    // Determine the personality type based on the selected options
    var personalityIndex = selectOptions.reduce((total, value) => total + value, 0) % personalityTypes.length;
    return personalityTypes[personalityIndex];
  }
})();
