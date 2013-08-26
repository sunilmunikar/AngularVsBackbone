using Newtonsoft.Json.Serialization;
using System.Linq;
using System.Web.Http;
using Thinktecture.IdentityModel.Http.Cors.WebApi;

namespace ShoppingCartDemo.WebApi
{
    public class Bootstrap
    {
        public void Configure(HttpConfiguration config)
        {
            var corsConfig = new WebApiCorsConfiguration();
            corsConfig.RegisterGlobal(config);
       
            corsConfig
                .ForAllResources()
                .ForAllOrigins()
                .AllowAll();

            config.Routes.MapHttpRoute(
                name: "API Default",
                routeTemplate: "{controller}/{id}",
                defaults: new
                {
                    id = RouteParameter.Optional
                });

            //tell API to use JSON instead of XML
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(
                config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml"));

            //var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            //jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
                new CamelCasePropertyNamesContractResolver();
        }
    }
}