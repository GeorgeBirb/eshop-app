using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EshopAPI.Models;

[Table("ShopCategory")]
public partial class ShopCategory
{
    [Key]
    public int ShopCategoryId { get; set; }

    [StringLength(500)]
    [Unicode(false)]
    public string CategoryName { get; set; } = null!;

    [StringLength(500)]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    [InverseProperty("ShopCategory")]
    public virtual ICollection<Shop> Shops { get; } = new List<Shop>();
}
