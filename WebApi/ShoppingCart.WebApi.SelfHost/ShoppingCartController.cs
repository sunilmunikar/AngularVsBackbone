using ShoppingCartDemo.Model;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ShoppingCart.WebApi.SelfHost
{
    public class ShoppingCartController : ApiController
    {
        public ShoppingBasket Cart { get; set; }

        public ShoppingCartController()
        {
            Cart = new ShoppingBasket { DeliveryAddress = "Highway to hell", IsFinish = false };
            Cart.AddItem(new BasketItem
                {
                    ProductId = 2,
                    Quantity = 1
                });
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

            Cart.AddItem(item);
            product.ItemsInStock -= item.Quantity;

            return Request.CreateResponse();
        }
    }
}