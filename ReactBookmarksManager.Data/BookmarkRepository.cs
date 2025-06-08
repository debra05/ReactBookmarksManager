using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace ReactBookmarksManager.Data
{
    public class BookmarkRepository
    {
        private readonly string _connectionString;

        public BookmarkRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new BookmarksManagerDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();

        }
     
        public void DeleteBookmark(int id)
        {
            using var context = new BookmarksManagerDataContext(_connectionString);
            var bookmark = new Bookmark { Id = id };
            context.Bookmarks.Attach(bookmark);
            context.Bookmarks.Remove(bookmark);
            context.SaveChanges();
        }

        public void UpdateBookmark(int id, string title)
        {
            using var context = new BookmarksManagerDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET Title = {title} WHERE Id = {id}");
        }

        public List<TopBookmarks> GetTopBookmarks()
        {
            using var context = new BookmarksManagerDataContext(_connectionString);
            var bookmarks = context.Bookmarks.ToList();
            var list = new List<TopBookmarks>();
            foreach (var bookmark in bookmarks)
            {
                var topBookmark = list.FirstOrDefault(b => b.Url == bookmark.Url);
                if (topBookmark == null)
                {
                    topBookmark = new TopBookmarks { Url = bookmark.Url };
                    list.Add(topBookmark);
                }

                topBookmark.Count++;
            }

            return list.OrderByDescending(bm => bm.Count).Take(5).ToList();
        }


    }
}