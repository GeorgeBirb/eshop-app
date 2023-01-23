using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EshopAPI.Models;

public partial class Shop
{
    [Key]
    [Column("ShopID")]
    public int ShopId { get; set; }

    [StringLength(500)]
    [Unicode(false)]
    public string ShopName { get; set; } = null!;

    [Column("ShopCategoryID")]
    public int ShopCategoryId { get; set; }

    [StringLength(500)]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    [ForeignKey("ShopCategoryId")]
    [InverseProperty("Shops")]
    public virtual ShopCategory ShopCategory { get; set; } = null!;
}
