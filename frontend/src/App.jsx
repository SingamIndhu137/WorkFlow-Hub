import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  CalendarDays,
  BarChart3,
  Bell,
  Search,
  Plus,
  Clock3,
  CheckCircle2,
  Circle,
} from "lucide-react";
import "./index.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from FastAPI backend
  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log("Tasks from backend:", data);
        setTasks(data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Projects", icon: FolderKanban },
    { name: "Tasks", icon: CheckSquare },
    { name: "Team", icon: Users },
    { name: "Calendar", icon: CalendarDays },
    { name: "Reports", icon: BarChart3 },
  ];

  const projects = [
    {
      name: "Website Redesign",
      team: "Design Team",
      progress: 75,
      status: "In Progress",
    },
    {
      name: "Mobile Application",
      team: "Development Team",
      progress: 52,
      status: "In Progress",
    },
    {
      name: "Cloud Migration",
      team: "DevOps Team",
      progress: 90,
      status: "Almost Done",
    },
  ];

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">W</div>

          <div>
            <h2>WorkFlow</h2>
            <span>Hub</span>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`menu-item ${
                  activeMenu === item.name ? "active" : ""
                }`}
                onClick={() => setActiveMenu(item.name)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-box">
            <div className="help-icon">?</div>

            <div>
              <strong>Need help?</strong>
              <p>Contact support</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Header */}
        <header className="header">
          <div className="search-box">
            <Search size={19} />
            <input placeholder="Search anything..." />
          </div>

          <div className="header-right">
            <button className="icon-button">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>

            <div className="profile">
              <div className="avatar">I</div>

              <div>
                <strong>Indhu</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="content">
          {/* Welcome */}
          <div className="welcome">
            <div>
              <p className="small-text">
                Thursday, October 8, 2026
              </p>

              <h1>Good Morning, Indhu 👋</h1>

              <p className="subtitle">
                Here's what's happening with your projects today.
              </p>
            </div>

            <button className="primary-button">
              <Plus size={18} />
              New Project
            </button>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <CheckSquare size={22} />
              </div>

              <div>
                <p>Total Tasks</p>
                <h2>{tasks.length}</h2>
                <span className="positive">
                  ↑ Tasks from database
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <p>Completed</p>
                <h2>
                  {tasks.filter((task) => task.completed).length}
                </h2>

                <span className="positive">
                  ↑ Completed tasks
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <Clock3 size={22} />
              </div>

              <div>
                <p>In Progress</p>

                <h2>
                  {tasks.filter((task) => !task.completed).length}
                </h2>

                <span className="neutral">
                  Active tasks
                </span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon purple">
                <Users size={22} />
              </div>

              <div>
                <p>Team Members</p>
                <h2>16</h2>

                <span className="positive">
                  +2 this month
                </span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="section-header">
            <div>
              <h2>Recent Projects</h2>

              <p>
                Track progress across your active projects.
              </p>
            </div>

            <button className="view-button">
              View All
            </button>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div
                className="project-card"
                key={project.name}
              >
                <div className="project-top">
                  <div className="project-symbol">
                    <FolderKanban size={21} />
                  </div>

                  <span className="project-status">
                    {project.status}
                  </span>
                </div>

                <h3>{project.name}</h3>

                <p>{project.team}</p>

                <div className="progress-info">
                  <span>Progress</span>
                  <strong>
                    {project.progress}%
                  </strong>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="bottom-grid">
            {/* Today's Tasks */}
            <div className="panel">
              <div className="section-header">
                <div>
                  <h2>Today's Tasks</h2>

                  <p>
                    Tasks loaded from PostgreSQL.
                  </p>
                </div>
              </div>

              {tasks.length === 0 ? (
                <div className="task">
                  <Circle size={18} />

                  <div>
                    <strong>
                      No tasks found
                    </strong>

                    <span>
                      Create a task using Swagger
                    </span>
                  </div>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    className={`task ${
                      task.completed
                        ? "completed-task"
                        : ""
                    }`}
                    key={task.id}
                  >
                    {task.completed ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Circle size={18} />
                    )}

                    <div>
                      <strong>
                        {task.title}
                      </strong>

                      <span>
                        {task.description ||
                          "No description"}
                      </span>
                    </div>

                    <span className="task-time">
                      {task.completed
                        ? "Completed"
                        : "Active"}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Recent Activity */}
            <div className="panel activity-panel">
              <div className="section-header">
                <div>
                  <h2>Recent Activity</h2>

                  <p>
                    Latest project updates.
                  </p>
                </div>
              </div>

              <div className="activity">
                <div className="activity-avatar">
                  RK
                </div>

                <div>
                  <strong>
                    Rahul updated a task
                  </strong>

                  <span>
                    5 minutes ago
                  </span>
                </div>
              </div>

              <div className="activity">
                <div className="activity-avatar">
                  AS
                </div>

                <div>
                  <strong>
                    Anu completed a project task
                  </strong>

                  <span>
                    25 minutes ago
                  </span>
                </div>
              </div>

              <div className="activity">
                <div className="activity-avatar">
                  VK
                </div>

                <div>
                  <strong>
                    Vikram joined the team
                  </strong>

                  <span>
                    1 hour ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;