using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using EshopAPI.Models;

namespace EshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ShopsController(IConfiguration configuration) { 
        _configuration=configuration;
        }

        [HttpGet]
        public JsonResult Get() {
            string query = @"SELECT sh.ShopID, sh.ShopName ,sh.ShopCategoryID, sc.CategoryName, sh.Description 
                             FROM dbo.Shops sh,dbo.ShopCategory sc where sh.ShopCategoryID=sc.ShopCategoryID";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EshopAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)) {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon)) { 
                myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult(table);   
        }

        [HttpPost]
        public JsonResult Post(Shops shops) {
            string query = @"INSERT INTO dbo.Shops values ('"+shops.ShopCategoryID+@"','"+shops.ShopName+@"','"+shops.Description+@"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EshopAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Shops shops)
        {
            string query = @"Update dbo.Shops set 
                           ShopCategoryID='"+shops.ShopCategoryID+ @"', 
                           ShopName='"+shops.ShopName+ @"',
                           Description='"+shops.Description+ @"' 
                           where ShopID='"+shops.ShopID+@"'";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EshopAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"Delete from dbo.Shops where ShopID="+id+@"";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EshopAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();

                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
