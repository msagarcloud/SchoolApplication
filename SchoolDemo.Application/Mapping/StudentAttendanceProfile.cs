using AutoMapper;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Mapping;

public class StudentAttendanceProfile : AutoMapper.Profile
{
    public StudentAttendanceProfile()
    {
        // Request -> Domain
        CreateMap<StudentAttendanceRequest, StudentAttendanceDetail>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
            .ForMember(dest => dest.ModifiedDate, opt => opt.Ignore())
            .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
            .ForMember(dest => dest.IsActive, opt => opt.Ignore());

        // Domain -> Response
        CreateMap<StudentAttendanceDetail, StudentAttendanceResponse>();
    }
}
