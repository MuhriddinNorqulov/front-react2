import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./styled";

const ExamItem = ({ data }) => {
  const navigate = useNavigate();

  const chouseExam = (url, id) => {
    if (localStorage.getItem("choused")) {
      if (localStorage.getItem("examId") === String(id)) {
        navigate(url);
      } else alert("Пожалуйста, выполните выбранное тестовое задание");
    } else {
      const agreement = window.confirm(
        "Хотите приступить к тесту? На задание отводится 10 минут"
      );
      if (agreement) {
        localStorage.setItem("choused", "true");
        localStorage.setItem("examId", id);
        localStorage.setItem("time", "600000");
        navigate(url);
      }
    }
  };
  return (
    <Container>
      <Container.Title>
        <FontAwesomeIcon icon={faCircleCheck} /> {data.title}
      </Container.Title>
      <Container.Type>
        <span>Тип: </span>
        {data.exam_type === "intermediate"
          ? "Промежуточный контроль"
          : data.exam_type === "final"
          ? "Окончательный контроль"
          : "Ситуационный кейс"}
      </Container.Type>
      <Container.Info>
        <div>
          <span>Семестр: </span>
          {data.semester}
        </div>
        <div>
          <span>Попытки: </span>
          {data.attempts}
        </div>
      </Container.Info>
      {/* <Container.History>Natijalar tarixi</Container.History> */}
      <Container.Desc>
        {data.desc.length > 50 ? data.desc.slice(0, 50) + "..." : data.desc}
      </Container.Desc>
      {!data.status ? (
        <Container.End>Экзамен завершен</Container.End>
      ) : (
        <Container.Btn
          onClick={() =>
            chouseExam(
              "/student/exam/" + data.id + "-" + data.attempts + data.semester,
              data.id
            )
          }
        >
         Начать <FontAwesomeIcon icon={faArrowRight} />
        </Container.Btn>
      )}
    </Container>
  );
};

export default ExamItem;
