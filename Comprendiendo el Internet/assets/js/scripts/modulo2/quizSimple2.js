var questions = [
    {
      text: `¿Qué significan las siglas ISP?.`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 1,
      answers: [`Iniciativa de Servicios Personales`, 
                `Proveedor de Servicios de Internet`, 
                `Proveedor de servicios Públicos`],
    },
    {
      text: `Su trabajo es enviar paquetes de datos de una red a otra, es como el cartero de las computadoras:`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 0,
      answers: [`Router`, `HUB`, `Switch`],
    },
    {
      text: `¿Qué significan las siglas DNS y cómo funciona?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 0,
      answers: [`Sistema de Nombres de Dominio y es como la guía teléfónica del internet.`, 
                `Sistema de Navegación Segura y sirve como un policía que cuida lo que vemos en la red.`,
                `Núcleo de Desarrollo Sostenible, ayuda a regular el consumo de energía dentro de el internet.`],
    },
    {
      text: `Es como el mensajero más sencillo en una red de computadoras, su trabajo es conectar todos los equipos a una red local:`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 2,
      answers: [`Switch`,`Router`,`HUB`],
    },
    {
      text: `Es un ejemplo de un navegador web:`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 1,
      answers: [`www.gooogle.com`, `Google Chrome`, `Gmail`],
    },
    {
      text: `Selecciona los dos tipos de dirección IP:`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 2,
      answers: [`Pública y Secreta`, `Privada y Secreta`, `Pública y Privada`],
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
  