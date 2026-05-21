using Microsoft.EntityFrameworkCore;
using Rovers.API.Data;
using Rovers.API.Models;

namespace Rovers.API.Services
{
    public class PlayerProfileService
    {
        private readonly RoversDbContext _db;

        public PlayerProfileService(RoversDbContext db)
        {
            _db = db;
        }

        public async Task<List<PlayerProfile>> GetAllAsync() =>
            await _db.Players
                     .Where(p => p.IsActive)
                     .OrderBy(p => p.JerseyNumber)
                     .ToListAsync();

        public async Task<PlayerProfile?> GetByIdAsync(int id) =>
            await _db.Players.FindAsync(id);
    }
}
