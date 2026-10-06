using CoinKeep.Web.BLL;
using CoinKeep.Web.Models;
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
    }
}