import { useEffect, useState } from "react";
import api from "../api/api";
import BottomNav from "./BottomNav";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data || []);
      } catch {
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data || []);
  };

  const createTask = async () => {
    if (!title.trim() || !date) return;
    await api.post("/tasks", { title, description: desc, date });
    setTitle("");
    setDesc("");
    setDate("");
    setShowModal(false);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const toggleTask = async (id, completed) => {
    await api.put(`/tasks/${id}`, { completed: !completed });
    loadTasks();
  };

  const normalizeDate = (date) =>
    new Date(date).toISOString().split("T")[0];

  const filteredTasks = tasks.filter(
    (t) => normalizeDate(t.date) === selectedDay
  );

  const taskMap = tasks.reduce((acc, t) => {
    acc[normalizeDate(t.date)] = true;
    return acc;
  }, {});

  const getWeekDays = () => {
    const days = [];
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({
        date: formatDate(d),
        day: d.toLocaleDateString("it-IT", { weekday: "short" }),
        num: d.getDate()
      });
    }
    return days;
  };

  const formatDayLabel = (dateStr) => {
    const [y, m, d] = dateStr.split("-");
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return date.toLocaleDateString("it-IT", {
      weekday: "long",
      day: "2-digit",
      month: "long"
    });
  };

  return (
    <div className="app">
      <div className="topbar">
        <div className="top-title">Task Manager</div>
      </div>

      <div className="container">
        <div className="ios-calendar">
          {getWeekDays().map((d) => {
            const hasTasks = taskMap[d.date];
            return (
              <div
                key={d.date}
                className={`ios-day ${selectedDay === d.date ? "active" : ""}`}
                onClick={() => setSelectedDay(d.date)}
              >
                <div className="weekday">
                  {d.day.charAt(0).toUpperCase() + d.day.slice(1)}
                </div>

                <div className="number">{d.num}</div>

                {hasTasks && <div className="dot-mini" />}
              </div>
            );
          })}
        </div>

        <h2 className="day-title-strong">{formatDayLabel(selectedDay)}</h2>

        <div className="task-status">
          <span className="status-dot"></span>
          {filteredTasks.length === 0
            ? "Nessuna task"
            : `${filteredTasks.length} task presenti`}
        </div>

        <button
          className="add-btn"
          onClick={() => {
            setDate(selectedDay);
            setShowModal(true);
          }}
        >
          + Nuova Task
        </button>

        <div className="task-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredTasks.map((task) => (
              <div className="card fade-in" key={task.id}>
                <div className="left">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id, task.completed)}
                  />
                  <span className={task.completed ? "done" : ""}>
                    {task.title}
                  </span>
                </div>
                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />

      {showModal && (
        <div className="modal-bg" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nuova Task</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <label className="modal-label">Titolo</label>
            <input
              className="modal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Inserisci titolo"
            />

            <label className="modal-label">Descrizione</label>
            <textarea
              className="modal-input textarea"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Aggiungi una descrizione"
            />

            <label className="modal-label">Data</label>
            <div className="date-wrapper">
              <input
                className="modal-input date-input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <span className="calendar-icon">🗓</span>
            </div>

            <div className="modal-buttons">
              <button className="modal-save" onClick={createTask}>Salva</button>
              <button className="modal-cancel" onClick={() => setShowModal(false)}>Annulla</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
