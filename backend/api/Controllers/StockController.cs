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

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDTO();
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<StockDto>> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
            {
                return NotFound();
            }

            stockModel.Symbol = updateDto.Symbol;
            stockModel.CompanyName = updateDto.CompanyName;
            stockModel.Purchase = updateDto.Purchase;
            stockModel.LastDiv = updateDto.LastDiv;
            stockModel.Industry = updateDto.Industry;
            stockModel.MarketCap = updateDto.MarketCap;

            await _context.SaveChangesAsync();

            return Ok(stockModel.ToStockDto());
        }

    }
}
