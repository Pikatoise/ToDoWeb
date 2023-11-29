using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using ToDo.DAL;
using ToDo.DAL.Interfaces;
using ToDo.DAL.Repositories;
using ToDo.Domain.Models;

namespace ToDo.AspApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors();

            builder.Services.AddControllers()
                            .AddJsonOptions(options => {
                                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                                });

            builder.Services.AddEndpointsApiExplorer();
            
            builder.Services.AddSwaggerGen(); // for swagger
            
            builder.Services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
            
            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseNpgsql(builder.Configuration["ConnectionStrings:PgSql"]);
            });

            var app = builder.Build();

            //app.UseDeveloperExceptionPage();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(builder =>
            {
                builder.AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowAnyOrigin();
            });

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}