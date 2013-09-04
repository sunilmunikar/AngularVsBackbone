using System.Collections.Generic;
using ShoppingCartDemo.Model;

namespace ShoppingCartDemo.WebApi
{
    public static class ProductsRepository
    {
        private static IEnumerable<Product> _products;

        public static IEnumerable<Product> Products {
            get
            {
                return _products ?? (_products = new[]
                    {
                        new Product
                            {
                                Id = 1,
                                Name = "Schwinn Women's Community 700c Hybrid Bicycle",
                                Price = 339.99M,
                                ItemsInStock = 5
                            },
                        new Product
                            {
                                Id = 2,
                                Name = "Mongoose Armor 20-Inch Freestyle Bicycle",
                                Price = 16.99M,
                                ItemsInStock = 10
                            },
                        new Product
                            {
                                Id = 3,
                                Name = "Schwinn Men's Axios CX 700c Drop Bar Road Bicycle, Red, 18-Inch Frame",
                                Price = 531.50M,
                                ItemsInStock = 2
                            },
                        new Product
                            {
                                Id = 4,
                                Name = "Mongoose Stasis Comp 26-Inch Full Suspension Mountain Bicycle",
                                Price = 299.99M,
                                ItemsInStock = 0
                            },
                        new Product
                            {
                                Id = 5,
                                Name = "Powerlite Brawler 20-Inch Freestyle Bicycle, Neon Green",
                                Price = 156.71M,
                                ItemsInStock = 1
                            }

                    });
            }
        }
    }
}