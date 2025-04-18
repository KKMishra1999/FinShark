using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    [AllowAnonymous]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signinManager;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signinManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signinManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());
            if (user == null) return Unauthorized("User not found");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized("User not found/or password mismatched");

            return Ok(new NewUserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest(ModelState);

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        return Ok(new NewUserDto
                        {
                            Username = appUser.UserName,
                            Email = appUser.Email,
                            Token = _tokenService.CreateToken(appUser)
                        });
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, createdUser.Errors);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
