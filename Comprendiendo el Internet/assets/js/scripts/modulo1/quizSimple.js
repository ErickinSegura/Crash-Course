var questions = [
    {
      text: `¿Qué es el internet?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 1,
      answers: [`Un sitio web donde puedes ver videos.`,
                 `Una red global de computadoras y dispositivos electrónicos.`,
                 `Una red de personas que comparten el gusto por las computadoras.`],
    },
    {
      text: `¿De qué está compuesto un sitio web?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 0,
      answers: [`De texto relacionado, imágenes y otros recursos.`,
                 `De una red global de computadoras y dispositivos electrónicos.`,
                 `De dispositivos electrónicos con acceso a internet.`],
    },
    {
      text: `¿De qué otra forma se le conoce a la web?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 2,
      answers: [`World Wonderful Web.`, 
                `Wonderful Wide Web`,
                `World Wide Web`],
    },
    {
      text: `¿La red WiFi necesita de cables físicos para acceder al Internet?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 0,
      answers: [`Verdadero`, 
                `Falso`,],
    },
    {
      text: `¿Decir que una computadora está en línea es otra forma de decir que está conectada a Internet?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 0,
      answers: [`Verdadero`, 
                `Falso`,],
    },
    {
      text: `¿Qué aplicación se utiliza para acceder y ver sitios web?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 2,
      answers: [`Barco web.`, 
                `Mapa web`,
                `Navegador web`],
    },
    {
        text: `¿Cuál puede ser el propósito de un sitio web?`,
        correctText: `¡Correcto!`,
        incorrectText: `Incorrecto...`,
        correctIndex: 3,
        answers: [`Plataforma de noticias.`, 
                  `Biblioteca en línea`,
                  `Sitio educativo`,
                  `Todas las anteriores` 
                ],
      },
      {
        text: ` ¿Dónde se almacenan los sitios web?`,
        correctText: `¡Correcto!`,
        incorrectText: `Incorrecto...`,
        correctIndex: 1,
        answers: [`Tu computadora`, 
                  `Un servidor`,],
      },
      {
        text: `Al visitar un sitio web, tu computadora envía una solicitud a un servidor:`,
        correctText: `¡Correcto!`,
        incorrectText: `Incorrecto...`,
        correctIndex: 0,
        answers: [`Verdadero`, 
                  `Falso`,],
      },
      {
        text: ` Lo sorprendente de todo es que sucede en segundos:`,
        correctText: `¡Correcto!`,
        incorrectText: `Incorrecto...`,
        correctIndex: 0,
        answers: [`Verdadero`, 
                  `Falso`,],
      },
  ];
  questions = questions.sort((a, b) => 0.5 - Math.random());
  
  const answersList = function (answers, correctIndex, id) {
    return answers
      .map((ans, i) => {
        let className = correctIndex === i ? "option correct" : "option";
        return `
          <div class="custom-control custom-radio">
              <input type="radio" class="custom-control-input ${className}" name="radiobutton${id}" />
              <label class="custom-control-label q-option-${i}" for="U13_Q${id}_A${i}">
                  ${ans}
              </label>
          </div>
          `;
      })
      .join("");
  };
  
  const question = function (
    i,
    { text, incorrectText, correctText, correctIndex, answers }
  ) {
    const answersHtml = answersList(answers, correctIndex, i);
  
    return `
          <div class="question col-md-5 col-sm-12 mx-1">
              <p class="question-text">
                  ${i + 1}. ${text}
              </p>
              <p class="alertWrong mb-0 font-size-14 font-weight-bold" style="display: none; color: red">
                  ${incorrectText}
              </p>
              <p class="alertCorrect mb-0 font-size-14 font-weight-bold" style="display: none; color: green">
                  ${correctText}
              </p>
              ${answersHtml}
          </div>
          `;
  };
  
  const generateQuestions = function () {
    return questions
      .map((q, i) => {
        return question(i, q);
      })
      .join("");
  };
  
  const questionsContainer = document.querySelector("#questions");
  
  const modal = document.querySelector("#modal-fs");
  const modalMessage = modal.querySelector("#modal-message");
  const modalScore = modal.querySelector("#modal-score");
  const correctImg = modal.querySelector("#correct-img");
  const incorrectImg = modal.querySelector("#incorrect-img");
  
  document.addEventListener("DOMContentLoaded", function (_) {
    const qs = generateQuestions();
    questionsContainer.insertAdjacentHTML("afterbegin", qs);
  
    $(".custom-control-label").on("click", function () {
      console.log("clicked");
      if ($(this).siblings().is(":checked")) {
        $(this).siblings().removeAttr("checked");
      } else {
        $(this).siblings().prop("checked", true);
      }
    });
  
    incorrectImg.style.display = "none";
    correctImg.style.display = "none";
  });
  
  function checkAll() {
    var correct = 0;
    var count = 0;
  
    $("div.question").each(function () {
      count++;
      var elem = $(this);
      $(this).find(".alertCorrect").css("display", "none");
      $(this).find(".alertWrong").css("display", "none");
      $(this).removeClass("correct");
      $(this).removeClass("incorrect");
      var isCorrect = true;
      $(this)
        .find("input.custom-control-input")
        .each(function () {
          if ($(this).hasClass("correct")) {
            if (!$(this).is(":checked")) {
              isCorrect = false;
            }
          } else {
            if ($(this).is(":checked")) {
              isCorrect = false;
            }
          }
        });
      if (isCorrect == true) {
        correct++;
        $(this).find(".alertCorrect").css("display", "block");
        $(this).addClass("correct");
      } else {
        $(this).find(".alertWrong").css("display", "block");
        $(this).addClass("incorrect");
      }
    });
    let score = parseInt((correct * 100) / count);
    modalScore.textContent = `${score} / 100`;
  
    if (score >= 80) {
      modalMessage.textContent = "¡Excelente!";
      incorrectImg.style.display = "none";
      correctImg.style.display = "block";
    } else {
      modalMessage.textContent = "Vuelve a intentarlo...";
      incorrectImg.style.display = "block";
      correctImg.style.display = "none";
  
      if (score < 25) {
        alert(
          "Le recomendamos volver a leer esta sección para tener mayor puntuaje que 25."
        );
      }
    }
  }
  