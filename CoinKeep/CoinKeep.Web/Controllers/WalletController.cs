using CoinKeep.Web.BLL;
using CoinKeep.Web.Models;
using CoinKeep.Web.ViewModels.Wallet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CoinKeep.Web.Controllers
{
    [Authorize]
    public class WalletController : Controller
    {
        private readonly IWalletBLL walletBLL;
        public WalletController(IWalletBLL walletBLL) { this.walletBLL = walletBLL; }

        /// <summary>
        /// 顯示目前使用者的資金帳戶
        /// </summary>
        public IActionResult Overview()
        {
            string? userIdValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdValue))
            {
                return RedirectToAction("Login", "Account");
            }

            int userId = Convert.ToInt32(userIdValue);
            List<Wallet> walletList = walletBLL.GetWalletsByUserId(userId);

            return View(walletList);
        }

        /// <summary>
        /// 顯示新增資金帳戶頁面
        /// </summary>
        public IActionResult Create()
        {
            WalletEditorViewModel walletVM = new WalletEditorViewModel();
            return View("Editor", walletVM);
        }

        /// <summary>
        /// 處理新增資金帳戶資料
        /// </summary>
        /// <param name="createVM">新增資金帳戶表單資料</param>
        [HttpPost]
        public IActionResult Create(WalletEditorViewModel createVM)
        {
            if (!ModelState.IsValid)
            {
                return View("Editor", createVM);
            }

            string? userIdValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdValue))
            {
                return RedirectToAction("Login", "Account");
            }

            int userId = Convert.ToInt32(userIdValue);
            string result = walletBLL.CreateWallet(createVM, userId);
            if (!string.IsNullOrEmpty(result))
            {
                ModelState.AddModelError("WalletType", result);
                return View("Editor", createVM);
            }
            return RedirectToAction("Overview");
        }
    }
}