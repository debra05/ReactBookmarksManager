using Microsoft.EntityFrameworkCore;

namespace ReactBookmarksManager.Data;

public class BookmarksManagerDataContext : DbContext
{
    private readonly string _connectionString;

    public BookmarksManagerDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Bookmark> Bookmarks { get; set; }
}