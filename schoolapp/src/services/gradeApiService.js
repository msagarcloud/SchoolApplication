import apiService from './api';

class GradeApiService {
  // Get all grades
  async getGrades() {
    return apiService.get('/grade');
  }

  // Get grade by ID
  async getGradeById(id) {
    return apiService.get(`/grade/${id}`);
  }

  // Create new grade
  async createGrade(gradeData) {
    return apiService.post('/grade', gradeData);
  }

  // Update grade
  async updateGrade(id, gradeData) {
    return apiService.put(`/grade/${id}`, gradeData);
  }

  // Delete grade
  async deleteGrade(id) {
    return apiService.delete(`/grade/${id}`);
  }

  // Get students for grade selection
  async getStudents() {
    return apiService.get('/students');
  }

  // Get classes for grade selection
  async getClasses() {
    return apiService.get('/classes');
  }

  // Get subjects for grade selection
  async getSubjects() {
    return apiService.get('/subjects');
  }

  // Get grade performance history
  async getGradePerformanceHistory(studentId) {
    return apiService.get(`/grades/student/${studentId}/history`);
  }

  // Get class grade statistics
  async getClassGradeStatistics(classId) {
    return apiService.get(`/grades/class/${classId}/statistics`);
  }

  // Get subject grade statistics
  async getSubjectGradeStatistics(subjectId) {
    return apiService.get(`/grades/subject/${subjectId}/statistics`);
  }

  // Get student attendance
  async getStudentAttendance(studentId) {
    return apiService.get(`/students/${studentId}/attendance`);
  }

  // Export grades to PDF
  async exportGradesToPdf(filters = {}) {
    return apiService.download('/grades/export/pdf', 'grades-report.pdf');
  }

  // Export grades to Excel
  async exportGradesToExcel(filters = {}) {
    return apiService.download('/grades/export/excel', 'grades-report.xlsx');
  }
}

export default new GradeApiService();
