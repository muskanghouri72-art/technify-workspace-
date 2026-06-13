import React from 'react';
import Editor from '@monaco-editor/react';

export default function EditorPanel({ code, setCode, onRun, isRunning, isDarkMode }) {
  return (
    <div 
      className={isDarkMode ? "card bg-dark text-light border-secondary" : "card bg-white text-dark border-secondary"} 
      style={{ height: '80vh' }}
    >
      {/* Card Header with Interactive Run Button */}
      <div className={isDarkMode ? "card-header border-secondary d-flex align-items-center justify-content-between py-2 bg-dark" : "card-header border-secondary d-flex align-items-center justify-content-between py-2 bg-light"}>
        <div className="d-flex align-items-center">
          <h6 className="mb-0 fw-bold">📝 Code Editor (index.js)</h6>
        </div>
        
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-secondary small">JavaScript</span>
          <button
            className={`btn btn-sm ${isRunning ? 'btn-warning' : 'btn-success'} fw-bold px-3 d-flex align-items-center gap-1`}
            onClick={onRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Running...
              </>
            ) : (
              <>
                <i className="bi bi-play-fill"></i> Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Embedded Code Editor Window */}
      <div className="card-body p-0">
        <Editor
          height="100%"
          theme={isDarkMode ? "vs-dark" : "light"}
          defaultLanguage="javascript"
          value={code}
          onChange={(newValue) => setCode(newValue || '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}