using Microsoft.EntityFrameworkCore;
using Rovers.API.Data;
using Rovers.API.Models;

namespace Rovers.API.Services
{
    public class SeasonService
    {
        private readonly RoversDbContext _db;

        public SeasonService(RoversDbContext db)
        {
            _db = db;
        }

        public async Task<List<Season>> GetAllAsync() =>
            await _db.Seasons
                     .OrderByDescending(s => s.Year)
                     .ToListAsync();

        public async Task<Season?> GetByIdAsync(int id) =>
            await _db.Seasons.FindAsync(id);
    }
}
