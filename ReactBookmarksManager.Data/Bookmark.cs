﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ReactBookmarksManager.Data
{
    public class Bookmark
    {
        public int Id { get; set; } 
        public string Url { get; set; }
        public string Title { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
