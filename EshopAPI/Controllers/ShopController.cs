﻿using Microsoft.AspNetCore.Mvc;
using EshopAPI.Models;
using EshopAPI.Data;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace EshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : Controller
    {
        private readonly EshopDbContext _context;
        private readonly IConfiguration _configuration;

        public ShopController(EshopDbContext context, IConfiguration configuration) 
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public String Get()
        {
            List<Shop> shops = _context.Shops.ToList();
            string json = JsonConvert.SerializeObject(shops);
            return json;
        }

        [HttpGet("{id}")]
        public JsonResult GetById(int id)
        {
            Shop shop = _context.Shops.Single(a => a.ShopId == id);
            return new JsonResult(shop);
        }

        [HttpPost]
        public JsonResult Post(Shop shop)
        {
            _context.Attach(shop);
            _context.Entry(shop).State = EntityState.Added;
            _context.SaveChanges();
            return new JsonResult("Inserted Successfully");
        }

        [HttpPut]
        public JsonResult Put(Shop shop)
        {
            _context.Attach(shop);
            _context.Entry(shop).State = EntityState.Modified;
            _context.SaveChanges();
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            Shop shop = _context.Shops.Single(a => a.ShopId == id);
            _context.Attach(shop);
            _context.Entry(shop).State = EntityState.Deleted;
            _context.SaveChanges();
            return new JsonResult("Deleted Successfully");
        }
    }
}