using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CalculatorTypeScript.Controllers
{
	public class HomeController : Controller
	{
		//
		// GET: /Home/

		public ActionResult Index()
		{
			var model = new List<string>() { "calbody_first", "calbody_second" };
			return View(model);
		}

	}
}
