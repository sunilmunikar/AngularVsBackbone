using System.Collections.Generic;

namespace ShoppingCartDemo.Model
{
    public class ShoppingBasket
    {
        public IList<Product> Products { get; set; }
        public bool IsFinish { get; set; }
        public string DeliveryAddress { get; set; }

        public ShoppingBasket()
        {
            Products = new List<Product>();
        }

        public void AddProduct(Product product)
        {
            Products.Add(product);
        }
    }
}
