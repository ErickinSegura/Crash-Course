var questions = [
    {
      text: `¿Qué significa IoT?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 1,
      answers: [`Internet de las Tecnologías`,
                 `Internet de las Cosas`,
                 `Internet de los Tiempos`],
    },
    {
      text: `¿Qué tipo de objetos pueden conectarse a través del IoT?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 0,
      answers: [`Objetos cotidianos como electrodomésticos, dispositivos de seguridad, aparatos de salud y wearables`,
                 `Solo electrodomésticos`,
                 `Solo dispositivos electrónicos`],
    },
    {
      text: `¿Cómo funcionan los dispositivos IoT?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 1,
      answers: [`Envían información a través de internet, pero no pueden recibirla.`, 
                `Tienen sensores que recopilan información sobre su entorno, la envían a través de internet a una plataforma donde se analiza y se utiliza para tomar decisiones.`,
                `Solo se pueden controlar manualmente.`],
    },
    {
      text: `¿Cuál es uno de los beneficios del IoT?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 1,
      answers: [`Mayor complejidad en el manejo de dispositivos`, 
                `Mayor comodidad, seguridad y eficiencia`,
                `Mayor dependencia de la tecnología`],
    },
    {
      text: `¿Cuál es uno de los riesgos del IoT?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 1,
      answers: [`Reducción de la dependencia tecnológica`, 
                `Vulnerabilidad a ataques cibernéticos y riesgos de privacidad`,
                `Mayor seguridad en los dispositivos`],
    },
    {
      text: `¿Cuál es una medida de seguridad recomendada para usar el IoT de forma segura?`,
      correctText: `¡Correcto!`,
      incorrectText: `Incorrecto...`,
      correctIndex: 2,
      answers: [`Compartir libremente tu información personal con los dispositivos IoT`, 
                `Utilizar redes Wi-Fi públicas para conectar tus dispositivos IoT`,
                `Actualizar tus dispositivos IoT`],
    }
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
  