using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using ShoppingCartDemo.Model;

namespace ShoppingCartDemo.WebApi
{
    public class ProductsController : ApiController
    {
        public IEnumerable<Product> GetAllProducts()
        {
            return ProductsRepository.Products;
        }

        public Product GetProductById(int id)
        {
            var product = ProductsRepository.Products.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return product;
        }
    }
}
