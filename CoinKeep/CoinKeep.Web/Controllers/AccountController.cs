using CoinKeep.Web.BLL;
using CoinKeep.Web.ViewModels.Account;
using Microsoft.AspNetCore.Mvc;

namespace CoinKeep.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountBLL accountBLL;
        public AccountController(IAccountBLL accountBLL) { this.accountBLL = accountBLL; }

        /// <summary>
        /// 顯示登入頁面
        /// </summary>
        public IActionResult Login()
        {
            return View();
        }

        /// <summary>
        /// 處理使用者登入資料
        /// </summary>
        /// <param name="loginVM">登入表單資料</param>
        [HttpPost]
        public IActionResult Login(LoginViewModel loginVM)
        {
            if (!ModelState.IsValid)
            {
                return View(loginVM);
            }
            return View(loginVM);
        }

        /// <summary>
        /// 顯示註冊頁面
        /// </summary>
        public IActionResult Register()
        {
            return View();
        }

        /// <summary>
        /// 處理使用者註冊資料
        /// </summary>
        /// <param name="registerVM">註冊表單資料</param>
        [HttpPost]
        public IActionResult Register(RegisterViewModel registerVM)
        {
            if (!ModelState.IsValid)
            {
                return View(registerVM);
            }
           
            string result = accountBLL.Register(registerVM);
            if (!string.IsNullOrEmpty(result))
            {
                ModelState.AddModelError("Email", result);
                return View(registerVM);
            }
            return RedirectToAction("Login");
        }
    }
}
