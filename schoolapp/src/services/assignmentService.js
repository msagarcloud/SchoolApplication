import apiService from './api';

class AssignmentService {
  // Get all assignments
  async getAssignments() {
    return apiService.get('/assignments');
  }

  // Get assignment by ID
  async getAssignmentById(id) {
    return apiService.get(`/assignments/${id}`);
  }

  // Create new assignment
  async createAssignment(assignmentData) {
    return apiService.post('/assignments', assignmentData);
  }

  // Update assignment
  async updateAssignment(id, assignmentData) {
    return apiService.put(`/assignments/${id}`, assignmentData);
  }

  // Delete assignment
  async deleteAssignment(id) {
    return apiService.delete(`/assignments/${id}`);
  }

  // Get classes for assignment selection
  async getClasses() {
    return apiService.get('/classes');
  }

  // Get subjects for assignment selection
  async getSubjects() {
    return apiService.get('/subjects');
  }

  // Get teachers for assignment selection
  async getTeachers() {
    return apiService.get('/teachers');
  }

  // Get assignment submissions
  async getAssignmentSubmissions(assignmentId) {
    return apiService.get(`/assignments/${assignmentId}/submissions`);
  }

  // Grade assignment submission
  async gradeSubmission(submissionId, gradeData) {
    return apiService.post(`/submissions/${submissionId}/grade`, gradeData);
  }

  // Send assignment reminder
  async sendReminder(assignmentId) {
    return apiService.post(`/assignments/${assignmentId}/reminder`);
  }

  // Download all submissions
  async downloadAllSubmissions(assignmentId) {
    return apiService.download(`/assignments/${assignmentId}/download-all`, `submissions-${assignmentId}.zip`);
  }

  // Get assignment statistics
  async getAssignmentStatistics(assignmentId) {
    return apiService.get(`/assignments/${assignmentId}/statistics`);
  }

  // Publish assignment
  async publishAssignment(id) {
    return apiService.post(`/assignments/${id}/publish`);
  }

  // Unpublish assignment
  async unpublishAssignment(id) {
    return apiService.post(`/assignments/${id}/unpublish`);
  }

  // Get student assignments
  async getStudentAssignments(studentId) {
    return apiService.get(`/students/${studentId}/assignments`);
  }

  // Submit assignment
  async submitAssignment(submissionData, onProgress) {
    const formData = new FormData();
    
    // Add form fields
    Object.keys(submissionData).forEach(key => {
      if (key !== 'file') {
        formData.append(key, submissionData[key]);
      }
    });

    // Add file if present
    if (submissionData.file) {
      formData.append('file', submissionData.file);
    }

    return apiService.upload('/submissions', formData, onProgress);
  }
}

export default new AssignmentService();
