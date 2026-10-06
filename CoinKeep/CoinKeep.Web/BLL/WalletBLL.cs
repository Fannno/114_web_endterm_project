using CoinKeep.Web.DAL;
using CoinKeep.Web.Models;

namespace CoinKeep.Web.BLL
{
    public class WalletBLL : IWalletBLL
    {
        private readonly IWalletDAL walletDAL;
        public WalletBLL(IWalletDAL walletDAL) { this.walletDAL = walletDAL; }

        /// <summary>
        /// 取得使用者啟用中的資金帳戶
        /// </summary>
        /// <param name="userId">使用者 ID</param>
        /// <returns>資金帳戶清單</returns>
        public List<Wallet> GetWalletsByUserId(int userId)
        {
            return walletDAL.GetWalletsByUserId(userId);
        }
    }
}