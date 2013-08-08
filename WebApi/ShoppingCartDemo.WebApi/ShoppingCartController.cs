using System.Net;
using System.Web;
using System.Web.Http.Cors;
using ShoppingCartDemo.Model;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace ShoppingCartDemo.WebApi
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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

            Cart.AddItem(item);
            product.ItemsInStock -= item.Quantity;

            return Request.CreateResponse();
        }
    }
}
