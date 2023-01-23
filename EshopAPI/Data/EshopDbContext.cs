using System;
using System.Collections.Generic;
using EshopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EshopAPI.Data;

public partial class EshopDbContext : DbContext
{
    public EshopDbContext()
    {
    }

    public EshopDbContext(DbContextOptions<EshopDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Shop> Shops { get; set; }

    public virtual DbSet<ShopCategory> ShopCategories { get; set; }
    public object Shop { get; internal set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=.; Initial Catalog=EShopDB; Integrated Security=true; Encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Shop>(entity =>
        {
            entity.HasKey(e => e.ShopId).HasName("PK__Shops__67C5562978499A44");

            entity.HasOne(d => d.ShopCategory).WithMany(p => p.Shops)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ShopCategory");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    internal void Remove(object value)
    {
        throw new NotImplementedException();
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
