// Mock data for development when backend is not available

export const mockClasses = [
  {
    id: '743a0cbc-ea9d-4e75-87cf-422b2e096f35',
    className: 'Grade 10 - A',
    classCode: 'G10A',
    description: 'Grade 10 class for advanced students focusing on mathematics and science',
    capacity: 30,
    gradeLevel: 'Grade 10',
    teacherName: 'John Smith',
    isActive: true,
    createdDate: '2024-01-15T10:30:00Z',
    modifiedDate: '2024-03-10T14:20:00Z'
  },
  {
    id: '8b5d2f1a-3c4e-4f8a-9b2e-7d6a9c1e3d4b',
    className: 'Grade 9 - B',
    classCode: 'G9B',
    description: 'Grade 9 class for intermediate level students',
    capacity: 25,
    gradeLevel: 'Grade 9',
    teacherName: 'Sarah Johnson',
    isActive: true,
    createdDate: '2024-01-20T09:15:00Z',
    modifiedDate: '2024-03-05T11:45:00Z'
  },
  {
    id: '9c6e3g2b-4d5f-5g9b-0c3f-8e7b0d2f4e5c',
    className: 'Grade 11 - A',
    classCode: 'G11A',
    description: 'Grade 11 class for senior students preparing for college',
    capacity: 28,
    gradeLevel: 'Grade 11',
    teacherName: 'Michael Brown',
    isActive: true,
    createdDate: '2024-02-01T13:00:00Z',
    modifiedDate: '2024-03-15T16:30:00Z'
  }
];

export const mockStudents = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Williams',
    email: 'alice.williams@school.com',
    grade: 'Grade 10 - A',
    enrollmentDate: '2024-01-15'
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@school.com',
    grade: 'Grade 9 - B',
    enrollmentDate: '2024-01-20'
  }
];

export const mockTeachers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@school.com',
    subject: 'Mathematics',
    experience: '10 years'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@school.com',
    subject: 'Science',
    experience: '8 years'
  }
];
