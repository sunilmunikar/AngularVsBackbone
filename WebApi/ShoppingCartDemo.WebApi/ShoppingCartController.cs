﻿﻿using System.Net;
﻿using ShoppingCartDemo.Model;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace ShoppingCartDemo.WebApi
{
    public class ShoppingCartController : ApiController
    {
        public static ShoppingBasket Cart { get; set; }

        public ShoppingCartController()
        {
            if (Cart == null)
                Cart = new ShoppingBasket();
        }

        public ShoppingBasket GetShoppingBasket()
        {
            return Cart;
        }

        public HttpResponseMessage Post(BasketItem item)
        {
            if (Cart.Items.Any(i => i.ProductId == item.ProductId))
                return Request.CreateErrorResponse(HttpStatusCode.Conflict,
                                                   "Product " + item.ProductId +
                                                   " already in cart, please update quantity to increase number of items");

            var product = ProductsRepository.Products.FirstOrDefault(p => p.Id == item.ProductId);

            if (product == null)
                return Request.CreateErrorResponse(HttpStatusCode.Conflict, "No product found with id " + item.ProductId);

            if (product.ItemsInStock == 0)
                return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Item is no longer in stock");

            item.Id = Cart.Items.Any() ? Cart.Items.Max(i => i.Id) + 1 : 100;
            Cart.AddItem(item);
            product.ItemsInStock -= item.Quantity;

            return Request.CreateResponse(HttpStatusCode.Accepted, item);
        }

        public HttpResponseMessage Put(BasketItem item)
        {
            var existing = Cart.Items.SingleOrDefault(i => i.Id == item.Id);

            if (existing == null)
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No basketitem found with id " + item.Id);

            if (existing.ProductId != item.ProductId)
                return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Product in item different than product in request");

            var product = ProductsRepository.Products.FirstOrDefault(p => p.Id == item.ProductId);

            if (product == null)
                return Request.CreateErrorResponse(HttpStatusCode.Conflict, "No product found with id " + item.ProductId);

            if (product.ItemsInStock == 0)
                return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Item is no longer in stock");

            var diff = item.Quantity - existing.Quantity;
            existing.Quantity = item.Quantity;
            product.ItemsInStock -= diff;

            return Request.CreateResponse(HttpStatusCode.Accepted, item);
        }
    }
}
