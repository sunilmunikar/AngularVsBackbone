using ShoppingCartDemo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace ShoppingCart.WebApi.SelfHost
{
    public class ProductsController : ApiController
    {
        Product[] products = new Product[]  
        {  
            new Product { Id = 1, Name = "Schwinn Women's Community 700c Hybrid Bicycle",  Price = 339.99M, ItemsInStock= 5 },  
            new Product { Id = 2, Name = "Mongoose Armor 20-Inch Freestyle Bicycle", Price = 16.99M, ItemsInStock = 10 },  
            new Product { Id = 3, Name = "Schwinn Men's Axios CX 700c Drop Bar Road Bicycle, Red, 18-Inch Frame", Price = 531.50M, ItemsInStock = 2 },
            new Product { Id = 3, Name = "Mongoose Stasis Comp 26-Inch Full Suspension Mountain Bicycle", Price = 299.99M, ItemsInStock=0 },
            new Product { Id = 3, Name = "Powerlite Brawler 20-Inch Freestyle Bicycle, Neon Green", Price = 156.71M, ItemsInStock=1 }

        };

        public IEnumerable<Product> GetAllProducts()
        {
            return products;
        }

        public Product GetProductById(int id)
        {
            var product = products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return product;
        }
    }
}
