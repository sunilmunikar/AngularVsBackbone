using JimmysCrud.Data;
using JimmysCrud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JimmysCrud.Controllers
{
    public class ShopController : Controller
    {
        //
        // GET: /Shop/

        public ActionResult Index()
        {
            return View(new ShopRepository().GetList());
        }

        //
        // GET: /Shop/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Shop/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Shop/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Shop/Add/5

        public ActionResult Add(int id)
        {
            return View(new ShopRepository().GetItem(id));
        }

        //
        // POST: /Shop/Edit/5

        [HttpPost]
        public ActionResult Add(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

    }
}
