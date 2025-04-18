using api.Data;
using api.Dtos.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/stocks")]
    [ApiController]
    [Authorize]
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _stockRepo;
        public StockController(IStockRepository stockRepo)
        {
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<StockDto>>> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stocks = await _stockRepo.GetAllAsync(query);
            var result = stocks.Select(x => x.ToStockDto()).ToList();
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<StockDto>> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stock = await _stockRepo.GetByIdAsync(id);
            return stock != null ? Ok(stock.ToStockDto()) : NotFound();       
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stockModel = stockDto.ToStockFromCreateDTO();
            await _stockRepo.CreateAsync(stockModel);
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<StockDto>> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stockModel = await _stockRepo.UpdateAsync(id, updateDto);
            if (stockModel == null)
            {
                return NotFound();
            }
            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var stockModel = await _stockRepo.DeleteAsync(id);
            if (stockModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }

    }
}
