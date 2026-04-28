"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderKanban, BookOpen, Image as ImageIcon,
  LogOut, Plus, Edit2, Trash2, Lock, User, Eye, EyeOff,
  CheckCircle2, AlertCircle
} from "lucide-react";

// ─── Types ───────────────────────────────────────────
type Tab = "dashboard" | "projects" | "blog" | "gallery";

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  tech: string;
  status: "live" | "draft";
}

interface BlogItem {
  id: number;
  title: string;
  category: string;
  date: string;
}

interface GalleryItem {
  id: number;
  title: string;
  type: "photo" | "video";
  category: string;
}

// ─── Mock Data ────────────────────────────────────────
const initialProjects: ProjectItem[] = [
  { id: 1, title: "E-Commerce Platform", category: "Fullstack", tech: "React, Node, MongoDB", status: "live" },
  { id: 2, title: "Task Management App", category: "Frontend", tech: "React, Socket.io", status: "live" },
  { id: 3, title: "Blog REST API", category: "Backend", tech: "Node.js, Express", status: "draft" },
];

const initialBlog: BlogItem[] = [
  { id: 1, title: "My Journey as a MERN Developer", category: "Development", date: "Mar 15, 2024" },
  { id: 2, title: "Photography Tips for Beginners", category: "Photography", date: "Feb 28, 2024" },
];

const initialGallery: GalleryItem[] = [
  { id: 1, title: "Golden Hour Portrait", type: "photo", category: "Photography" },
  { id: 2, title: "Short Film Teaser", type: "video", category: "Cinematography" },
];

// ─── Admin Page ───────────────────────────────────────
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [blog, setBlog] = useState<BlogItem[]>(initialBlog);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);

  // Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "nithish2024") {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Try admin / nithish2024");
    }
  };

  // Login screen
  if (!loggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-primary)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="glass-card p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(0,217,255,0.1)", border: "1px solid rgba(0,217,255,0.2)" }}
              >
                <Lock size={24} style={{ color: "var(--accent-cyan)" }} />
              </div>
              <h1 className="text-xl font-black text-white">Admin Panel</h1>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Portfolio Management System
              </p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl mb-4 text-xs"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}
                >
                  <AlertCircle size={13} />
                  {loginError}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Username
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData((d) => ({ ...d, username: e.target.value }))}
                    placeholder="admin"
                    className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
                    id="admin-username"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-secondary)" }}>
                  Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData((d) => ({ ...d, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
                    id="admin-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-2" id="admin-login-btn">
                <Lock size={14} />
                Login
              </button>
            </form>

            <p className="text-center text-xs mt-5" style={{ color: "var(--text-muted)" }}>
              Demo: <span style={{ color: "var(--accent-cyan)" }}>admin</span> / <span style={{ color: "var(--accent-cyan)" }}>nithish2024</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Dashboard ─────────────────────────────────────
  const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "projects", icon: FolderKanban, label: "Projects" },
    { id: "blog", icon: BookOpen, label: "Blog" },
    { id: "gallery", icon: ImageIcon, label: "Gallery" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex flex-col p-4 gap-2"
        style={{ background: "var(--bg-secondary)", borderRight: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="px-2 py-4 mb-4">
          <div className="text-lg font-black gradient-text-cyan">NK Admin</div>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Portfolio CMS</p>
        </div>

        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
            style={{
              background: activeTab === id ? "rgba(0,217,255,0.1)" : "transparent",
              color: activeTab === id ? "var(--accent-cyan)" : "rgba(255,255,255,0.5)",
              border: activeTab === id ? "1px solid rgba(0,217,255,0.15)" : "1px solid transparent",
            }}
            id={`admin-tab-${id}`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}

        <button
          onClick={() => setLoggedIn(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mt-auto transition-colors duration-200"
          style={{ color: "rgba(239,68,68,0.7)" }}
          id="admin-logout"
        >
          <LogOut size={15} />
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* ── Dashboard ── */}
            {activeTab === "dashboard" && (
              <div>
                <h1 className="text-2xl font-black text-white mb-1">Dashboard</h1>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>Welcome back, Nithishkumar</p>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Projects", value: projects.length, icon: FolderKanban, color: "var(--accent-cyan)" },
                    { label: "Blog Posts", value: blog.length, icon: BookOpen, color: "var(--accent-purple)" },
                    { label: "Gallery Items", value: gallery.length, icon: ImageIcon, color: "var(--accent-gold)" },
                    { label: "Live Projects", value: projects.filter((p) => p.status === "live").length, icon: CheckCircle2, color: "#22c55e" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-card p-5"
                      style={{ border: `1px solid ${stat.color}18` }}
                    >
                      <stat.icon size={20} style={{ color: stat.color }} className="mb-3" />
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-5">
                  <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { action: () => setActiveTab("projects"), label: "+ Add Project", color: "var(--accent-cyan)" },
                      { action: () => setActiveTab("blog"), label: "+ New Post", color: "var(--accent-purple)" },
                      { action: () => setActiveTab("gallery"), label: "+ Upload Media", color: "var(--accent-gold)" },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={btn.action}
                        className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
                        style={{ background: `${btn.color}15`, color: btn.color, border: `1px solid ${btn.color}25` }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Projects ── */}
            {activeTab === "projects" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-white">Projects</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage your portfolio projects</p>
                  </div>
                  <button
                    className="btn-primary flex items-center gap-2 text-sm"
                    style={{ padding: "10px 20px" }}
                    onClick={() => setProjects((p) => [
                      { id: Date.now(), title: "New Project", category: "Frontend", tech: "React", status: "draft" },
                      ...p
                    ])}
                    id="admin-add-project"
                  >
                    <Plus size={14} />
                    Add Project
                  </button>
                </div>

                <div className="space-y-3">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass-card p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-2 h-2 rounded-full ${project.status === "live" ? "bg-green-500" : "bg-yellow-500"}`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-white">{project.title}</p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            {project.category} · {project.tech}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${project.status === "live" ? "text-green-400" : "text-yellow-400"}`}
                          style={{ background: project.status === "live" ? "rgba(34,197,94,0.1)" : "rgba(234,179,8,0.1)" }}
                        >
                          {project.status}
                        </span>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors" title="Edit">
                          <Edit2 size={12} style={{ color: "var(--accent-cyan)" }} />
                        </button>
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
                          onClick={() => setProjects((p) => p.filter((pr) => pr.id !== project.id))}
                          title="Delete"
                        >
                          <Trash2 size={12} style={{ color: "#f87171" }} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Blog ── */}
            {activeTab === "blog" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-white">Blog Posts</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage your articles</p>
                  </div>
                  <button
                    className="btn-primary flex items-center gap-2 text-sm"
                    style={{ padding: "10px 20px" }}
                    onClick={() => setBlog((b) => [
                      { id: Date.now(), title: "New Post", category: "General", date: "Apr 3, 2024" },
                      ...b
                    ])}
                    id="admin-add-blog"
                  >
                    <Plus size={14} />
                    New Post
                  </button>
                </div>

                <div className="space-y-3">
                  {blog.map((post) => (
                    <motion.div
                      key={post.id}
                      layout
                      className="glass-card p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{post.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {post.category} · {post.date}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5">
                          <Edit2 size={12} style={{ color: "var(--accent-cyan)" }} />
                        </button>
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5"
                          onClick={() => setBlog((b) => b.filter((p) => p.id !== post.id))}
                        >
                          <Trash2 size={12} style={{ color: "#f87171" }} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Gallery ── */}
            {activeTab === "gallery" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-white">Gallery</h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Manage photos &amp; videos</p>
                  </div>
                  <button
                    className="btn-primary flex items-center gap-2 text-sm"
                    style={{ padding: "10px 20px" }}
                    onClick={() => setGallery((g) => [
                      { id: Date.now(), title: "New Media", type: "photo", category: "Photography" },
                      ...g
                    ])}
                    id="admin-add-gallery"
                  >
                    <Plus size={14} />
                    Upload
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gallery.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="glass-card p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.type === "photo" ? "📸" : "🎬"}</span>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5">
                          <Edit2 size={12} style={{ color: "var(--accent-cyan)" }} />
                        </button>
                        <button
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5"
                          onClick={() => setGallery((g) => g.filter((gi) => gi.id !== item.id))}
                        >
                          <Trash2 size={12} style={{ color: "#f87171" }} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
