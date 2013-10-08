using JimmysCrud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JimmysCrud.Data
{
    public class ShopRepository
    {
        public List<Product> GetList()
        {
            var shop = new List<Product>
            {
                new Product { Id = 1, Name = "Schwinn Women's Community 700c Hybrid Bicycle", Price = 339.99M, ItemsInStock = 5 },
                new Product { Id = 2, Name = "Mongoose Armor 20-Inch Freestyle Bicycle", Price = 169.99M, ItemsInStock = 10 },
                new Product { Id = 3, Name = "Schwinn Men's Axios CX 700c Drop Bar Road Bicycle", Price = 531.50M, ItemsInStock = 2 },
                new Product { Id = 4, Name = "Mongoose Stasis Comp 26-Inch Full Suspension Mountain Bicycle", Price = 229.99M, ItemsInStock = 0 },
                new Product { Id = 5, Name = "Powerlite Brawler 20-Inch Freestyle Bicycle, Neon Green", Price = 234.99M, ItemsInStock = 1 }
            };

            return shop;
        }

        public Product GetItem(int id)
        {
            return GetList().FirstOrDefault(i => i.Id == id);
        }
    }
}