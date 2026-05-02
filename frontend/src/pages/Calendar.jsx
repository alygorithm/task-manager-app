import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/calendar.css";
import BottomNav from "./BottomNav";

export default function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState(() =>
    formatDate(new Date())
  );

  // 📅 FORMAT YYYY-MM-DD (SAFE)
  function formatDate(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  }

  // 📦 LOAD TASKS
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

  // 🧼 NORMALIZE DB DATE
  const normalizeDate = (date) =>
    typeof date === "string" ? date.split("T")[0] : "";

  // 🎯 TASK FILTER
  const filteredTasks = tasks.filter(
    (t) => normalizeDate(t.date) === selectedDay
  );

  // 📅 MONTH GENERATOR
  const getMonthDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    // padding inizio settimana
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // giorni mese
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);

      days.push({
        date: formatDate(date),
        day: d
      });
    }

    return days;
  };

  const monthDays = getMonthDays();

  return (
    <div className="calendar-page">

      {/* HEADER */}
      <div className="calendar-header">
        <h2>Calendar</h2>
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

      {/* TASK AREA */}
      <div className="task-section">

        <h3 className="selected-date">{selectedDay}</h3>

        {filteredTasks.length === 0 ? (
          <p className="empty-text">Nessuna task per questo giorno</p>
        ) : (
          filteredTasks.map((t) => (
            <div key={t.id} className="task-card">
              {t.title}
            </div>
          ))
        )}

      </div>

      <BottomNav />
    </div>
  );
}