import apiService from './api';

class TeacherSubjectApiService {
  // Get all teacher-subject assignments
  async getTeacherSubjects() {
    return apiService.get('/teachersubject');
  }

  // Get teacher-subject assignments by school ID
  async getTeacherSubjectsBySchool(schoolId) {
    return apiService.get(`/teachersubject/school/${schoolId}`);
  }

  // Get teacher-subject assignment by ID
  async getTeacherSubjectById(id) {
    return apiService.get(`/teachersubject/${id}`);
  }

  // Create new teacher-subject assignment
  async createTeacherSubject(assignmentData) {
    return apiService.post('/teachersubject', assignmentData);
  }

  // Update teacher-subject assignment
  async updateTeacherSubject(id, assignmentData) {
    return apiService.put(`/teachersubject/${id}`, assignmentData);
  }

  // Delete teacher-subject assignment
  async deleteTeacherSubject(id) {
    return apiService.delete(`/teachersubject/${id}`);
  }

  // Get available teachers for assignment
  async getAvailableTeachers() {
    return apiService.get('/teacher');
  }

  // Get available subjects for assignment
  async getAvailableSubjects() {
    return apiService.get('/subject');
  }

  // Get available classes for assignment
  async getAvailableClasses() {
    return apiService.get('/class');
  }

  // Get assignments by teacher ID
  async getAssignmentsByTeacher(teacherId) {
    return apiService.get(`/teachersubject/teacher/${teacherId}`);
  }

  // Get assignments by subject ID
  async getAssignmentsBySubject(subjectId) {
    return apiService.get(`/teachersubject/subject/${subjectId}`);
  }

  // Get assignments by class ID
  async getAssignmentsByClass(classId) {
    return apiService.get(`/teachersubject/class/${classId}`);
  }
}

export default new TeacherSubjectApiService();
