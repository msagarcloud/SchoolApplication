import apiService from './api';

class TeacherApiService {
  // Get all teachers
  async getTeachers() {
    return apiService.get('/teachers');
  }

  // Get teacher by ID
  async getTeacherById(id) {
    return apiService.get(`/teachers/${id}`);
  }

  // Create new teacher
  async createTeacher(teacherData) {
    return apiService.post('/teachers', teacherData);
  }

  // Update teacher
  async updateTeacher(id, teacherData) {
    return apiService.put(`/teachers/${id}`, teacherData);
  }

  // Delete teacher
  async deleteTeacher(id) {
    return apiService.delete(`/teachers/${id}`);
  }

  // Get available classes for assignment
  async getAvailableClasses() {
    return apiService.get('/classes');
  }

  // Get teacher schedule
  async getTeacherSchedule(teacherId) {
    return apiService.get(`/teachers/${teacherId}/schedule`);
  }

  // Get teacher performance metrics
  async getTeacherPerformance(teacherId) {
    return apiService.get(`/teachers/${teacherId}/performance`);
  }

  // Get teacher achievements
  async getTeacherAchievements(teacherId) {
    return apiService.get(`/teachers/${teacherId}/achievements`);
  }

  // Update teacher class assignments
  async updateClassAssignments(teacherId, classIds) {
    return apiService.put(`/teachers/${teacherId}/classes`, { classIds });
  }
}

export default new TeacherApiService();
