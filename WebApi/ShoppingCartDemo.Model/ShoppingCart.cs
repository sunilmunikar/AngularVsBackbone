using System.Collections.Generic;

namespace ShoppingCartDemo.Model
{
    public class ShoppingBasket
    {
        private readonly List<BasketItem> _items;

        public IEnumerable<BasketItem> Items
        {
            get { return _items; }
        }

        public bool IsFinish { get; set; }
        public string DeliveryAddress { get; set; }

        public ShoppingBasket()
        {
            _items = new List<BasketItem>();
        }

        public void AddItem(BasketItem product)
        {
            _items.Add(product);
        }
    }
}
