import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProtectedRoute from './components/ProtectedRoute';
import MainTemplate from './components/layout/MainTemplate';
import { authService } from './services/authService';
import { authServiceOptimized } from './services/authServiceOptimized';
import { sessionService } from './services/sessionService';
import {
  Login,
  Dashboard,
  HomePage,
  CompanyList,
  CompanyForm,
  CompanyDetail,
  DesignationList,
  DesignationForm,
  DesignationDetail,
  HolidayList,
  HolidayForm,
  HolidayDetail,
  SystemParameterList,
  SystemParameterForm,
  SystemParameterDetail,
  SchoolList,
  SchoolForm,
  SchoolDetail,
  BloodGroupList,
  BloodGroupForm,
  BloodGroupDetail,
  CategoryList,
  CategoryForm,
  CategoryDetail,
  ItemTypeList,
  ItemTypeForm,
  ItemTypeDetail,
  ItemList,
  ItemForm,
  ItemDetail,
  ItemLocationList,
  ItemLocationForm,
  ItemLocationDetail,
  CountryList,
  CountryForm,
  CountryDetail,
  StateList,
  StateForm,
  StateDetail,
  CityList,
  CityForm,
  CityDetail,
  ClassList,
  ClassForm,
  ClassDetail,
  ClassRoomList,
  ClassRoomForm,
  ClassRoomDetail,
  SectionList,
  SectionForm,
  SectionDetail,
  ClassSectionList,
  ClassSectionForm,
  ClassSubjectList,
  ClassSubjectForm,
  EmployeeList,
  EmployeeForm,
  EmployeeDetail,
  NonTeachingStaffList,
  SubjectList,
  SubjectForm,
  SubjectDetail,
  StudentList,
  StudentForm,
  StudentDetail,
  ParentList,
  ParentForm,
  ParentDetail,
  TimeTablePeriodList,
  TimeTablePeriodForm,
  TimeTablePeriodDetail,
  TeacherSectionDetailList,
  TeacherSectionDetailForm,
  TeacherSectionDetailDetail,
  TeacherSubjectList,
  TeacherSubjectForm,
  TeacherSubjectDetail,
  RoleMasterList,
  RoleMasterForm,
  RoleMasterDetail,
  PrivilegeList,
  PrivilegeForm,
  PrivilegeDetail,
  RolePrivilegeList,
  RolePrivilegeForm,
  RolePrivilegeDetail,
  MyProfile,
  ChangePasswordForm,
  DriverList,
  DriverForm,
  DriverDetail,
  RouteList,
  RouteForm,
  RouteDetail,
  TransportAssignmentList,
  TransportAssignmentForm,
  TransportAssignmentDetail,
  TransportSettingList,
  TransportSettingForm,
  TransportSettingDetail,
  TransportHelpList,
  TransportHelpForm,
  TransportHelpDetail,
  TransportReportsList,
  EmployeeDocumentList,
  EmployeeDocumentForm,
  EmployeeDocumentDetail,
  EmployeeLeaveList,
  EmployeeLeaveForm,
  EmployeeLeaveDetail,
  EmployeeProfessionalQualificationList,
  EmployeeProfessionalQualificationForm,
  EmployeeProfessionalQualificationDetail,
  EmployeeSalaryDetailList,
  EmployeeSalaryDetailForm,
  EmployeeSalaryDetailDetail,
  DepartmentList,
  DepartmentForm,
  DepartmentDetail,
  SupplierList,
  SupplierForm,
  SupplierDetail,
  VendorList,
  VendorForm,
  VendorDetail,
  VehicleList,
  VehicleForm,
  VehicleDetail,
  TeacherList,
  TeacherForm,
  TeacherDetail,
  UserList,
  UserForm,
  UserDetail,
  Settings,
  GradeList,
  GradeForm,
  GradeDetail,
  AssignmentList,
  AssignmentForm,
  AssignmentDetail,
  StudyMaterialList,
  StudyMaterialForm,
  StudyMaterialDetail,
  VisitorList,
  VisitorForm,
  VisitorDetail,
  FeeCategoryList,
  FeeCategoryForm,
  FeeCategoryDetail,
  DiscountCategoryList,
  DiscountCategoryForm,
  DiscountCategoryDetail,
  AssesmentMasterList,
  AssesmentMasterForm,
  AssesmentMasterDetail,
  StudentAttendanceList,
  StudentAttendanceForm,
  StudentAttendanceDetail,
  PlaceholderPage,
  NavigationDemo,
  InventoryMasterList,
  InventoryMasterForm,
  InventoryMasterDetail
} from './lazyPages';


function RouteLoadFallback() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading page...</span>
      </div>
    </div>
  );
}


function App() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = () => {
      try {
        if (!sessionService.isSessionInitialized()) {
          sessionService.initializeSession();
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  // Show loading screen while initializing
  if (isInitializing) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">Initializing Application...</h5>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<RouteLoadFallback />}>
        <Routes>
          <Route 
            path="/login" 
            element={<Login />}
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MainTemplate navigationMode="left">
                  <Dashboard />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <MyProfile />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/change-password" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ChangePasswordForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/companies" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CompanyList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/companies/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CompanyForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/companies/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CompanyDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/companies/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CompanyForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/designations" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DesignationList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/designations/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DesignationForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/designations/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DesignationDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/designations/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DesignationForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/holidays"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <HolidayList />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/holidays/create"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <HolidayForm />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/holidays/:id"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <HolidayDetail />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/holidays/:id/edit"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <HolidayForm />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/system-settings"
            element={
              <Navigate replace to="/system-parameters" />
            }
          />
          <Route 
            path="/system-parameters" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SystemParameterList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/system-parameters/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SystemParameterForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/system-parameters/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SystemParameterDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/system-parameters/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SystemParameterForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schools" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SchoolList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schools/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SchoolForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schools/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SchoolDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schools/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SchoolForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bloodgroups" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <BloodGroupList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bloodgroups/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <BloodGroupForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bloodgroups/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <BloodGroupDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bloodgroups/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <BloodGroupForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/categories" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CategoryList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/categories/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CategoryForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/categories/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CategoryDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/categories/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CategoryForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/itemtypes" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemTypeList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/itemtypes/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemTypeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/itemtypes/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemTypeDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/itemtypes/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemTypeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventoryitems" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventoryitems/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventoryitems/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventoryitems/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemForm />
                </MainTemplate>
              </ProtectedRoute>
            }
          />

          {/* InventoryMaster Routes */}
          <Route 
            path="/inventorymasters" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <InventoryMasterList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventorymasters/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <InventoryMasterForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventorymasters/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <InventoryMasterDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inventorymasters/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <InventoryMasterForm />
                </MainTemplate>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/itemlocations" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemLocationList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/itemlocations/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemLocationForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/itemlocations/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemLocationDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/itemlocations/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ItemLocationForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/countries" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CountryList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/countries/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CountryForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/countries/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CountryDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/countries/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CountryForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/states" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StateList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/states/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StateForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/states/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StateDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/states/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StateForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cities" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CityList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cities/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CityForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cities/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CityDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cities/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <CityForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classes" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classes/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classes/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classes/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classrooms" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassRoomList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classrooms/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassRoomForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classrooms/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassRoomDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classrooms/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassRoomForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sections" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SectionList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sections/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SectionForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sections/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SectionDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sections/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SectionForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classsections" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassSectionList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classsections/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassSectionForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classsections/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassSectionForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classsections/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassSectionForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/subjects" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SubjectList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/subjects/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SubjectForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/subjects/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SubjectDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/subjects/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SubjectForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classsubjects" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassSubjectList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classsubjects/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassSubjectForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classsubjects/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassSubjectForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/classsubjects/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ClassSubjectForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/non-teaching-staff" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <NonTeachingStaffList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/students" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudentList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/students/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/students/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudentDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/students/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parents" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ParentList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parents/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ParentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parents/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ParentDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parents/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <ParentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/timetableperiods" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TimeTablePeriodList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/timetableperiods/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TimeTablePeriodForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/timetableperiods/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TimeTablePeriodDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/timetableperiods/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TimeTablePeriodForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-section-details" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherSectionDetailList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-section-details/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherSectionDetailForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-section-details/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherSectionDetailDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-section-details/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherSectionDetailForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          
          {/* TeacherSubject Assignment Routes */}
          <Route 
            path="/teacher-subjects" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherSubjectList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-subjects/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherSubjectForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-subjects/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherSubjectDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher-subjects/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherSubjectForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/roles" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RoleMasterList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roles/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RoleMasterForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roles/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RoleMasterDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roles/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RoleMasterForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/privileges" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <PrivilegeList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/privileges/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <PrivilegeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/privileges/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <PrivilegeDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/privileges/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <PrivilegeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roleprivileges" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RolePrivilegeList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roleprivileges/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RolePrivilegeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roleprivileges/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RolePrivilegeDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/roleprivileges/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RolePrivilegeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Transport Manager Routes */}
          <Route 
            path="/drivers" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DriverList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/drivers/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DriverForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/drivers/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DriverDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/drivers/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DriverForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/routes" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RouteList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/routes/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RouteForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/routes/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RouteDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/routes/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <RouteForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-assignments" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportAssignmentList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-assignments/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportAssignmentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-assignments/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportAssignmentDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-assignments/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportAssignmentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-settings" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportSettingList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-settings/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportSettingForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-settings/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportSettingDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-settings/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportSettingForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-help" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportHelpList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-help/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportHelpForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-help/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportHelpDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-help/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportHelpForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transport-reports" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TransportReportsList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Employee Document Routes */}
          <Route 
            path="/employee-documents" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeDocumentList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-documents/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeDocumentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-documents/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeDocumentDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-documents/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeDocumentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Employee Leave Routes */}
          <Route 
            path="/employee-leaves" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeLeaveList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-leaves/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeLeaveForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-leaves/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeLeaveDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-leaves/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeLeaveForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Employee Professional Qualification Routes */}
          <Route 
            path="/employee-professional-qualifications" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeProfessionalQualificationList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-professional-qualifications/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeProfessionalQualificationForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-professional-qualifications/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeProfessionalQualificationDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-professional-qualifications/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeProfessionalQualificationForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          <Route
            path="/profession"
            element={
              <ProtectedRoute>
                <Navigate to="/employee-professional-qualifications" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/qualification"
            element={
              <ProtectedRoute>
                <Navigate to="/employee-professional-qualifications" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feecategory"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <FeeCategoryList />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/feecategory/create"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <FeeCategoryForm />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/feecategory/:id"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <FeeCategoryDetail />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/feecategory/:id/edit"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <FeeCategoryForm />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/discountCategory" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DiscountCategoryList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/discountCategory/create"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DiscountCategoryForm />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/discountCategory/:id"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DiscountCategoryDetail />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          <Route
            path="/discountCategory/:id/edit"
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DiscountCategoryForm />
                </MainTemplate>
              </ProtectedRoute>
            }
          />
          {/* Real Assessments routes are defined below under Assessment Master Routes */}
          <Route 
            path="/attendencerecord" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <PlaceholderPage title="Attendance Record" description="This attendance record page is pending implementation." />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Employee Salary Detail Routes */}
          <Route 
            path="/employee-salary-details" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeSalaryDetailList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-salary-details/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeSalaryDetailForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-salary-details/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeSalaryDetailDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-salary-details/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <EmployeeSalaryDetailForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Department Routes */}
          <Route 
            path="/departments" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DepartmentList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departments/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DepartmentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departments/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DepartmentDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/departments/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <DepartmentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
        {/* Vehicle Management Routes */}
          <Route 
            path="/vehicles" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VehicleList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vehicles/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VehicleForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vehicles/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VehicleDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vehicles/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VehicleForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Supplier Management Routes */}
          <Route 
            path="/suppliers" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SupplierList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/suppliers/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SupplierForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/suppliers/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SupplierDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/suppliers/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <SupplierForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Vendor Management Routes */}
          <Route 
            path="/vendors" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VendorList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vendors/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VendorForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vendors/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VendorDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vendors/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VendorForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Teacher Management Routes */}
          <Route 
            path="/teachers" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teachers/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teachers/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teachers/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <TeacherForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Visitor Management Routes */}
          <Route 
            path="/visitors" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VisitorList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/visitors/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VisitorForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/visitors/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VisitorDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/visitors/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <VisitorForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
        {/* User Management Routes */}
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <UserList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <UserForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <UserDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <UserForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Settings Route */}
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <Settings />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Grade Management Routes */}
          <Route 
            path="/grades" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <GradeList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/grades/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <GradeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/grades/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <GradeDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/grades/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <GradeForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Assignment Management Routes */}
          <Route 
            path="/assignments" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <AssignmentList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assignments/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <AssignmentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assignments/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <AssignmentDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assignments/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <AssignmentForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Study Materials Routes */}
          <Route 
            path="/materials" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudyMaterialList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/materials/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudyMaterialForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/materials/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudyMaterialDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/materials/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudyMaterialForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Assessment Master Routes - accessible via both /assessments and /assesmentMaster */}
          <Route path="/assesmentMaster" element={<Navigate replace to="/assessments" />} />
          <Route path="/assesmentMaster/create" element={<Navigate replace to="/assessments/create" />} />
          <Route path="/assesmentMaster/:id/edit" element={<Navigate replace to="/assessments/:id/edit" />} />
          <Route path="/assesmentMaster/:id" element={<Navigate replace to="/assessments/:id" />} />

          <Route 
            path="/assessments" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <AssesmentMasterList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assessments/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <AssesmentMasterForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assessments/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <AssesmentMasterDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assessments/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <AssesmentMasterForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />

          {/* Student Attendance Routes */}
          <Route 
            path="/attendence" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudentAttendanceList />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendence/create" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudentAttendanceForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendence/:id" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudentAttendanceDetail />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/attendence/:id/edit" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <StudentAttendanceForm />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student-attendance" 
            element={<Navigate replace to="/attendence" />}
          />
          <Route 
            path="/student-attendance/create" 
            element={<Navigate replace to="/attendence/create" />}
          />
          <Route 
            path="/student-attendance/:id" 
            element={<Navigate replace to="/attendence/:id" />}
          />
          <Route 
            path="/student-attendance/:id/edit" 
            element={<Navigate replace to="/attendence/:id/edit" />}
          />

          <Route 
            path="/navigation-demo" 
            element={
              <ProtectedRoute>
                <MainTemplate>
                  <NavigationDemo />
                </MainTemplate>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={<HomePage />}
          />
          <Route 
            path="*" 
            element={
              authServiceOptimized.isAuthenticated() ? 
              <Navigate to="/dashboard" replace /> : 
              <Navigate to="/login" replace />
            } 
          />
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
