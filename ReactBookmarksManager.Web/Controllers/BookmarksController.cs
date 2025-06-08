using Microsoft.AspNetCore.Mvc;
using ReactBookmarksManager.Data;
using ReactBookmarksManager.Web.Models;

namespace ReactBookmarksManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private readonly string _connectionString;

        public BookmarksController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("gettopbookmarks")]
        public List<TopBookmarks> GetTopBookmarks()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetTopBookmarks();
        }
      
        [HttpPost]
        [Route("addbookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new BookmarkRepository(_connectionString);
            bookmark.UserId = GetCurrentUserId();
            repo.AddBookmark(bookmark);

        }

        [HttpGet]
        [Route("mybookmarks")]
        public List<Bookmark> MyBookmark()
        {
            var repo = new BookmarkRepository(_connectionString);
            return repo.GetBookMarksForUser(GetCurrentUserId());
        }

        [HttpPost]
        [Route("update")]
        public void Update(UpdateViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.UpdateBookmark(vm.Id,vm.Title);

        }
        [HttpPost]
        [Route("delete")]
        public void Delete(DeleteViewModel vm)
        {
            var repo = new BookmarkRepository(_connectionString);
            repo.DeleteBookmark(vm.Id);

        }

        public int GetCurrentUserId()
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.GetByEmail(User.Identity.Name);
            return user.Id;
        }
    }
}
