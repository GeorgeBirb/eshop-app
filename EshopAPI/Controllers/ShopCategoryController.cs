using EshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.IO;

namespace EshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopCategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ShopCategoryController(IConfiguration configuration) { 
        _configuration=configuration;
        }

        [HttpGet]
        public JsonResult Get() {
            string query = @"SELECT ShopCategoryID,CategoryName,Description FROM dbo.ShopCategory";
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
        public JsonResult Post(ShopCategory shopCategory)
        {
            string query = @"INSERT INTO dbo.ShopCategory values ('" + shopCategory.CategoryName + @"','" + shopCategory.Description + @"')";
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
        public JsonResult Put(ShopCategory shopCategory)
        {
            string query = @"Update dbo.ShopCategory set 
                           CategoryName='" + shopCategory.CategoryName + @"',
                           Description='" + shopCategory.Description + @"' 
                           where ShopCategoryID='" + shopCategory.ShopCategoryID + @"'";
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
            string query = @"Delete from dbo.ShopCategory where ShopCategoryID=" + id + @"";
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
