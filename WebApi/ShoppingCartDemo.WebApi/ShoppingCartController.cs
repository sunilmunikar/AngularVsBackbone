using System.Net;
using ShoppingCartDemo.Model;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace ShoppingCartDemo.WebApi
{
    public class ShoppingCartController : ApiController
    {
        public ShoppingBasket Cart { get; set; }

        public ShoppingCartController()
        {
            Cart = new ShoppingBasket();
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
