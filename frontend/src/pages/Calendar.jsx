import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/calendar.css";
import BottomNav from "./BottomNav";

export default function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));
  const [selectedTask, setSelectedTask] = useState(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // FORMAT YYYY-MM-DD
  function formatDate(date) {
    const d = new Date(date);

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  }

  // LOAD TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data || []);
      } catch (err) {
        console.log(err);
        setTasks([]);
      }
    };

    fetchTasks();
  }, []);

  // NORMALIZE DB DATE
  const normalizeDate = (date) =>
    typeof date === "string" ? date.split("T")[0] : "";

  // FILTER TASKS FOR SELECTED DAY
  const filteredTasks = tasks.filter(
    (t) => normalizeDate(t.date) === selectedDay
  );

  // GENERATE MONTH GRID
  const getMonthDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const days = [];

    // padding (Lunedì = 1, Domenica = 7)
    let start = firstDay.getDay();

    if (start === 0) start = 7;

    for (let i = 1; i < start; i++) {
      days.push(null);
    }

    // giorni del mese
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(currentYear, currentMonth, d);

      days.push({
        date: formatDate(date),
        day: d,
      });
    }

    return days;
  };

  const monthDays = getMonthDays();

  return (
    <div className="calendar-page">

      {/* HEADER */}
      <div className="calendar-header">

        <button
          className="month-btn"
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        >
          ←
        </button>

        <h2 className="month-title">
          {new Date(currentYear, currentMonth).toLocaleDateString("it-IT", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          className="month-btn"
          onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        >
          →
        </button>

      </div>

      {/* WEEKDAYS */}
      <div className="weekdays">
        <span>L</span>
        <span>M</span>
        <span>M</span>
        <span>G</span>
        <span>V</span>
        <span>S</span>
        <span>D</span>
      </div>

      {/* GRID */}
      <div className="calendar-grid">

        {monthDays.map((d, i) => {
          if (!d) return <div key={i} className="empty" />;

          const hasTask = tasks.some(
            (t) => normalizeDate(t.date) === d.date
          );

          const active = selectedDay === d.date;

          return (
            <div
              key={d.date}
              className={`day ${active ? "active" : ""}`}
              onClick={() => setSelectedDay(d.date)}
            >
              <span>{d.day}</span>

              {hasTask && <div className="dot" />}
            </div>
          );
        })}

      </div>

      {/* TASK SECTION */}
      <div className="task-section">

        <h3 className="selected-date">
          {new Date(selectedDay).toLocaleDateString("it-IT", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </h3>

        {filteredTasks.length === 0 ? (
          <p className="empty-text">
            Nessuna task per questo giorno
          </p>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className="task-card"
              onClick={() => setSelectedTask(t)}
            >
              {t.title}
            </div>
          ))
        )}

      </div>

      {/* MODAL TASK */}
      {selectedTask && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedTask(null)}
        >

          <div
            className="task-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setSelectedTask(null)}
            >
              ✕
            </button>

            <h2>{selectedTask.title}</h2>

            <p>
              <strong>Descrizione:</strong>
            </p>

            <p>
              {selectedTask.description || "Nessuna descrizione"}
            </p>

            <p>
              <strong>Data:</strong>
            </p>

            <p>
              {normalizeDate(selectedTask.date)}
            </p>

            <p>
              <strong>Stato:</strong>
            </p>

            <p>
              {selectedTask.completed
                ? "Completata"
                : "Da fare"}
            </p>

          </div>

        </div>
      )}

      <BottomNav />

    </div>
  );
}