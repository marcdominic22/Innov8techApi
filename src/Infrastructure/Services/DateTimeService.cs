using Innov8techApi.Application.Common.Interfaces;

namespace Innov8techApi.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
