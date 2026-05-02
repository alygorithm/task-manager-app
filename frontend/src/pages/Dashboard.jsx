import { useEffect, useState } from "react";
import api from "../api/api";
import BottomNav from "./BottomNav";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // 📅 FIX DATE
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));

  // 🔄 LOAD
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data || []);
      } catch (err) {
        console.log(err);
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

  // ➕ CREATE
  const createTask = async () => {
    if (!title.trim()) return;

    await api.post("/tasks", {
      title,
      description: desc,
      date: selectedDay
    });

    setTitle("");
    setDesc("");
    setShowModal(false);
    loadTasks();
  };

  // ❌ DELETE
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  // 🔁 TOGGLE
  const toggleTask = async (id, completed) => {
    await api.put(`/tasks/${id}`, {
      completed: !completed
    });

    loadTasks();
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // 🧼 NORMALIZE
  const normalizeDate = (date) => {
    if (!date) return "";
    return typeof date === "string"
      ? date.split("T")[0]
      : formatDate(date);
  };

  // 🎯 FILTER
  const filteredTasks = tasks.filter(
    (t) => normalizeDate(t.date) === selectedDay
  );

  // 📅 WEEK
  const getWeekDays = () => {
    const days = [];
    const today = new Date();

    for (let i = -3; i <= 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const date = formatDate(d);

      days.push({
        date,
        day: d.toLocaleDateString("it-IT", { weekday: "short" }),
        num: d.getDate()
      });
    }

    return days;
  };

  // 🧾 LABEL
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

      {/* TOP BAR IOS */}
      <div className="topbar">

        <div className="top-left"></div>

        <div className="top-title">
          Task Manager
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>

      {/* CONTENT */}
      <div className="container">

        {/* CALENDAR */}
        <div className="ios-calendar">
          {getWeekDays().map((d) => {
            const hasTasks = tasks.some(
              (t) => normalizeDate(t.date) === d.date
            );

            return (
              <div
                key={d.date}
                className={`ios-day ${
                  selectedDay === d.date ? "active" : ""
                }`}
                onClick={() => setSelectedDay(d.date)}
              >
                <div className="weekday">
                  {d.day.charAt(0).toUpperCase() + d.day.slice(1)}
                </div>

                <div className="number">{d.num}</div>

                {hasTasks && <div className="dot" />}
              </div>
            );
          })}
        </div>

        {/* DAY INFO */}
        <h2 className="day-title">
          {formatDayLabel(selectedDay)}
        </h2>

        {filteredTasks.length === 0 ? (
          <p className="empty">Nessuna task per questo giorno</p>
        ) : (
          <p className="subinfo">
            {filteredTasks.length} task programmate
          </p>
        )}

        {/* ADD */}
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Nuova Task
        </button>

        {/* TASK LIST */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredTasks.map((task) => (
            <div className="card" key={task.id}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task.id, task.completed)
                  }
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

      {/* GLOBAL NAV */}
      <BottomNav />

      {/* MODAL */}
      {showModal && (
        <div className="modal-bg">
          <div className="modal">

            <input
              className="input"
              placeholder="Titolo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="input"
              placeholder="Descrizione"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button className="save" onClick={createTask}>
              Save
            </button>

            <button onClick={() => setShowModal(false)}>
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}