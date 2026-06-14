import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import EditorPanel from './EditorPanel';
import PreviewPanel from './PreviewPanel';
import TeamSidebar from './TeamSidebar';
import technifyLogo from '../assets/technify logo.jpeg';
import KanbanBoard from "./KanbanBoard";
import TeamChat from './TeamChat';

export default function Workspace({ onLogout, isDarkMode, onToggleTheme, activeTab, setActiveTab }) {
  // 1. Initial code structure template
  const initialCode = `// Welcome to Technify Workspace\n\nfunction greet() {\n  console.log("Hello, World!");\n}\n\ngreet();`;

  // 2. Setup shared states for editor content and terminal output
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState([
    { type: 'system', text: '> Technify Engine initialized successfully...' },
    { type: 'success', text: '> Hello, World!' }
  ]);
  const [isRunning, setIsRunning] = useState(false);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // 3. Function to handle compiling/running the code locally
  const handleRunCode = () => {
    setIsRunning(true);
    
    // Add a compiling log to the terminal terminal array
    setOutput((prev) => [...prev, { type: 'system', text: '> Compiling script build...' }]);

    // Simulate execution time (800ms delay)
    setTimeout(() => {
      setIsRunning(false);
      
      // Basic client-side safe parser to see if user changed the greeting console output text
      if (code.includes('console.log(')) {
        // Find what text is inside console.log("...")
        const matches = code.match(/console\.log\s*\(\s*["'`](.*?)["'`]\s*\)/);
        const extractedText = matches ? matches[1] : 'Script executed with blank return.';
        
        setOutput((prev) => [
          ...prev,
          { type: 'info', text: `> Running: index.js [${new Date().toLocaleTimeString()}]` },
          { type: 'success', text: `> ${extractedText}` }
        ]);
      } else {
        setOutput((prev) => [
          ...prev,
          { type: 'error', text: '> Error: No console.log function found to output results!' }
        ]);
      }
    }, 800);
  };

return (
    <div className="bg-black min-vh-100 p-3 text-white" style={{ width: '100vw', overflowX: 'hidden' }}>
      
      {/* Left Collapsible Collaboration Sidebar Drawer */}
      <TeamSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

     {/* Top Bar Navigation */}
      <header className="d-flex justify-content-between align-items-center pb-2 mb-3 border-bottom border-secondary">
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-sm btn-info text-dark fw-bold px-3 py-1"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ fontSize: '12px' }}
          >
            ☰ Manage Team
          </button>
        <div className="d-flex align-items-center gap-2">
  <img 
    src={technifyLogo} /* Notice the curly braces here, no quotes! */
    alt="Technify Logo" 
    className="rounded-circle shadow"
    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
  />
  <h5 className={`${isDarkMode ? 'text-white' : 'text-dark'} mb-0 fw-bold`}>
    Technify <span className="text-info">Workspace</span>
  </h5>
</div>
        </div>
        <div className="d-flex align-items-center gap-2">
          {/* ☀️ THEME TOGGLE BUTTON 🌙 */}
          <button 
            className={`btn btn-sm py-1 px-2 fw-semibold ${isDarkMode ? 'btn-outline-warning' : 'btn-outline-primary'}`}
            onClick={onToggleTheme}
            style={{ fontSize: '12px' }}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          
          <div className="text-secondary small ms-2">Status: <span className="text-success">● Connected</span></div>
          <button 
            className="btn btn-sm btn-outline-danger py-1 px-2 fw-semibold"
            onClick={onLogout}
            style={{ fontSize: '12px' }}
          >
            Log Out
          </button>
        </div>
      </header>

{/* Main 3 Panels Grid Structure */}
  <div className="row g-3">
    {/* Window 1: Chatbot Panel */}
    <div className="col-lg-3 col-md-4 animate-fade-in-up delay-1">
      <ChatPanel isDarkMode={isDarkMode} />
    </div>

    {/* Window 2: Monaco Code Editor Panel */}
    <div className="col-lg-5 col-md-8 animate-fade-in-up delay-2">
      <EditorPanel
        code={code}
        setCode={setCode}
        onRun={handleRunCode}
        isRunning={isRunning}
        isDarkMode={isDarkMode}
      />
    </div>

    {/* Window 3: Results Panel */}
    <div className="col-lg-4 col-md-12 animate-fade-in-up delay-3">
      <PreviewPanel output={output} setOutput={setOutput} isDarkMode={isDarkMode} />
    </div> {/* Closes Window 3 */}
  </div> {/* Closes row g-3 */}

 {/* ========================================== */}
      {/* 🔄 CENTRAL DASHBOARD VIEW SWITCHER SWITCH  */}
      {/* ========================================== */}
      <div className="mt-5 border-bottom pb-2 mb-4 d-flex gap-4 border-secondary">
        <button 
          type="button"
          className={`btn fw-bold border-0 p-0 position-relative ${activeTab !== 'chat' ? 'text-info' : 'text-secondary'}`}
          onClick={() => setActiveTab('board')}
          style={{ fontSize: '1.4rem', background: 'none' }}
        >
          <i className="bi bi-grid-3x3-gap-fill me-2"></i>Project Board
          {activeTab !== 'chat' && (
            <div className="position-absolute bottom-0 start-0 w-100 bg-info" style={{ height: '3px', marginBottom: '-10px' }}></div>
          )}
        </button>

        <button 
          type="button"
          className={`btn fw-bold border-0 p-0 position-relative ${activeTab === 'chat' ? 'text-info' : 'text-secondary'}`}
          onClick={() => setActiveTab('chat')}
          style={{ fontSize: '1.4rem', background: 'none' }}
        >
          <i className="bi bi-chat-left-text-fill me-2"></i>Team Chat Channel
          {activeTab === 'chat' && (
            <div className="position-absolute bottom-0 start-0 w-100 bg-info" style={{ height: '3px', marginBottom: '-10px' }}></div>
          )}
        </button>
      </div>

      {/* 🚀 COMPONENT DISPLAY CONTAINER */}
      {activeTab === 'chat' ? (
        <div className="mt-2 animate-fade-in">
          <TeamChat isDarkMode={isDarkMode} />
        </div>
      ) : (
        <div className="mt-2 animate-fade-in">
          <KanbanBoard 
            isDarkMode={isDarkMode} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>
      )}

    </div> // Main workspace container end tag
  );
}