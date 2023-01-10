using Microsoft.AspNetCore.Mvc;
using EshopAPI.Models;
using EshopAPI.Data;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;

namespace EshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopCategoryController : Controller
    {
        private readonly EshopDbContext _context;
        private readonly IConfiguration _configuration;

        public ShopCategoryController(EshopDbContext context, IConfiguration configuration) 
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpGet]
        public String Get()
        {
            List<ShopCategory> shopCategories = _context.ShopCategories.ToList();
            string json = JsonConvert.SerializeObject(shopCategories);
            return json;
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            ShopCategory shopCategory = _context.ShopCategories.Single(a => a.ShopCategoryId == id);
            return new JsonResult(shopCategory);
        }

        [HttpPost]
        public JsonResult Post(ShopCategory shopCategory)
        {
            _context.Attach(shopCategory);
            _context.Entry(shopCategory).State = EntityState.Added;
            _context.SaveChanges();
            return new JsonResult("Inserted Successfully");
        }

        [HttpPut]
        public JsonResult Put(ShopCategory shopCategory)
        {
            _context.Attach(shopCategory);
            _context.Entry(shopCategory).State = EntityState.Modified;
            _context.SaveChanges();
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            ShopCategory shopCategory = _context.ShopCategories.Single(a => a.ShopCategoryId == id);
            _context.Attach(shopCategory);
            _context.Entry(shopCategory).State = EntityState.Deleted;
            _context.SaveChanges();
            return new JsonResult("Deleted Successfully");
        }

    }
}
