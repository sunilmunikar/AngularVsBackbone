using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using ShoppingCartDemo.Model;

namespace ShoppingCartDemo.WebApi
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
