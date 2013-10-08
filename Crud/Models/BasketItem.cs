using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JimmysCrud.Models
{
    public class BasketItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}