import React, { useState } from 'react';

export default function KanbanBoard({ isDarkMode, activeTab, setActiveTab }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Integrate Security Logs', description: 'Build module 12 audit history view', status: 'todo' },
    { id: 2, title: 'Analytics Dashboard', description: 'Create visual charts for project metrics', status: 'in-progress' },
    { id: 3, title: 'Git & Deployment Center', description: 'Sync repository commits and live links (by Mehran)', status: 'done' }
  ]);

  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo' });

  // 🚀 FORCE AUTO-DETECTION: Checks the prop, fallback class names, or bootstrap attributes
  const checkIsDark = 
    isDarkMode === true || 
    document.body.classList.contains('dark') || 
    document.body.getAttribute('data-bs-theme') === 'dark' ||
    document.documentElement.getAttribute('data-bs-theme') === 'dark';

  // Strict layout styling variables derived from theme check
  const boardBg = checkIsDark ? 'bg-dark text-light border-secondary' : 'bg-light text-dark border-secondary-subtle';
  const cardBg = checkIsDark ? '#212529' : '#ffffff';
  const textClass = checkIsDark ? 'text-light' : 'text-dark';
  const inputBg = checkIsDark ? '#1a1d20' : '#ffffff';
  const columnBg = checkIsDark ? '#1f2327' : '#f1f3f5';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const taskToAdd = { ...newTask, id: Date.now() };
    setTasks((prev) => [...prev, taskToAdd]);
    setNewTask({ title: '', description: '', status: 'todo' });
  };

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

 return (
    <div className={`container-fluid p-4 rounded mb-5 ${boardBg}`} style={{ minHeight: '80vh' }}>
      
      {/* Restored Clean Original Title */}
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4 border-secondary">
        <h2 className="fw-bold text-info mb-0 d-flex align-items-center gap-2">
          <i className="bi bi-kanban"></i> Project Management
        </h2>
      </div>


 {/* Add Task Form Wrapper */}
      <div className="card p-3 mb-4 shadow-sm border border-info-subtle" style={{ backgroundColor: cardBg, color: isDarkMode ? '#f8f9fa' : '#212529' }}>
        <h5 className="mb-3 fw-semibold">Add New Task</h5>
        <form onSubmit={handleAddTask} className="row g-3">
          
          {/* 1. Task Title Input */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control border-secondary fw-semibold"
              placeholder={isDarkMode ? "" : "Task Title"}
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              required
              style={{
                color: isDarkMode ? '#ffffff' : '#212529',
                backgroundColor: isDarkMode ? '#1a1d20' : '#ffffff',
                backgroundImage: isDarkMode && !newTask.title ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='30'><text x='10' y='20' fill='rgba(255,255,255,0.5)' font-family='sans-serif' font-size='14' font-weight='600'>Task Title</text></svg>")` : 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center'
              }}
            />
          </div>

          {/* 2. Task Description Input */}
          <div className="col-md-5">
            <input
              type="text"
              className="form-control border-secondary fw-semibold"
              placeholder={isDarkMode ? "" : "Task Description"}
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              style={{
                color: isDarkMode ? '#ffffff' : '#212529',
                backgroundColor: isDarkMode ? '#1a1d20' : '#ffffff',
                backgroundImage: isDarkMode && !newTask.description ? `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='30'><text x='10' y='20' fill='rgba(255,255,255,0.5)' font-family='sans-serif' font-size='14' font-weight='600'>Task Description</text></svg>")` : 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'left center'
              }}
            />
          </div>

          {/* 3. Status Dropdown Select */}
          <div className="col-md-2">
            <select
              className="form-select border-secondary fw-semibold"
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              style={{
                color: isDarkMode ? '#ffffff' : '#212529',
                backgroundColor: isDarkMode ? '#1a1d20' : '#ffffff'
              }}
            >
              <option value="todo" style={{ backgroundColor: isDarkMode ? '#1a1d20' : '#ffffff', color: isDarkMode ? '#ffffff' : '#212529' }}>To Do</option>
              <option value="in-progress" style={{ backgroundColor: isDarkMode ? '#1a1d20' : '#ffffff', color: isDarkMode ? '#ffffff' : '#212529' }}>In Progress</option>
              <option value="done" style={{ backgroundColor: isDarkMode ? '#1a1d20' : '#ffffff', color: isDarkMode ? '#ffffff' : '#212529' }}>Done</option>
            </select>
          </div>

          {/* Add Button */}
          <div className="col-md-1">
            <button type="submit" className="btn btn-info w-100 fw-bold text-dark shadow-sm">+</button>
          </div>

        </form>
      </div>
      {/* Kanban Columns Grid */}
      <div className="row g-4">
        {/* TO DO COLUMN */}
        <div className="col-md-4">
          <div className="p-3 rounded h-100 border border-secondary-subtle shadow-sm" style={{ backgroundColor: columnBg }}>
            <h5 className="mb-3 text-warning fw-bold">📝 To Do ({todoTasks.length})</h5>
            <div className="d-flex flex-column gap-2">
              {todoTasks.map((task) => (
                <div key={task.id} className="card p-3 border border-secondary-subtle shadow-sm" style={{ backgroundColor: cardBg, color: checkIsDark ? '#f8f9fa' : '#212529' }}>
                  <h6 className="fw-bold text-info">{task.title}</h6>
                  <p className="small mb-2 opacity-75">{task.description}</p>
                  <div className="d-flex justify-content-between mt-2">
                    <button className="btn btn-sm btn-outline-primary fw-semibold" onClick={() => moveTask(task.id, 'in-progress')}>
                      Start →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* IN PROGRESS COLUMN */}
        <div className="col-md-4">
          <div className="p-3 rounded h-100 border border-primary-subtle shadow-sm" style={{ backgroundColor: columnBg }}>
            <h5 className="mb-3 text-primary fw-bold">⏳ In Progress ({inProgressTasks.length})</h5>
            <div className="d-flex flex-column gap-2">
              {inProgressTasks.map((task) => (
                <div key={task.id} className="card p-3 border border-primary shadow-sm" style={{ backgroundColor: cardBg, color: checkIsDark ? '#f8f9fa' : '#212529' }}>
                  <h6 className="fw-bold text-info">{task.title}</h6>
                  <p className="small mb-2 opacity-75">{task.description}</p>
                  <div className="d-flex justify-content-between mt-2">
                    <button className="btn btn-sm btn-outline-warning fw-semibold" onClick={() => moveTask(task.id, 'todo')}>
                      ← Backlog
                    </button>
                    <button className="btn btn-sm btn-success fw-bold text-white shadow-sm" onClick={() => moveTask(task.id, 'done')}>
                      Complete ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DONE COLUMN */}
        <div className="col-md-4">
          <div className="p-3 rounded h-100 border border-success-subtle shadow-sm" style={{ backgroundColor: columnBg }}>
            <h5 className="mb-3 text-success fw-bold">🎉 Done ({doneTasks.length})</h5>
            <div className="d-flex flex-column gap-2">
              {doneTasks.map((task) => (
                <div key={task.id} className="card p-3 border border-success shadow-sm opacity-75" style={{ backgroundColor: cardBg, color: checkIsDark ? '#f8f9fa' : '#212529' }}>
                  <h6 className="fw-bold text-success text-decoration-line-through">{task.title}</h6>
                  <p className="small mb-2 opacity-50">{task.description}</p>
                  <div className="d-flex justify-content-between mt-2">
                    <button className="btn btn-sm btn-primary fw-bold text-white shadow-sm" onClick={() => moveTask(task.id, 'in-progress')}>
                      Re-open
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}