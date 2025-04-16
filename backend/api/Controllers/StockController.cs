using api.Data;
using api.Dtos.Stock;
using api.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;

namespace api.Controllers
{
    [Route("api/stocks")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public StockController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<StockDto>>> GetAll()
        {
            var stocks = await _context.Stocks.Select(x => x.ToStockDto()).ToListAsync();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StockDto>> GetById([FromQuery] int id)
        {
            var stock = await _context.Stocks.FindAsync(id);

            return stock != null ? Ok(stock.ToStockDto()) : NotFound();       
        }

    }
}
