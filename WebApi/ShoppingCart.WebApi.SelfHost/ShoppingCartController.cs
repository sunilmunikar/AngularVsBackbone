using System.Net;
using ShoppingCartDemo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace ShoppingCart.WebApi.SelfHost
{
    public class ShoppingCartController : ApiController
    {
        public ShoppingBasket Cart { get; set; }

        public ShoppingCartController()
        {
            Cart = new ShoppingBasket();
            Cart.DeliveryAddress = "Highway to hell";
            Cart.IsFinish = false;
            Cart.AddProduct(new Product
            {
                Name = "A fake product created during consturction of the webapi call",
                Price = 99.99M
            });
        }

        public ShoppingBasket GetShoppingBasket()
        {
            return Cart;
        }

        public HttpResponseMessage Post(int productId)
        {
            var product = ProductsRepository.Products.FirstOrDefault(p => p.Id == productId);

            if (product == null)
                throw  new HttpResponseException(HttpStatusCode.NotFound);

            Cart.AddProduct(product);
            if (product.ItemsInStock == 0)
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest) { ReasonPhrase = "Item is no longer in stock"});

            product.ItemsInStock -= 1;
            return this.Request.CreateResponse();
        }
    }
}
