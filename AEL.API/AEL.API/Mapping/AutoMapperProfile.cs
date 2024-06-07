using AEL.API.Domain;
using AEL.API.DTOMODEL;
using AutoMapper;

namespace AEL.API.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Book, BookDTO>().ReverseMap();

        }
    }
}
