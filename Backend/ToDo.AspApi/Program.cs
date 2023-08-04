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

            builder.Services.AddControllers()
                            .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            builder.Services.AddEndpointsApiExplorer();
            //builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IBaseRepository<User>, BaseRepository<User>>();
            builder.Services.AddScoped<IBaseRepository<Profile>, BaseRepository<Profile>>();
            builder.Services.AddScoped<IBaseRepository<Domain.Models.Task>, BaseRepository<Domain.Models.Task>>();
            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                options.UseNpgsql(builder.Configuration["ConnectionStrings:PgSql"]);
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            /*if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }*/

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}