import React, { useState } from 'react';

export default function TeamSidebar({ isOpen, onClose }) {
  // 1. Move the team array into a dynamic state hook
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Muskan Ghouri', role: 'Frontend Lead', status: 'Active' },
    { name: 'Mehran Ahmed', role: 'Backend Engineer', status: 'Coding' },
    { name: 'Engr.Amir Aijaz', role: 'Supervisor', status: 'Coding' },
    { name: 'Technify AI', role: 'System Assistant', status: 'Idle' }
  ]);

  // States to hold the inputs for a new member
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Developer');

  // 2. Function to add a new member dynamically
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMember = {
      name: newName.trim(),
      role: newRole,
      status: 'Active' // New members join as active by default
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewName(''); // Clear the input field
  };

  if (!isOpen) return null;

  return (
    <div 
      className="bg-dark text-light border-end border-secondary position-fixed start-0 top-0 h-100 shadow-lg p-3 d-flex flex-column"
      style={{ width: '300px', zIndex: 1050, transition: 'all 0.3s ease' }}
    >
      {/* Sidebar Header */}
      <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom border-secondary">
        <h6 className="mb-0 fw-bold">👥 Collaboration Panel</h6>
        <button 
          type="button" 
          className="btn-close btn-close-white btn-sm shadow-none" 
          onClick={onClose}
        ></button>
      </div>

      {/* Project Metadata */}
      <div className="mb-3">
        <span className="text-secondary uppercase small fw-semibold d-block mb-1">Project Repository</span>
        <div className="p-2 bg-black bg-opacity-40 rounded border border-secondary small font-monospace text-info text-start">
          git: technify-workspace
        </div>
      </div>

      {/* --- NEW: Interactive Add Member Form --- */}
      <div className="mb-4 p-2 bg-black bg-opacity-20 rounded border border-secondary">
        <span className="text-secondary small fw-semibold d-block mb-2 text-start">➕ Invite Collaborator</span>
        <form onSubmit={handleAddMember} className="d-flex flex-column gap-2">
          <input 
            type="text" 
            className="form-control form-control-sm bg-secondary text-white border-0" 
            placeholder="Enter collaborator name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <select 
            className="form-select form-select-sm bg-secondary text-white border-0"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="Developer">Developer</option>
            <option value="Backend Engineer">Backend Engineer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="QA Tester">QA Tester</option>
          </select>
          <button type="submit" className="btn btn-sm btn-info text-dark fw-bold w-100">
            Add to Session
          </button>
        </form>
      </div>

      {/* Active Team Member Feed List */}
      <div className="flex-grow-1 overflow-auto">
        <span className="text-secondary small fw-semibold d-block mb-2 text-start">Active Collaborators</span>
        <div className="d-flex flex-column gap-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="d-flex align-items-center justify-content-between p-2 rounded bg-secondary bg-opacity-20">
              <div className="d-flex align-items-center gap-2">
                {/* Dynamically computes initials from whatever name is typed! */}
                <div className="bg-info text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold text-center" style={{ width: '32px', height: '32px', fontSize: '11px', minWidth: '32px' }}>
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                </div>
                <div className="text-start">
                  <div className="small fw-semibold text-white text-truncate" style={{ maxWidth: '140px' }}>{member.name}</div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>{member.role}</div>
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="d-flex align-items-center gap-1">
                <span className={`spinner-grow spinner-grow-sm text-success ${member.status !== 'Idle' ? '' : 'd-none'}`} role="status" style={{ width: '6px', height: '6px' }}></span>
                <span className="badge bg-dark border border-secondary text-muted px-1" style={{ fontSize: '9px' }}>
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-2 mt-2 text-center text-muted border-top border-secondary" style={{ fontSize: '11px' }}>
        Session Active • State Array Controlled
      </div>
    </div>
  );
}