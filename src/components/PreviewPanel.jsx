import React from 'react';

export default function PreviewPanel({ output, setOutput }) {
  // Helper function to pick distinct neon coding text colors for log severity types
  const getLogColor = (type) => {
    if (type === 'error') return 'text-danger fw-bold'; // Red
    if (type === 'info') return 'text-info';           // Blue/Cyan
    if (type === 'success') return 'text-success';     // Green
    return 'text-muted';                               // Grey System Info
  };

  return (
    <div className="card bg-dark text-light border-secondary" style={{ height: '80vh' }}>
      {/* Panel Header */}
      <div className="card-header border-secondary d-flex align-items-center justify-content-between">
        <h6 className="mb-0 fw-bold">💻 Live Results / Output</h6>
        <button 
          className="btn btn-outline-secondary btn-sm style-none py-0 px-2 text-light"
          onClick={() => setOutput([])}
          style={{ fontSize: '11px' }}
        >
          Clear Console
        </button>
      </div>

      {/* Dynamic Terminal Script Output Board */}
      <div className="card-body bg-black font-monospace p-3 small overflow-auto d-flex flex-column gap-1">
        {output.length === 0 ? (
          <div className="text-secondary italic">&gt; Console is clean. Run your script to see results...</div>
        ) : (
          output.map((log, index) => (
            <div key={index} className={getLogColor(log.type)}>
              {log.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}