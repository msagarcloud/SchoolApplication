using AutoMapper;

namespace SchoolDemo.Infrastructure.Mapping;

public class InfrastructureToDomainProfile : Profile
{
    public InfrastructureToDomainProfile()
    {
        CreateMap<SchoolDemo.Infrastructure.Data.StudentAttendanceDetail, SchoolDemo.Domain.Entities.StudentAttendanceDetail>()
            .ReverseMap();
    }
}
