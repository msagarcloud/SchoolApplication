using SchoolDemo.Domain.Entities;
using TeacherSubjectDetail = SchoolDemo.Domain.Entities.TeacherSubjectDetail;

namespace SchoolDemo.Domain.Interfaces;

// Class Repository
public interface IClassRepository
{
    Task<Class?> GetByIdAsync(Guid id);
    Task<IEnumerable<Class>> GetAllAsync();
    Task<IEnumerable<Class>> GetBySchoolIdAsync(Guid schoolId);
    Task<Class> AddAsync(Class @class);
    Task<Class> UpdateAsync(Class @class);
    Task DeleteAsync(Guid id);
}

// Section Repository
public interface ISectionRepository
{
    Task<Section?> GetByIdAsync(Guid id);
    Task<IEnumerable<Section>> GetAllAsync();
    Task<Section> AddAsync(Section section);
    Task<Section> UpdateAsync(Section section);
    Task DeleteAsync(Guid id);
}

// Class Room Repository
public interface IClassRoomRepository
{
    Task<ClassRoom?> GetByIdAsync(Guid id);
    Task<IEnumerable<ClassRoom>> GetAllAsync();
    Task<ClassRoom> AddAsync(ClassRoom classRoom);
    Task<ClassRoom> UpdateAsync(ClassRoom classRoom);
    Task DeleteAsync(Guid id);
}

// Class Section Detail Repository
public interface IClassSectionDetailRepository
{
    Task<ClassSectionDetail?> GetByIdAsync(Guid id);
    Task<IEnumerable<ClassSectionDetail>> GetAllAsync();
    Task<IEnumerable<ClassSectionDetail>> GetBySchoolIdAsync(Guid schoolId);
    Task<ClassSectionDetail> AddAsync(ClassSectionDetail classSectionDetail);
    Task<ClassSectionDetail> UpdateAsync(ClassSectionDetail classSectionDetail);
    Task DeleteAsync(Guid id);
}

// Subject Repository
public interface ISubjectRepository
{
    Task<Subject?> GetByIdAsync(Guid id);
    Task<IEnumerable<Subject>> GetAllAsync();
    Task<Subject> AddAsync(Subject subject);
    Task<Subject> UpdateAsync(Subject subject);
    Task DeleteAsync(Guid id);
}

// Teacher Master Repository
public interface ITeacherMasterRepository
{
    Task<TeacherMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<TeacherMaster>> GetAllAsync();
    Task<TeacherMaster> CreateAsync(TeacherMaster teacher);
    Task<TeacherMaster?> UpdateAsync(TeacherMaster teacher);
    Task<bool> DeleteAsync(Guid id);
}

// Class Subject Detail Repository
public interface IClassSubjectDetailRepository
{
    Task<ClassSubjectDetail?> GetByIdAsync(Guid id, Guid schoolId);
    Task<IEnumerable<ClassSubjectDetail>> GetAllAsync(Guid schoolId);
    Task<IEnumerable<ClassSubjectDetail>> GetByClassIdAsync(Guid classId);
    Task<ClassSubjectDetail> AddAsync(ClassSubjectDetail classSubjectDetail);
    Task<ClassSubjectDetail> UpdateAsync(ClassSubjectDetail classSubjectDetail);
    Task DeleteAsync(Guid id);
}

// Teacher Section Detail Repository
public interface ITeacherSectionDetailRepository
{
    Task<TeacherSectionDetail?> GetByIdAsync(Guid id);
    Task<IEnumerable<TeacherSectionDetail>> GetAllAsync();
    Task<TeacherSectionDetail> AddAsync(TeacherSectionDetail teacherSectionDetail);
    Task<TeacherSectionDetail> UpdateAsync(TeacherSectionDetail teacherSectionDetail);
    Task DeleteAsync(Guid id);
}

// Teacher Subject Detail Repository
public interface ITeacherSubjectDetailRepository
{
    Task<TeacherSubjectDetail?> GetByIdAsync(Guid id);
    Task<IEnumerable<TeacherSubjectDetail>> GetAllAsync();
    Task<IEnumerable<TeacherSubjectDetail>> GetBySchoolIdAsync(Guid schoolId);
    Task<IEnumerable<TeacherSubjectDetail>> GetBySubjectIdAsync(Guid subjectId);
    Task<TeacherSubjectDetail> CreateAsync(TeacherSubjectDetail teacherSubjectDetail);
    Task<TeacherSubjectDetail?> UpdateAsync(TeacherSubjectDetail teacherSubjectDetail);
    Task<bool> DeleteAsync(Guid id);
}
