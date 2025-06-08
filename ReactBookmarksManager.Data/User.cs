﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ReactBookmarksManager.Data
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public string PasswordHash { get; set; }
        public List<Bookmark> Bookmarks { get; set; }

    }
}
