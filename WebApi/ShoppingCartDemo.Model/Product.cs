﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShoppingCartDemo.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int ItemsInStock { get; set; }
    }
}
